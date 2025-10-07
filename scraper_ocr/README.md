# Amazon Product Compliance Checker

A comprehensive web application that scrapes Amazon product data and performs OCR text extraction with structured data formatting for compliance checking.

## 🚀 Features

### Product Scraping

- **High-Quality Image Extraction**: Automatically finds and extracts high-resolution product images from Amazon pages
- **Product Information**: Extracts title, brand, price, and net weight
- **Smart Image Selection**: Uses OCR text density analysis to select the best image for text extraction

### OCR & Text Processing

- **Dual OCR Engine**: Supports both Tesseract.js and Google Cloud Vision API
- **Structured Data Extraction**: Automatically formats raw OCR text into organized categories:
  - 🍎 **Nutritional Information** (calories, protein, carbs, fat, sugar, sodium, fiber)
  - ⚖️ **Weight & Specifications** (weight, volume, pieces, servings)
  - 🥘 **Ingredients List** (parsed and numbered)
  - ⚠️ **Allergen Information** (warnings and allergen details)
  - 📅 **Important Dates** (manufacturing, expiry, best before)
  - 🔢 **Product Codes** (barcodes, UPC codes)
  - 🏷️ **Brand Information** (manufacturer details)

### Modern Web Interface

- **React Frontend**: Beautiful, responsive UI with real-time updates
- **Interactive Results**: Click-to-analyze images with formatted OCR output
- **Sample URLs**: Pre-loaded Amazon product URLs for testing
- **Visual Analysis**: Image comparison with text density metrics

## 🛠️ Technology Stack

### Backend

- **Node.js** with Express.js
- **Puppeteer** for web scraping
- **Cheerio** for HTML parsing
- **Tesseract.js** for OCR processing
- **Google Cloud Vision API** for advanced OCR
- **Jimp** for image processing

### Frontend

- **React** (via CDN)
- **Tailwind CSS** for styling
- **Font Awesome** for icons
- **Responsive Design** for all devices

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd compliance_checker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Google Cloud Vision API** (Optional)

   - Create a Google Cloud project
   - Enable the Vision API
   - Download the service account key
   - Save it as `vision-id.json` in the project root

4. **Start the server**

   ```bash
   npm start
   # or
   node server.js
   ```

5. **Access the application**
   - Open your browser and go to `http://localhost:3001`

## 🎯 Usage

### Web Interface

1. **Enter Amazon URL**: Paste any Amazon product URL in the input field
2. **Use Sample URLs**: Click on pre-loaded sample URLs for quick testing
3. **Scrape Product**: Click "Scrape Product Data" to extract information
4. **OCR Analysis**: Click "Extract Text with OCR" on the best image
5. **View Results**: See both raw OCR text and structured formatted data

### API Endpoints

#### Health Check

```http
GET /api/health
```

Returns server status.

#### Scrape Product

```http
POST /api/scrape
Content-Type: application/json

{
  "url": "https://www.amazon.in/product-url"
}
```

#### OCR Processing

```http
POST /api/ocr
Content-Type: application/json

{
  "imageUrl": "https://image-url.com/image.jpg"
}
```

## 📊 Sample Output

### Structured OCR Data

```json
{
  "rawText": "Raw OCR extracted text...",
  "structuredData": {
    "nutritionalInfo": {
      "calories": "483",
      "protein": "5.2",
      "fat": "19.6"
    },
    "weightInfo": {
      "value": "876.75",
      "unit": "g",
      "fullText": "876.75 g"
    },
    "ingredients": ["Refined Wheat Flour", "Sugar", "Fractionated Fat"],
    "allergens": [
      "CONTAINS WHEAT, SULPHITE, SOY",
      "MAY CONTAIN MILK AND BARLEY"
    ]
  },
  "summary": "Weight: 876.75g, Ingredients: 15 items listed, Allergens: 2 warnings found"
}
```

## 🔧 Configuration

### Environment Variables

- `PORT`: Server port (default: 3001)
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to Google Cloud service account key

### Supported URLs

- Amazon India (amazon.in)
- Amazon US (amazon.com)
- Amazon UK (amazon.co.uk)
- Other Amazon domains

## 🚀 Demo URLs

The application comes with pre-loaded sample URLs for testing:

1. **Sunfeast Dark Fantasy Choco Fills** - Biscuits with detailed nutritional information
2. **Oreo Cadbury Family Biscuit** - Popular cookie brand with multiple images
3. **Cadbury Choclairs Candies** - Chocolate candies with ingredient lists

## 📈 Features in Detail

### Image Quality Analysis

- Downloads and analyzes all product images
- Calculates text density for each image
- Selects the image with the highest text content for OCR
- Provides detailed analysis metrics

### Smart Text Parsing

- Uses regex patterns to identify different data types
- Handles various text formats and layouts
- Extracts structured information from unstructured text
- Provides confidence scoring for extracted data

### Error Handling

- Graceful handling of network errors
- Image download failures
- OCR processing errors
- Invalid URLs or missing data

## 🛡️ Compliance Features

### Food Product Compliance

- **Nutritional Label Analysis**: Extracts and structures nutritional information
- **Ingredient Verification**: Parses ingredient lists for allergen checking
- **Date Tracking**: Identifies manufacturing and expiry dates
- **Weight Verification**: Confirms product weight specifications

### Quality Assurance

- **Multi-Engine OCR**: Uses both Tesseract and Google Vision for accuracy
- **Image Preprocessing**: Enhances images for better text recognition
- **Data Validation**: Checks extracted data for completeness
- **Structured Output**: Formats data for easy compliance checking

## 📝 Scripts

```bash
npm start          # Start the server
npm run dev        # Start in development mode
npm run scraper    # Run the standalone scraper script
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues or questions:

- Check the console logs for detailed error messages
- Ensure all dependencies are installed
- Verify Google Cloud Vision API setup (if using)
- Check network connectivity for image downloads

## 🔮 Future Enhancements

- [ ] Support for more e-commerce platforms
- [ ] Batch processing capabilities
- [ ] Database integration for storing results
- [ ] Advanced compliance rule checking
- [ ] Machine learning for better text extraction
- [ ] Multi-language OCR support
