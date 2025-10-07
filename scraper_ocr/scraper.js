import puppeteer from "puppeteer";
import Tesseract from "tesseract.js";
import * as vision from "@google-cloud/vision";
import fetch from "node-fetch";
import { Jimp } from "jimp";
import sharp from "sharp";
import * as cheerio from "cheerio";
import fs from "fs";

async function findProductDetailImage(urls) {
  let bestImage = null;
  let highestDensity = 0;

  for (const url of urls) {
    try {
      // Download the image
      const res = await fetch(url);
      if (!res.ok) continue;
      const buffer = Buffer.from(await res.arrayBuffer());

      // Load image with Jimp to get dimensions
      const image = await Jimp.read(buffer);
      const { width, height } = image.bitmap;

      // OCR
      const { data } = await Tesseract.recognize(buffer, "eng", {
        tessjs_create_hocr: "0",
        tessjs_create_tsv: "0",
      });

      const textLength = data.text.replace(/\s+/g, "").length; // count only non-space chars
      const density = textLength;

      console.log(`Checked ${url} → density: ${density.toFixed(6)}`);

      if (density > highestDensity) {
        highestDensity = density;
        bestImage = url;
      }
    } catch (e) {
      console.log("Error processing image:", url, e);
    }
  }

  console.log(
    "✅ Best product detail image:",
    bestImage,
    "with density:",
    highestDensity
  );
  return bestImage;
}

async function getData() {
  let browser;

  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
      width: 1000,
      height: 700,
    });

    page.setDefaultNavigationTimeout(2 * 60 * 1000);

    // Navigate to the page
    await page.goto(
      "https://www.flipkart.com/nestle-munch-choco-coated-crunchy-wafer-bars/p/itmb3682c3f1468c?pid=CHCF4PA9BJR2XA9B&lid=LSTCHCF4PA9BJR2XA9BMGE1SF&marketplace=FLIPKART&q=munch+chocolate+box&store=eat%2F0pt&spotlightTagId=default_BestsellerId_eat%2F0pt&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_1_8_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_8_na_na_na&fm=organic&iid=0a121421-e3fa-4b67-9f46-7bac3625a8e2.CHCF4PA9BJR2XA9B.SEARCH&ppt=None&ppn=None&ssid=tdpg1wx0mo0000001759777482172&qH=f8ad34ce2b5d85d0",
      {
        waitUntil: "networkidle2",
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const html = await page.content();
    const $ = cheerio.load(html);

    // 1. Product Title
    const title = $("#productTitle").text().trim();

    // 2. Product Price
    const price = $(".a-price .a-offscreen").first().text().trim();

    // 3. Brand Name
    let brand = $("#bylineInfo").text().trim();
    if (!brand) {
      brand = $("#productOverview_feature_div tr:first-child td.a-span9 span")
        .text()
        .trim();
    }
    brand = brand.replace(/^Brand:\s*/i, "");

    const highResImages = await page.evaluate(() => {
      const images = [];

      // --- 1️⃣ From #altImages and #landingImage ---
      document.querySelectorAll("#altImages img").forEach((img) => {
        let src = img.getAttribute("data-old-hires") || img.src;
        if (src) {
          src = src.replace(/_SX\d+_SY\d+_.+?\./, "_SL1500.");
          images.push(src);
        }
      });

      const mainImg = document.querySelector("#landingImage");
      if (mainImg) {
        let src = mainImg.getAttribute("data-old-hires") || mainImg.src;
        if (src) src = src.replace(/_SX\d+_SY\d+_.+?\./, "_SL1500.");
        images.unshift(src);
      }

      // --- 2️⃣ From Amazon's JS colorImages object ---
      const scripts = [...document.querySelectorAll("script")];
      scripts.forEach((s) => {
        const text = s.innerText;
        if (text.includes("colorImages")) {
          // Direct regex approach to extract all hiRes URLs
          const hiResMatches = text.match(/"hiRes":"([^"]+)"/g);
          if (hiResMatches) {
            hiResMatches.forEach((match) => {
              const url = match.match(/"hiRes":"([^"]+)"/)[1];
              if (url) images.push(url);
            });
          }
        }
      });

      // Remove duplicates and return
      return [...new Set(images)];
    });

    const url = await findProductDetailImage(highResImages);

    // 6. Net Weight
    let netWeight = "";
    $("#productOverview_feature_div tr").each((i, el) => {
      const label = $(el).find("td.a-span3 span").text().trim();
      const value = $(el).find("td.a-span9 span").text().trim();
      if (label.toLowerCase().includes("net")) {
        netWeight = value;
      }
    });
    if (!netWeight) {
      $("#detailBullets_feature_div li").each((i, el) => {
        const label = $(el).find("span.a-text-bold").text().trim();
        const value = $(el).find("span").last().text().trim();
        if (label.toLowerCase().includes("net")) {
          netWeight = value;
        }
      });
    }

    console.log({
      title,
      brand,
      price,
      netWeight,
      url,
    });

    fs.writeFileSync("output.html", html);

    if (browser) await browser.close();
  } catch (err) {
    console.log(err);

    if (browser) await browser.close();
  }
}

// Function to format and structure OCR text data
function formatOCRData(rawText) {
  const formattedData = {
    rawText: rawText,
    structuredData: {},
    extractedInfo: {},
    confidence: "high",
  };

  // Clean and normalize the text
  const cleanText = rawText.replace(/\s+/g, " ").trim();

  // Extract nutritional information
  const nutritionalInfo = extractNutritionalInfo(cleanText);
  if (Object.keys(nutritionalInfo).length > 0) {
    formattedData.structuredData.nutritionalInfo = nutritionalInfo;
  }

  // Extract product specifications
  const specifications = extractSpecifications(cleanText);
  if (Object.keys(specifications).length > 0) {
    formattedData.structuredData.specifications = specifications;
  }

  // Extract weight/quantity information
  const weightInfo = extractWeightInfo(cleanText);
  if (weightInfo) {
    formattedData.structuredData.weightInfo = weightInfo;
  }

  // Extract ingredients
  const ingredients = extractIngredients(cleanText);
  if (ingredients.length > 0) {
    formattedData.structuredData.ingredients = ingredients;
  }

  // Extract allergen information
  const allergens = extractAllergens(cleanText);
  if (allergens.length > 0) {
    formattedData.structuredData.allergens = allergens;
  }

  // Extract best before/manufacturing date
  const dates = extractDates(cleanText);
  if (dates.length > 0) {
    formattedData.structuredData.dates = dates;
  }

  // Extract barcode/UPC codes
  const codes = extractCodes(cleanText);
  if (codes.length > 0) {
    formattedData.structuredData.codes = codes;
  }

  // Extract company/brand information
  const brandInfo = extractBrandInfo(cleanText);
  if (brandInfo) {
    formattedData.structuredData.brandInfo = brandInfo;
  }

  // Generate summary
  formattedData.summary = generateSummary(formattedData.structuredData);

  return formattedData;
}

// Helper functions for data extraction
function extractNutritionalInfo(text) {
  const nutrition = {};

  // Common nutritional patterns
  const patterns = {
    calories: /(\d+)\s*(?:kcal|calories?)/gi,
    protein: /protein[:\s]*(\d+(?:\.\d+)?)\s*g/gi,
    carbs: /(?:carbohydrate|carb)s?[:\s]*(\d+(?:\.\d+)?)\s*g/gi,
    fat: /fat[:\s]*(\d+(?:\.\d+)?)\s*g/gi,
    sugar: /sugar[:\s]*(\d+(?:\.\d+)?)\s*g/gi,
    sodium: /sodium[:\s]*(\d+(?:\.\d+)?)\s*(?:mg|g)/gi,
    fiber: /fiber[:\s]*(\d+(?:\.\d+)?)\s*g/gi,
  };

  Object.keys(patterns).forEach((key) => {
    const match = text.match(patterns[key]);
    if (match) {
      nutrition[key] = match[1];
    }
  });

  return nutrition;
}

function extractSpecifications(text) {
  const specs = {};

  const patterns = {
    weight: /(\d+(?:\.\d+)?)\s*(?:g|gm|gram|grams?|kg|kilogram)/gi,
    volume: /(\d+(?:\.\d+)?)\s*(?:ml|milliliter|litre|liter|l)/gi,
    pieces: /(\d+)\s*(?:pieces?|pcs|count)/gi,
    servings: /(\d+)\s*(?:servings?|serves)/gi,
  };

  Object.keys(patterns).forEach((key) => {
    const match = text.match(patterns[key]);
    if (match) {
      specs[key] = match[1];
    }
  });

  return specs;
}

function extractWeightInfo(text) {
  const weightMatch = text.match(
    /(\d+(?:\.\d+)?)\s*(?:g|gm|gram|grams?|kg|kilogram)/i
  );
  if (weightMatch) {
    return {
      value: weightMatch[1],
      unit: weightMatch[2] || "g",
      fullText: weightMatch[0],
    };
  }
  return null;
}

function extractIngredients(text) {
  const ingredients = [];

  // Look for ingredient lists (usually after "ingredients:" or similar)
  const ingredientMatch = text.match(/ingredients?[:\s]*(.+?)(?:\n|$)/i);
  if (ingredientMatch) {
    const ingredientText = ingredientMatch[1];
    // Split by common separators
    const ingredientList = ingredientText
      .split(/[,;]/)
      .map((ing) => ing.trim())
      .filter((ing) => ing.length > 0);
    ingredients.push(...ingredientList);
  }

  return ingredients;
}

function extractAllergens(text) {
  const allergens = [];
  const allergenKeywords = [
    "contains",
    "allergens",
    "may contain",
    "wheat",
    "gluten",
    "milk",
    "dairy",
    "nuts",
    "peanuts",
    "soy",
    "eggs",
  ];

  allergenKeywords.forEach((keyword) => {
    const regex = new RegExp(`${keyword}[:\s]*([^.]+)`, "gi");
    const match = text.match(regex);
    if (match) {
      allergens.push(match[0]);
    }
  });

  return allergens;
}

function extractDates(text) {
  const dates = [];

  // Various date patterns
  const datePatterns = [
    /(?:best before|expires?|expiry)[:\s]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/gi,
    /(?:manufactured|mfg|packed)[:\s]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/gi,
    /(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/g,
  ];

  datePatterns.forEach((pattern) => {
    const matches = text.match(pattern);
    if (matches) {
      dates.push(...matches);
    }
  });

  return [...new Set(dates)]; // Remove duplicates
}

function extractCodes(text) {
  const codes = [];

  // Barcode patterns (usually 12-13 digits)
  const barcodePattern = /\b\d{12,13}\b/g;
  const barcodes = text.match(barcodePattern);
  if (barcodes) {
    codes.push(...barcodes.map((code) => ({ type: "barcode", value: code })));
  }

  // UPC codes
  const upcPattern = /\b\d{11,12}\b/g;
  const upcs = text.match(upcPattern);
  if (upcs) {
    codes.push(...upcs.map((code) => ({ type: "UPC", value: code })));
  }

  return codes;
}

function extractBrandInfo(text) {
  // Look for common brand patterns
  const brandMatch = text.match(
    /(?:brand|made by|manufactured by)[:\s]*([A-Za-z\s]+)/i
  );
  if (brandMatch) {
    return brandMatch[1].trim();
  }
  return null;
}

function generateSummary(structuredData) {
  const summary = [];

  if (structuredData.nutritionalInfo) {
    summary.push(
      `Nutritional Information: ${
        Object.keys(structuredData.nutritionalInfo).length
      } items found`
    );
  }

  if (structuredData.weightInfo) {
    summary.push(
      `Weight: ${structuredData.weightInfo.value}${structuredData.weightInfo.unit}`
    );
  }

  if (structuredData.ingredients && structuredData.ingredients.length > 0) {
    summary.push(
      `Ingredients: ${structuredData.ingredients.length} items listed`
    );
  }

  if (structuredData.allergens && structuredData.allergens.length > 0) {
    summary.push(
      `Allergens: ${structuredData.allergens.length} warnings found`
    );
  }

  if (structuredData.dates && structuredData.dates.length > 0) {
    summary.push(`Dates: ${structuredData.dates.length} date(s) found`);
  }

  if (structuredData.codes && structuredData.codes.length > 0) {
    summary.push(`Codes: ${structuredData.codes.length} code(s) found`);
  }

  return summary.join(", ");
}

async function getDataFromImage() {
  const inputPath = "temp_original.jpg";
  const processedPath = "processed_image.jpg";

  const response = await fetch(
    "https://m.media-amazon.com/images/I/61VMo0FAcHL._SL1100_.jpg"
  );
  if (!response.ok)
    throw new Error(`Failed to fetch image: ${response.statusText}`);

  const buffer = await response.arrayBuffer(); // get raw bytes
  fs.writeFileSync(inputPath, Buffer.from(buffer));

  // --- Image preprocessing with Jimp ---
  const image = await Jimp.read(inputPath);

  image
    .resize({ w: 2000, h: Jimp.AUTO }) // upscale for clarity
    .greyscale() // convert to grayscale
    .contrast(0.8) // improve contrast without overdoing
    .brightness(0.1) // slight brightening
    .normalize() // normalize histogram
    .convolute([
      // mild sharpening
      [0, -0.5, 0],
      [-0.5, 3, -0.5],
      [0, -0.5, 0],
    ])
    .write(processedPath);

  console.log("✅ Preprocessing done. Saved as", processedPath);

  // --- Google Vision OCR (documentTextDetection) ---
  const client = new vision.ImageAnnotatorClient();

  try {
    const [result] = await client.documentTextDetection(inputPath, {
      imageContext: { languageHints: ["en"] }, // hint for English text
    });

    const fullText = result.fullTextAnnotation?.text || "";

    if (!fullText) {
      console.log("❌ No text detected.");
      return;
    }

    // Format the extracted text into structured data
    const formattedData = formatOCRData(fullText);

    console.log("\n🧠 RAW EXTRACTED TEXT:");
    console.log("=".repeat(50));
    console.log(fullText);

    console.log("\n📊 FORMATTED STRUCTURED DATA:");
    console.log("=".repeat(50));
    console.log(JSON.stringify(formattedData.structuredData, null, 2));

    console.log("\n📋 SUMMARY:");
    console.log("=".repeat(50));
    console.log(formattedData.summary);

    console.log("\n🔍 EXTRACTED INFORMATION:");
    console.log("=".repeat(50));
    if (formattedData.structuredData.nutritionalInfo) {
      console.log("🍎 NUTRITIONAL INFO:");
      Object.entries(formattedData.structuredData.nutritionalInfo).forEach(
        ([key, value]) => {
          console.log(`   ${key.toUpperCase()}: ${value}`);
        }
      );
    }

    if (formattedData.structuredData.weightInfo) {
      console.log("\n⚖️  WEIGHT INFO:");
      console.log(`   ${formattedData.structuredData.weightInfo.fullText}`);
    }

    if (
      formattedData.structuredData.ingredients &&
      formattedData.structuredData.ingredients.length > 0
    ) {
      console.log("\n🥘 INGREDIENTS:");
      formattedData.structuredData.ingredients.forEach((ingredient, index) => {
        console.log(`   ${index + 1}. ${ingredient}`);
      });
    }

    if (
      formattedData.structuredData.allergens &&
      formattedData.structuredData.allergens.length > 0
    ) {
      console.log("\n⚠️  ALLERGENS:");
      formattedData.structuredData.allergens.forEach((allergen, index) => {
        console.log(`   ${index + 1}. ${allergen}`);
      });
    }

    if (
      formattedData.structuredData.dates &&
      formattedData.structuredData.dates.length > 0
    ) {
      console.log("\n📅 DATES:");
      formattedData.structuredData.dates.forEach((date, index) => {
        console.log(`   ${index + 1}. ${date}`);
      });
    }

    if (formattedData.structuredData.codes.length > 0) {
      console.log("\n🔢 CODES:");
      formattedData.structuredData.codes.forEach((code, index) => {
        console.log(`   ${index + 1}. ${code.type}: ${code.value}`);
      });
    }

    // Save formatted data to file
    fs.writeFileSync(
      "formatted_ocr_data.json",
      JSON.stringify(formattedData, null, 2)
    );
    console.log("\n💾 Formatted data saved to 'formatted_ocr_data.json'");
  } catch (error) {
    console.error("❌ OCR Error:", error);
  }
}

getDataFromImage().catch(console.error);

getData();
