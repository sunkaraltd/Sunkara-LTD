/**
 * Sunkara LTD - Cart Management Module
 */

// Add item to cart
function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product) {
    showToast('Product not found.', 'error');
    return false;
  }

  const cart = getStoredCart();
  const existingIndex = cart.findIndex(item => item.productId === productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
    if (cart[existingIndex].quantity > product.stockCount) {
      cart[existingIndex].quantity = product.stockCount;
      showToast(`Maximum stock limit (${product.stockCount}) reached.`, 'error');
    } else {
      showToast(`Updated "${product.name}" quantity (${cart[existingIndex].quantity}).`, 'success');
    }
  } else {
    cart.push({
      productId: productId,
      quantity: Math.min(quantity, product.stockCount),
      addedAt: new Date().toISOString()
    });
    showToast(`"${product.name}" added to Cart!`, 'success');
  }

  setStoredCart(cart);
  updateCartBadge();
  return true;
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = getStoredCart();
  const product = getProductById(productId);
  cart = cart.filter(item => item.productId !== productId);
  setStoredCart(cart);
  updateCartBadge();
  if (product) {
    showToast(`Removed "${product.name}" from cart.`, 'success');
  }
  // Re-render if on cart page
  if (document.getElementById('cart-items-container')) {
    renderCartPage();
  }
}

// Update quantity by delta (+1 or -1)
function updateCartQuantity(productId, delta) {
  const cart = getStoredCart();
  const item = cart.find(i => i.productId === productId);
  const product = getProductById(productId);
  if (!item || !product) return;

  const newQty = item.quantity + delta;
  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }
  if (newQty > product.stockCount) {
    showToast(`Only ${product.stockCount} units available in stock.`, 'error');
    return;
  }

  item.quantity = newQty;
  setStoredCart(cart);
  updateCartBadge();

  if (document.getElementById('cart-items-container')) {
    renderCartPage();
  }
}

// Update the badge count on all cart icon instances in the DOM
function updateCartBadge() {
  const cart = getStoredCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-counter');
  badges.forEach(b => {
    b.textContent = totalCount;
    b.style.display = totalCount > 0 ? 'flex' : 'none';
  });
}

// Render the interactive Cart Page (cart.html)
function renderCartPage() {
  const container = document.getElementById('cart-items-container');
  const summaryContainer = document.getElementById('cart-summary-container');
  if (!container || !summaryContainer) return;

  const cart = getStoredCart();
  const appliedCouponCode = localStorage.getItem(STORAGE_KEYS.APPLIED_COUPON) || null;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon"><i class="fa-solid fa-cart-shopping"></i></div>
        <h2 class="empty-state-title">Your shopping cart is empty</h2>
        <p class="empty-state-desc">Looks like you haven't added any electronics or spare parts yet.</p>
        <a href="shop.html" class="btn btn-primary btn-lg">
          <i class="fa-solid fa-arrow-left"></i> Start Shopping
        </a>
      </div>
    `;
    summaryContainer.innerHTML = '';
    return;
  }

  // Render Cart Item Rows
  let itemsHtml = `
    <div class="cart-items-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--surface-border);">
        <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--secondary);">Shopping Bag (${cart.reduce((s, i) => s + i.quantity, 0)} Items)</h2>
        <button onclick="clearAllCart()" style="font-size: 0.8125rem; color: var(--danger); font-weight: 600;">
          <i class="fa-regular fa-trash-can"></i> Clear Cart
        </button>
      </div>
  `;

  cart.forEach(item => {
    const product = getProductById(item.productId);
    if (!product) return;
    const itemTotal = product.price * item.quantity;

    itemsHtml += `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}" class="cart-item-img" onerror="handleImageError(this, '${product.name}')">
        <div class="cart-item-details">
          <span class="cart-item-cat">${product.category}</span>
          <a href="product.html?id=${product.id}" class="cart-item-name">${product.name}</a>
          <span class="cart-item-price">${formatINR(product.price)} each</span>
        </div>
        <div class="qty-control">
          <button class="qty-btn" onclick="updateCartQuantity('${product.id}', -1)" aria-label="Decrease quantity">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span class="qty-val tabular-nums">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartQuantity('${product.id}', 1)" aria-label="Increase quantity">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span class="cart-item-total tabular-nums">${formatINR(itemTotal)}</span>
          <button class="cart-item-remove" onclick="removeFromCart('${product.id}')" aria-label="Remove item">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
  });

  itemsHtml += `
      <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
        <a href="shop.html" class="btn btn-outline btn-sm">
          <i class="fa-solid fa-arrow-left"></i> Continue Shopping
        </a>
      </div>
    </div>
  `;
  container.innerHTML = itemsHtml;

  // Calculate Totals
  const { subtotal, discount, shipping, gstAmount, total, appliedCoupon } = calculateOrderTotals(cart, appliedCouponCode);

  // Render Order Summary
  const freeShippingNeeded = Math.max(0, 999 - subtotal);
  const freeShippingPercent = Math.min(100, Math.round((subtotal / 999) * 100));

  summaryContainer.innerHTML = `
    <div class="order-summary-card">
      <h3 class="summary-title">Order Summary</h3>

      <!-- Free Delivery Progress -->
      <div class="free-shipping-progress">
        <div style="display: flex; justify-content: space-between; font-weight: 600;">
          <span>${shipping === 0 ? '<i class="fa-solid fa-circle-check"></i> Eligible for FREE Delivery!' : `Add ${formatINR(freeShippingNeeded)} more for FREE Delivery`}</span>
          <span>${freeShippingPercent}%</span>
        </div>
        <div class="shipping-bar">
          <div class="shipping-bar-fill" style="width: ${freeShippingPercent}%"></div>
        </div>
      </div>

      <!-- Financial Rows -->
      <div class="summary-row">
        <span>Cart Subtotal</span>
        <span class="tabular-nums font-semibold">${formatINR(subtotal)}</span>
      </div>

      ${discount > 0 ? `
      <div class="summary-row" style="color: var(--success);">
        <span>Coupon Discount (${appliedCoupon ? appliedCoupon.code : ''})</span>
        <span class="tabular-nums font-semibold">-${formatINR(discount)}</span>
      </div>
      ` : ''}

      <div class="summary-row">
        <span>Estimated Delivery Fee</span>
        <span class="tabular-nums font-semibold">${shipping === 0 ? '<span style="color: var(--success);">FREE</span>' : formatINR(shipping)}</span>
      </div>

      <div class="summary-row" style="font-size: 0.8125rem; color: var(--text-light);">
        <span>Includes 18% GST (Calculated)</span>
        <span class="tabular-nums">${formatINR(gstAmount)}</span>
      </div>

      <div class="summary-row total-row">
        <span>Grand Total</span>
        <span class="tabular-nums" style="color: var(--primary);">${formatINR(total)}</span>
      </div>

      <!-- Coupon Code Box -->
      <div class="coupon-section">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 0.8125rem; font-weight: 700; color: var(--secondary);"><i class="fa-solid fa-tag"></i> Have a Coupon Code?</span>
          ${appliedCoupon ? `<button onclick="removeCoupon()" style="font-size: 0.75rem; color: var(--danger); font-weight: 600;">Remove</button>` : ''}
        </div>
        ${!appliedCoupon ? `
          <div class="coupon-input-wrap">
            <input type="text" id="coupon-code-input" class="coupon-input" placeholder="e.g. SUNKARA10 or SAVE500" value="">
            <button class="btn btn-secondary btn-sm" onclick="applyCouponCode()">Apply</button>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-light); margin-top: 0.4rem;">
            Try <strong>SUNKARA10</strong> for 10% off or <strong>SAVE500</strong> for ₹500 off
          </div>
        ` : `
          <div style="margin-top: 0.4rem; font-size: 0.8125rem; color: var(--success); font-weight: 600;">
            <i class="fa-solid fa-circle-check"></i> Coupon "${appliedCoupon.code}" applied successfully!
          </div>
        `}
      </div>

      <!-- Proceed to Checkout Button -->
      <a href="checkout.html" class="btn btn-primary btn-block btn-lg" style="margin-top: 1rem; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);">
        Proceed to Checkout <i class="fa-solid fa-arrow-right"></i>
      </a>

      <!-- Trust Features -->
      <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--surface-border); display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.75rem; color: var(--text-muted);">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-shield-halved" style="color: var(--success);"></i> 256-Bit SSL Encrypted Demo Gateway
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-rotate-left" style="color: var(--primary);"></i> 7 Days Easy Return & Replacement
        </div>
      </div>
    </div>
  `;
}

// Clear all items in cart
function clearAllCart() {
  if (confirm("Are you sure you want to empty your shopping cart?")) {
    setStoredCart([]);
    updateCartBadge();
    renderCartPage();
    showToast("Shopping cart cleared.", "success");
  }
}

// Coupon actions
function applyCouponCode() {
  const input = document.getElementById('coupon-code-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  if (!code) {
    showToast("Please enter a coupon code.", "error");
    return;
  }
  if (!VALID_COUPONS[code]) {
    showToast(`Coupon "${code}" is invalid or expired.`, "error");
    return;
  }

  const cart = getStoredCart();
  const { subtotal } = calculateOrderTotals(cart);
  const coupon = VALID_COUPONS[code];

  if (subtotal < coupon.minOrder) {
    showToast(`Order total must be at least ${formatINR(coupon.minOrder)} for this coupon.`, "error");
    return;
  }

  localStorage.setItem(STORAGE_KEYS.APPLIED_COUPON, code);
  showToast(`Coupon "${code}" applied successfully!`, "success");
  renderCartPage();
}

function removeCoupon() {
  localStorage.removeItem(STORAGE_KEYS.APPLIED_COUPON);
  showToast("Coupon removed.", "success");
  renderCartPage();
}

// Direct Buy Now helper
function buyNow(productId, quantity = 1) {
  addToCart(productId, quantity);
  window.location.href = 'checkout.html';
}
