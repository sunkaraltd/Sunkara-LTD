# Sunkara LTD - Electronics & Spare Parts E-Commerce Website

A modern, responsive, 100% static e-commerce store built with **HTML5, CSS3, and vanilla JavaScript**. It requires **zero backend servers, zero build steps, and zero database dependencies**.

---

## 🚀 How to Host on GitHub (GitHub Pages)

You can host this website on GitHub completely free with no server required:

### Option 1: Standard GitHub Pages (Easiest - 1 minute)
1. Push this repository to GitHub.
2. In your GitHub repository, go to **Settings** > **Pages** (under "Code and automation" in the left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**.
5. Within 1–2 minutes, your website is live at `https://<your-username>.github.io/<your-repository-name>/`!

### Option 2: Automated GitHub Actions
The repository includes `.github/workflows/pages.yml`. In your repo's **Settings > Pages**, choose **Source: GitHub Actions**. It will automatically publish your website whenever you push changes!

---

## 💻 Zero-Server Alternatives (No Port 3000 Needed!)

> **Note on Port 3000 in AI Studio:**  
> The port 3000 server you see inside AI Studio is strictly a local sandbox simulator for the interactive preview pane. **The website itself does NOT need Node.js, Express, or port 3000!**

Here are the ways you can run and use this website:

### 1. Direct Browser Open (Zero Install, Zero Server)
- Simply double-click `index.html` on your computer or right-click `index.html` and choose **Open with > Chrome / Edge / Safari / Firefox**.
- All styling, navigation, cart, filters, and interactive checkout will work seamlessly.

### 2. VS Code Live Server Extension
- Open the project folder in VS Code.
- Install the **Live Server** extension (by Ritwick Dey).
- Right-click `index.html` and click **Open with Live Server**.

### 3. Python Built-In HTTP Server (Any Port of Your Choice)
If you have Python installed, open terminal/command prompt in this folder and run:
```bash
python3 -m http.server 8080
```
Then visit `http://localhost:8080`.

### 4. Free Static Hosting Alternatives
You can drag and drop this entire folder or connect your GitHub repo to any of these free platforms without configuring a single server:
- **Netlify**: Drag and drop the folder into [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel**: Import your GitHub repository; framework preset is automatically detected as `Other` (pure static).
- **Cloudflare Pages**: Connect GitHub repository, build command: *none*, output directory: `/`.

---

## 📁 Project Structure

```text
├── index.html            # Home page (Hero, Categories, Featured Brands, Deals)
├── shop.html             # Shop catalog with category & price filters, search, sorting
├── product.html          # Dynamic product detail page with specs, reviews, gallery
├── cart.html             # Interactive shopping cart with coupon & subtotal calculation
├── checkout.html         # Payment gateway-style checkout (Card, Online Banking, Wallets)
├── order-success.html    # Order confirmation screen with tracking ID & receipt
├── css/
│   └── styles.css        # Pure responsive CSS3 styling & modern design system
├── js/
│   ├── products.js       # Complete product database with real-world electronics brands
│   ├── app.js            # Home & shop page interactions, live search, filter logic
│   ├── cart.js           # Shopping cart state management (localStorage)
│   ├── checkout.js       # Form validation & multi-method payment gateway simulation
│   └── utils.js          # Currency formatting (£ GBP), VAT, notifications, storage helpers
├── assets/
│   └── images/           # High-resolution product and showcase assets
├── .nojekyll             # Prevents GitHub Pages from ignoring static asset paths
└── .github/
    └── workflows/
        └── pages.yml     # Automated GitHub Pages CI/CD workflow
```

---

## ⚡ Features
- **Real-World Brands**: Samsung, Sony, Apple, ASUS, Anker, Hakko, Belkin, Dell, Lenovo, and OEM components.
- **Persistent Cart**: Powered by `localStorage` (persists across page refreshes and visits).
- **Realistic Payment Gateway**: Card validation with brand badge detection, UK online banking, digital wallets, and 20% VAT-inclusive pricing for the UK market.
- **Responsive Layout**: Designed for mobile phones, tablets, and large desktop screens.
- **Subpath Compatible**: Uses clean relative links so it works anywhere on GitHub Pages or custom subdirectories.
