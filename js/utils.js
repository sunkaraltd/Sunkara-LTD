/**
 * Sunkara LTD - Utilities and Helper Functions
 */

const STORAGE_KEYS = {
  CART: 'sunkaraltd_cart',
  WISHLIST: 'sunkaraltd_wishlist',
  LAST_ORDER: 'sunkaraltd_last_order',
  APPLIED_COUPON: 'sunkaraltd_applied_coupon'
};

// Format currency into Pounds Sterling (£) using UK number formatting
function formatGBP(amount) {
  const num = Number(amount);
  if (isNaN(num) || amount === null) return '£0';
  return '£' + num.toLocaleString('en-GB', {
    minimumFractionDigits: Number.isInteger(num) ? 0 : 2,
    maximumFractionDigits: 2
  });
}

// Delivery thresholds (GBP)
const FREE_SHIPPING_THRESHOLD = 50;
const STANDARD_SHIPPING_CHARGE = 4.99;

// Available promo coupon codes
const VALID_COUPONS = {
  'SUNKARA10': {
    code: 'SUNKARA10',
    type: 'percent',
    value: 10,
    maxDiscount: 150,
    minOrder: 100,
    description: '10% off up to £150 on orders above £100'
  },
  'VOLT10': {
    code: 'SUNKARA10',
    type: 'percent',
    value: 10,
    maxDiscount: 150,
    minOrder: 100,
    description: '10% off up to £150 on orders above £100'
  },
  'FREESHIP': {
    code: 'FREESHIP',
    type: 'shipping',
    value: 100,
    minOrder: 49,
    description: 'Free standard delivery on your order'
  },
  'SAVE50': {
    code: 'SAVE50',
    type: 'flat',
    value: 50,
    minOrder: 200,
    description: 'Flat £50 discount on orders above £200'
  }
};

// Calculate order financials
function calculateOrderTotals(cartItems, couponCode = null) {
  let subtotal = 0;
  cartItems.forEach(item => {
    const product = getProductById(item.productId);
    if (product) {
      subtotal += product.price * item.quantity;
    }
  });

  // Free standard UK delivery over £50, otherwise £4.99
  let shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_CHARGE;
  let discount = 0;
  let appliedCoupon = null;

  if (couponCode && VALID_COUPONS[couponCode.toUpperCase()]) {
    const coupon = VALID_COUPONS[couponCode.toUpperCase()];
    if (subtotal >= (coupon.minOrder || 0)) {
      appliedCoupon = coupon;
      if (coupon.type === 'percent') {
        discount = Math.min((subtotal * coupon.value) / 100, coupon.maxDiscount || Infinity);
      } else if (coupon.type === 'flat') {
        discount = Math.min(coupon.value, subtotal);
      } else if (coupon.type === 'shipping') {
        shipping = 0;
      }
    }
  }

  // UK VAT at 20%, already included in the displayed prices
  const taxableAmount = Math.max(0, subtotal - discount);
  const vatAmount = Math.round((taxableAmount * 0.2 / 1.2) * 100) / 100;
  const total = Math.max(0, taxableAmount + shipping);

  return {
    subtotal,
    discount: Math.round(discount * 100) / 100,
    shipping,
    vatAmount,
    total: Math.round(total * 100) / 100,
    appliedCoupon
  };
}

// Global Toast Notifications
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' 
    ? '<i class="fa-solid fa-circle-check"></i>' 
    : '<i class="fa-solid fa-circle-exclamation"></i>';

  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}

// Generate realistic Sunkara LTD Order Reference
function generateOrderId() {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `SL-2026-${randomNum}`;
}

// Storage helpers (with fallback to read legacy key if present)
function getStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CART) || localStorage.getItem('voltedge_cart');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read cart from localStorage', e);
    return [];
  }
}

function setStoredCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
}

function getStoredWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WISHLIST) || localStorage.getItem('voltedge_wishlist');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function toggleWishlist(productId) {
  const wishlist = getStoredWishlist();
  const index = wishlist.indexOf(productId);
  let added = false;
  if (index >= 0) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
    added = true;
  }
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  showToast(added ? 'Added to your Wishlist!' : 'Removed from your Wishlist.', 'success');
  return added;
}

function isWishlisted(productId) {
  const wishlist = getStoredWishlist();
  return wishlist.includes(productId);
}

// Image fallback handler
function handleImageError(imgElement, fallbackTitle = "Sunkara LTD") {
  imgElement.onerror = null;
  imgElement.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23F1F5F9' width='400' height='300'/%3E%3Cpath d='M170 120h60v60h-60z' fill='%232563EB' opacity='0.2'/%3E%3Ctext fill='%2364748B' font-family='sans-serif' font-size='14' font-weight='600' x='50%25' y='55%25' text-anchor='middle'%3ESunkara LTD Genuine%3C/text%3E%3C/svg%3E";
}
