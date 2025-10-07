import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";
import Tesseract from "tesseract.js";
import * as vision from "@google-cloud/vision";
import fetch from "node-fetch";
import { Jimp } from "jimp";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

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

  const ingredientMatch = text.match(/ingredients?[:\s]*(.+?)(?:\n|$)/i);
  if (ingredientMatch) {
    const ingredientText = ingredientMatch[1];
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

  return [...new Set(dates)];
}

function extractCodes(text) {
  const codes = [];

  const barcodePattern = /\b\d{12,13}\b/g;
  const barcodes = text.match(barcodePattern);
  if (barcodes) {
    codes.push(...barcodes.map((code) => ({ type: "barcode", value: code })));
  }

  const upcPattern = /\b\d{11,12}\b/g;
  const upcs = text.match(upcPattern);
  if (upcs) {
    codes.push(...upcs.map((code) => ({ type: "UPC", value: code })));
  }

  return codes;
}

function extractBrandInfo(text) {
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

// Utility function to find best product detail image
async function findProductDetailImage(urls) {
  let bestImage = null;
  let highestDensity = 0;
  const results = [];

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

      const textLength = data.text.replace(/\s+/g, "").length;
      const density = textLength;

      // Format the OCR data
      const formattedOCRData = formatOCRData(data.text);

      const result = {
        url,
        dimensions: { width, height },
        textDensity: density,
        extractedText: data.text,
        formattedData: formattedOCRData,
      };

      results.push(result);

      if (density > highestDensity) {
        highestDensity = density;
        bestImage = url;
      }
    } catch (e) {
      console.log("Error processing image:", url, e.message);
    }
  }

  return { bestImage, highestDensity, results };
}

// Function to scrape Amazon product data
async function scrapeAmazonProduct(productUrl) {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setViewport({
      width: 1000,
      height: 700,
    });

    page.setDefaultNavigationTimeout(2 * 60 * 1000);

    // Navigate to the page
    await page.goto(productUrl, {
      waitUntil: "networkidle2",
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const html = await page.content();
    const $ = cheerio.load(html);

    // Extract product data
    const title = $("#productTitle").text().trim();
    const price = $(".a-price .a-offscreen").first().text().trim();

    let brand = $("#bylineInfo").text().trim();
    if (!brand) {
      brand = $("#productOverview_feature_div tr:first-child td.a-span9 span")
        .text()
        .trim();
    }
    brand = brand.replace(/^Brand:\s*/i, "");

    // Extract high-resolution images
    const highResImages = await page.evaluate(() => {
      const images = [];

      // From #altImages and #landingImage
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

      // From Amazon's JS colorImages object
      const scripts = [...document.querySelectorAll("script")];
      scripts.forEach((s) => {
        const text = s.innerText;
        if (text.includes("colorImages")) {
          const hiResMatches = text.match(/"hiRes":"([^"]+)"/g);
          if (hiResMatches) {
            hiResMatches.forEach((match) => {
              const url = match.match(/"hiRes":"([^"]+)"/)[1];
              if (url) images.push(url);
            });
          }
        }
      });

      return [...new Set(images)];
    });

    // Extract net weight
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

    // Find best product detail image
    const imageAnalysis = await findProductDetailImage(highResImages);

    await browser.close();

    return {
      success: true,
      data: {
        title,
        brand,
        price,
        netWeight,
        productUrl,
        allImages: highResImages,
        bestImage: imageAnalysis.bestImage,
        imageAnalysis: imageAnalysis.results,
      },
    };
  } catch (error) {
    if (browser) await browser.close();
    return {
      success: false,
      error: error.message,
    };
  }
}

// API Routes

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Compliance Checker API is running" });
});

// Scrape product endpoint
app.post("/api/scrape", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: "Product URL is required",
      });
    }

    // Validate Amazon URL
    if (!url.includes("amazon.")) {
      return res.status(400).json({
        success: false,
        error: "Only Amazon URLs are supported",
      });
    }

    const result = await scrapeAmazonProduct(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// OCR endpoint for specific image
app.post("/api/ocr", async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        error: "Image URL is required",
      });
    }

    // Download image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    // Process with Google Vision OCR
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.documentTextDetection(buffer, {
      imageContext: { languageHints: ["en"] },
    });

    const extractedText = result.fullTextAnnotation?.text || "";

    // Format the OCR data
    const formattedData = formatOCRData(extractedText);

    res.json({
      success: true,
      data: {
        imageUrl,
        extractedText,
        formattedData,
        confidence:
          result.fullTextAnnotation?.pages?.[0]?.property?.detectedBreak
            ?.type || "unknown",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Serve static files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend available at http://localhost:${PORT}`);
});
