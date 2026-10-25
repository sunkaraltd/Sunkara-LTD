/**
 * Sunkara LTD - Central Product Catalog Data
 * Realistic real-life electronics brands: Samsung, Sony, Apple, ASUS, Anker, Hakko, Belkin, STMicroelectronics, Espressif, Dell, Lenovo
 */

const PRODUCTS = [
  {
    id: "prod-phone-01",
    name: "Samsung Galaxy S24 Ultra 5G (16GB RAM, 512GB Titanium Gray)",
    brand: "Samsung",
    shortDesc: "Flagship 6.8\" Dynamic AMOLED 2X, Snapdragon 8 Gen 3, Titanium Chassis & 200MP Quad-Telephoto Camera.",
    category: "Smartphones",
    categorySlug: "smartphones",
    price: 1049,
    originalPrice: 1249,
    discount: 16,
    rating: 4.9,
    reviewsCount: 382,
    inStock: true,
    stockCount: 14,
    badge: "Flagship",
    image: "assets/images/product_flagship_phone_1792929459254.jpg",
    additionalImages: [
      "assets/images/product_flagship_phone_1792929459254.jpg",
      "assets/images/hero_electronics_showcase_1792929458222.jpg"
    ],
    warranty: "1 Year Official Samsung UK Warranty + 6 Months Screen Protection",
    specs: {
      "Brand": "Samsung",
      "Display": "6.8-inch Dynamic LTPO AMOLED 2X, 120Hz HDR10+, 2600 nits",
      "Processor": "Qualcomm Snapdragon 8 Gen 3 for Galaxy (4nm)",
      "RAM & Storage": "16GB LPDDR5X, 512GB UFS 4.0",
      "Camera": "200MP Wide + 50MP Periscope (5x) + 10MP Telephoto (3x) + 12MP Ultra-wide",
      "Battery": "5000 mAh with 65W Super Fast Charging",
      "Build": "Grade 5 Titanium Armor Frame, Corning Gorilla Armor Glass, IP68"
    },
    description: "The Samsung Galaxy S24 Ultra sets the gold standard in premium smartphone engineering. Crafted with aerospace-grade titanium and an ultra-vibrant anti-reflective Dynamic AMOLED 2X panel, it delivers benchmark-shattering performance, pro-grade optics with Galaxy AI editing, and unmatched battery longevity."
  },
  {
    id: "prod-audio-01",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    brand: "Sony",
    shortDesc: "Industry-leading noise cancellation with two processors and 8 microphones, LDAC Hi-Res Audio, 40-hr battery.",
    category: "Headphones and audio devices",
    categorySlug: "audio",
    price: 299,
    originalPrice: 379,
    discount: 21,
    rating: 4.8,
    reviewsCount: 512,
    inStock: true,
    stockCount: 28,
    badge: "Best Seller",
    image: "assets/images/product_audiophile_headphones_1792929460084.jpg",
    additionalImages: [
      "assets/images/product_audiophile_headphones_1792929460084.jpg",
      "assets/images/hero_electronics_showcase_1792929458222.jpg"
    ],
    warranty: "2 Years Official Sony UK Replacement Warranty",
    specs: {
      "Brand": "Sony",
      "Driver": "30mm Precision-engineered Carbon Fiber Diaphragm",
      "Frequency Response": "4Hz - 40,000Hz (Hi-Res Audio Certified)",
      "ANC": "Dual-Processor V1 & HD Noise Cancelling Processor QN1 (-42dB)",
      "Connectivity": "Bluetooth 5.4, Multipoint Connection, LDAC, AAC, SBC & 3.5mm Aux",
      "Battery Life": "40 Hours with ANC On, Fast Charging (3 min = 3 hours playback)",
      "Microphones": "8 Beamforming Microphones with Precise Voice Pickup Technology"
    },
    description: "Experience acoustic purity with the Sony WH-1000XM5 Noise Cancelling Headphones. Engineered with ultra-lightweight soft-fit leather and dual high-performance processors that eliminate high and medium frequency noises in real time."
  },
  {
    id: "prod-comp-01",
    name: "STMicroelectronics STM32F405 High-Density ARM Cortex-M4 Board",
    brand: "STMicroelectronics",
    shortDesc: "168 MHz MCU with 1MB Flash, 192KB RAM, USB OTG, CAN, and gold-plated headers.",
    category: "Circuit boards and electronic components",
    categorySlug: "components",
    price: 19,
    originalPrice: 24,
    discount: 21,
    rating: 4.9,
    reviewsCount: 198,
    inStock: true,
    stockCount: 75,
    badge: "Popular OEM",
    image: "assets/images/product_component_board_1792929460819.jpg",
    additionalImages: [
      "assets/images/product_component_board_1792929460819.jpg"
    ],
    warranty: "6 Months Technical Guarantee & ESD Tested",
    specs: {
      "Brand": "STMicroelectronics",
      "Core": "ARM 32-bit Cortex-M4 with FPU @ 168MHz",
      "Memory": "1024 KB Flash, 192 KB SRAM + 4 KB Backup SRAM",
      "Peripherals": "3x SPI, 3x I2C, 4x USART, 2x CAN, USB 2.0 Full-Speed",
      "Operating Voltage": "3.3V Logic (5V tolerant I/O pins)",
      "Form Factor": "Breadboard-friendly breakout with gold-plated headers",
      "Clock": "12.000 MHz Crystal Oscillator onboard"
    },
    description: "Designed by STMicroelectronics for embedded robotics, industrial automation, and real-time DSP applications. Features high-speed digital communications, low noise power regulation, and full hardware debug support via SWD/JTAG."
  },
  {
    id: "prod-tool-01",
    name: "Hakko FX-888D Digital Soldering Station & Precision Tool Kit",
    brand: "Hakko",
    shortDesc: "70W temperature-controlled soldering station with brass wire cleaner, ESD tweezers, and lead-free solder.",
    category: "Repair tools and accessories",
    categorySlug: "tools",
    price: 45,
    originalPrice: 60,
    discount: 25,
    rating: 4.9,
    reviewsCount: 230,
    inStock: true,
    stockCount: 19,
    badge: "Pro Toolkit",
    image: "assets/images/product_soldering_kit_1792929460685.jpg",
    additionalImages: [
      "assets/images/product_soldering_kit_1792929460685.jpg"
    ],
    warranty: "1 Year Official Hakko Heating Element & Unit Warranty",
    specs: {
      "Brand": "Hakko",
      "Power Output": "70W Fast Ceramic Core Heating",
      "Temperature Range": "200°C - 480°C (392°F - 896°F) ±1°C",
      "Display": "High-contrast Digital LCD with Preset Memory",
      "Kit Inclusions": "Station, Stand, Brass Sponge, 5x Tips, Anti-Static ESD Tweezers, 250g 60/40 Solder",
      "Safety": "ESD-Safe Certified, Auto-Sleep & Thermal Cutoff"
    },
    description: "The Hakko FX-888D is the trusted gold standard workbench companion for electronic engineers, PCB repair technicians, and DIY hardware hobbyists. Rapid 15-second heat-up with microcomputer digital temperature calibration ensures flawless soldering."
  },
  {
    id: "prod-laptop-01",
    name: "ASUS ROG Zephyrus G16 (Intel Core Ultra 9, 32GB RAM, RTX 4070)",
    brand: "ASUS",
    shortDesc: "16\" 2.5K 240Hz OLED ROG Nebula display, 1TB NVMe Gen4 SSD, CNC aluminum unibody, 90Wh battery.",
    category: "Laptops and computers",
    categorySlug: "laptops",
    price: 1699,
    originalPrice: 1999,
    discount: 15,
    rating: 4.9,
    reviewsCount: 114,
    inStock: true,
    stockCount: 8,
    badge: "Top Tier",
    image: "assets/images/hero_electronics_showcase_1792929458222.jpg",
    additionalImages: [
      "assets/images/hero_electronics_showcase_1792929458222.jpg"
    ],
    warranty: "2 Years ASUS On-Site Comprehensive Warranty + Accidental Damage Protection",
    specs: {
      "Brand": "ASUS ROG",
      "Processor": "Intel Core Ultra 9 185H (16 Cores, 22 Threads, up to 5.1GHz with NPU)",
      "Graphics": "NVIDIA GeForce RTX 4070 8GB GDDR6 (140W TGP)",
      "Display": "16-inch 2.5K (2560x1600) OLED Nebula, 240Hz 0.2ms, 100% DCI-P3, 500 nits",
      "Memory": "32GB LPDDR5X 7467MHz Dual Channel",
      "Storage": "1TB PCIe 4.0 NVMe M.2 SSD",
      "Weight": "1.85 kg CNC Precision Anodized Aluminum"
    },
    description: "Engineered for creators, developers, and power gamers. The ASUS ROG Zephyrus G16 pairs the latest Intel Core Ultra 9 hybrid architecture with NVIDIA Ada Lovelace graphics and an awe-inspiring 240Hz OLED ROG Nebula display."
  },
  {
    id: "prod-watch-01",
    name: "Apple Watch Ultra 2 GPS + Cellular (49mm Titanium Case)",
    brand: "Apple",
    shortDesc: "49mm aerospace-grade titanium case, 3000-nit Always-On Retina display, Dual-frequency GPS, 72-hr battery.",
    category: "Smartwatches and wearables",
    categorySlug: "wearables",
    price: 849,
    originalPrice: 899,
    discount: 6,
    rating: 4.9,
    reviewsCount: 341,
    inStock: true,
    stockCount: 18,
    badge: "Sale",
    image: "assets/images/hero_electronics_showcase_1792929458222.jpg",
    additionalImages: [
      "assets/images/hero_electronics_showcase_1792929458222.jpg"
    ],
    warranty: "1 Year Official Apple UK Brand Warranty + AppleCare Eligible",
    specs: {
      "Brand": "Apple",
      "Screen": "49mm Sapphire Crystal OLED Retina, 3000 nits Peak Brightness",
      "Water Resistance": "100m Water Resistant, EN13319 Certified for Scuba to 40m",
      "Sensors": "Depth Gauge, Water Temperature, ECG, Blood Oxygen, Optical Heart Sensor",
      "Battery": "Up to 36 hours normal use, up to 72 hours in Low Power Mode",
      "Connectivity": "Precision Dual-frequency GPS (L1 and L5), LTE & UMTS Cellular"
    },
    description: "The most rugged and capable Apple Watch ever. Designed for extreme endurance athletes and outdoor adventurers, featuring a 49mm corrosion-resistant titanium case and customizable Action button."
  },
  {
    id: "prod-charge-01",
    name: "Anker 735 GaNPrime 65W 3-Port Ultra-Compact Fast Charger",
    brand: "Anker",
    shortDesc: "Gallium Nitride fast charging power adapter for MacBook, Dell XPS, iPhone 16, and Galaxy S24.",
    category: "Chargers and cables",
    categorySlug: "chargers",
    price: 30,
    originalPrice: 40,
    discount: 25,
    rating: 4.8,
    reviewsCount: 680,
    inStock: true,
    stockCount: 88,
    badge: "Best Value",
    image: "assets/images/hero_electronics_showcase_1792929458222.jpg",
    additionalImages: [
      "assets/images/hero_electronics_showcase_1792929458222.jpg"
    ],
    warranty: "24 Months Official Anker Replacement Guarantee",
    specs: {
      "Brand": "Anker",
      "Technology": "GaNPrime III Gallium Nitride Architecture with PowerIQ 4.0",
      "Total Wattage": "65W Max Multi-Device Fast Distribution",
      "Ports": "2x USB Type-C (65W Max) + 1x USB-A (22.5W)",
      "Safety": "ActiveShield 2.0 Real-time Temperature Monitoring",
      "Dimensions": "38 x 29 x 66 mm (Pocket Sized)"
    },
    description: "Ditch clutter and heavy bricks with Anker GaNPrime. Intelligently balances up to 65W across 3 connected devices with dynamic power allocation and comprehensive ActiveShield protection."
  },
  {
    id: "prod-bat-01",
    name: "Dell Original 99.6Wh 6-Cell Replacement Battery (XPS 15 / Precision)",
    brand: "Dell",
    shortDesc: "Genuine OEM Grade-A lithium-polymer 97Wh/99Wh battery for Dell XPS 15 (9560/9570/7590) & Precision series.",
    category: "Batteries and power adapters",
    categorySlug: "batteries",
    price: 49,
    originalPrice: 65,
    discount: 25,
    rating: 4.7,
    reviewsCount: 89,
    inStock: true,
    stockCount: 22,
    badge: "OEM Grade",
    image: "assets/images/hero_electronics_showcase_1792929458222.jpg",
    additionalImages: [
      "assets/images/hero_electronics_showcase_1792929458222.jpg"
    ],
    warranty: "1 Year Official Dell Replacement Guarantee",
    specs: {
      "Brand": "Dell OEM",
      "Capacity": "99.6Wh / 8600mAh (Airline Travel Approved Maximum)",
      "Cell Type": "Tier-1 High-Density Lithium-Polymer Cells",
      "Voltage": "11.4V Nominal",
      "Cycle Life": "800+ Charge Cycles with >80% retention",
      "Protection": "Multi-protect BMS onboard controller chip"
    },
    description: "Restore your Dell workstation's original all-day battery runtime with genuine Tier-1 Grade-A cell replacement packs. Equipped with integrated smart circuit protection to prevent overcharging and thermal runaway."
  },
  {
    id: "prod-part-mob-01",
    name: "Samsung Genuine SuperAMOLED 120Hz Display Assembly (Galaxy S22 5G)",
    brand: "Samsung",
    shortDesc: "Complete touch digitizer and OLED assembly for Galaxy S22 with pre-installed housing frame.",
    category: "Mobile spare parts",
    categorySlug: "mobile-parts",
    price: 65,
    originalPrice: 90,
    discount: 28,
    rating: 4.7,
    reviewsCount: 142,
    inStock: true,
    stockCount: 16,
    badge: "Genuine OEM",
    image: "assets/images/product_flagship_phone_1792929459254.jpg",
    additionalImages: [
      "assets/images/product_flagship_phone_1792929459254.jpg"
    ],
    warranty: "6 Months Touch & Display Warranty",
    specs: {
      "Brand": "Samsung OEM",
      "Panel Type": "Dynamic AMOLED 2X, 120Hz Refresh Rate",
      "Resolution": "2340 x 1080 FHD+",
      "Touch Screen": "Capacitive Multi-touch with Oleophobic Coating",
      "Included Accessories": "Pre-installed housing frame, speaker mesh, waterproof adhesive gasket",
      "Testing": "100% Factory Tested for Dead Pixels and Touch Accuracy"
    },
    description: "Original Samsung OEM replacement screen assembly featuring flawless color reproduction, smooth 120Hz responsiveness, and crisp brightness identical to factory specifications."
  },
  {
    id: "prod-part-lap-01",
    name: "Lenovo ThinkPad Backlit OEM Replacement Keyboard (US English)",
    brand: "Lenovo",
    shortDesc: "Precision scissor-switch backlit keyboard compatible with Lenovo ThinkPad T14, E14, and L14 series.",
    category: "Laptop spare parts",
    categorySlug: "laptop-parts",
    price: 25,
    originalPrice: 35,
    discount: 29,
    rating: 4.8,
    reviewsCount: 94,
    inStock: true,
    stockCount: 31,
    badge: "OEM Grade",
    image: "assets/images/hero_electronics_showcase_1792929458222.jpg",
    additionalImages: [
      "assets/images/hero_electronics_showcase_1792929458222.jpg"
    ],
    warranty: "1 Year Official Replacement Warranty",
    specs: {
      "Brand": "Lenovo OEM",
      "Key Switch": "Iconic ThinkPad Scissor-Mechanism with 1.8mm Key Travel",
      "Backlight": "Uniform Crisp White 2-Stage LED Backlighting",
      "Layout": "US English QWERTY with TrackPoint Integration",
      "Connection": "Gold-plated Ribbon Cable Interface",
      "Key Lifespan": "10 Million Keystrokes per Key"
    },
    description: "Replace worn-out or non-functional laptop keys with this genuine Lenovo ThinkPad precision keyboard. Crisp tactile keystrokes, smooth TrackPoint responsiveness, and evenly diffused LED backlighting."
  },
  {
    id: "prod-acc-01",
    name: "Belkin BoostCharge Pro Braided 240W USB-C to USB-C Cable (2m)",
    brand: "Belkin",
    shortDesc: "Ultra-durable Kevlar-braided 240W EPR cable supporting 40Gbps Thunderbolt 4 data transfer.",
    category: "Chargers and cables",
    categorySlug: "chargers",
    price: 12,
    originalPrice: 17,
    discount: 29,
    rating: 4.9,
    reviewsCount: 420,
    inStock: true,
    stockCount: 120,
    badge: "Must Have",
    image: "assets/images/hero_electronics_showcase_1792929458222.jpg",
    additionalImages: [
      "assets/images/hero_electronics_showcase_1792929458222.jpg"
    ],
    warranty: "Lifetime Breakage Warranty",
    specs: {
      "Brand": "Belkin",
      "Power Rating": "240W (48V / 5A) USB PD 3.1 Extended Power Range",
      "Data Transfer": "USB 4 / Thunderbolt 4 (Up to 40Gbps)",
      "Video Output": "Supports Single 8K @ 60Hz or Dual 4K Displays",
      "Length": "2.0 Meters (6.6 Feet)",
      "Durability": "Tested to withstand 50,000+ bends"
    },
    description: "The ultimate future-proof cable by Belkin for high-powered laptops, eGPUs, gaming monitors, and high-speed NVMe external enclosures."
  },
  {
    id: "prod-comp-02",
    name: "Espressif ESP32-S3 Wi-Fi & Bluetooth 5 Dual-Core AI Dev Board",
    brand: "Espressif",
    shortDesc: "240MHz Xtensa LX7 dual-core processor with 8MB PSRAM, 16MB Flash, and onboard ceramic antenna.",
    category: "Circuit boards and electronic components",
    categorySlug: "components",
    price: 13,
    originalPrice: 18,
    discount: 28,
    rating: 4.9,
    reviewsCount: 310,
    inStock: true,
    stockCount: 65,
    badge: "IoT Essential",
    image: "assets/images/product_component_board_1792929460819.jpg",
    additionalImages: [
      "assets/images/product_component_board_1792929460819.jpg"
    ],
    warranty: "6 Months Technical Guarantee",
    specs: {
      "Brand": "Espressif Systems",
      "CPU": "Xtensa 32-bit LX7 Dual-Core @ 240MHz with Vector Instructions",
      "Memory": "512KB SRAM, 8MB Octal PSRAM, 16MB Quad SPI Flash",
      "Wireless": "2.4GHz Wi-Fi 4 (802.11 b/g/n) + Bluetooth 5 (LE & Mesh)",
      "Interfaces": "45x Programmable GPIOs, USB OTG, Camera (DVP), LCD Interface",
      "Machine Learning": "Hardware Acceleration for TinyML, Edge Impulse, and Tensor Core"
    },
    description: "Empower your edge AI, smart home, and robotics projects with vector computing, massive 8MB PSRAM, and integrated low-power wireless communication direct from Espressif Systems."
  }
];

// Helper to look up product by ID
function getProductById(id) {
  if (!id) return null;
  return PRODUCTS.find(p => p.id === id) || null;
}

// Categories list with icons and counts
const CATEGORIES = [
  { name: "Smartphones", slug: "smartphones", icon: "fa-mobile-screen", count: 18 },
  { name: "Laptops and computers", slug: "laptops", icon: "fa-laptop", count: 14 },
  { name: "Headphones and audio devices", slug: "audio", icon: "fa-headphones-simple", count: 26 },
  { name: "Smartwatches and wearables", slug: "wearables", icon: "fa-clock", count: 12 },
  { name: "Chargers and cables", slug: "chargers", icon: "fa-bolt-lightning", count: 35 },
  { name: "Batteries and power adapters", slug: "batteries", icon: "fa-car-battery", count: 21 },
  { name: "Mobile spare parts", slug: "mobile-parts", icon: "fa-microchip", count: 48 },
  { name: "Laptop spare parts", slug: "laptop-parts", icon: "fa-keyboard", count: 32 },
  { name: "Circuit boards and electronic components", slug: "components", icon: "fa-circuit-board", count: 64 },
  { name: "Repair tools and accessories", slug: "tools", icon: "fa-screwdriver-wrench", count: 29 }
];
