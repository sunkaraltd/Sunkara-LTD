/**
 * Sunkara LTD - Realistic Payment Gateway & Checkout Controller
 */

let selectedPaymentMethod = 'card';
let simulateFailureMode = false;

// Initialize checkout page
function initCheckout() {
  const cart = getStoredCart();
  if (cart.length === 0) {
    const mainContainer = document.getElementById('checkout-main-container');
    if (mainContainer) {
      mainContainer.innerHTML = `
        <div class="empty-state" style="margin: 3rem auto; max-width: 600px;">
          <div class="empty-state-icon"><i class="fa-solid fa-basket-shopping"></i></div>
          <h2 class="empty-state-title">Your cart is empty</h2>
          <p class="empty-state-desc">You need at least one product in your cart to proceed with checkout.</p>
          <a href="shop.html" class="btn btn-primary btn-lg">Browse Store</a>
        </div>
      `;
    }
    return;
  }

  renderCheckoutOrderSummary();
  setupBillingToggle();
  setupPaymentTabs();
  setupCardFormatting();
}

// Setup billing address toggle
function setupBillingToggle() {
  const sameAddressCheckbox = document.getElementById('same-as-delivery');
  const billingFieldsWrapper = document.getElementById('billing-address-fields');
  if (sameAddressCheckbox && billingFieldsWrapper) {
    sameAddressCheckbox.addEventListener('change', (e) => {
      billingFieldsWrapper.style.display = e.target.checked ? 'none' : 'block';
    });
  }
}

// Render the right-column order summary in checkout
function renderCheckoutOrderSummary() {
  const container = document.getElementById('checkout-order-summary');
  if (!container) return;

  const cart = getStoredCart();
  const appliedCouponCode = localStorage.getItem(STORAGE_KEYS.APPLIED_COUPON) || null;
  const { subtotal, discount, shipping, vatAmount, total, appliedCoupon } = calculateOrderTotals(cart, appliedCouponCode);

  let itemsHtml = '';
  cart.forEach(item => {
    const product = getProductById(item.productId);
    if (!product) return;
    itemsHtml += `
      <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 0.875rem;">
        <img src="${product.image}" alt="${product.name}" style="width: 52px; height: 52px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--surface-border);" onerror="handleImageError(this, '${product.name}')">
        <div style="flex: 1; min-width: 0;">
          <div style="font-size: 0.8125rem; font-weight: 700; color: var(--secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${product.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Qty: ${item.quantity} × ${formatGBP(product.price)}</div>
        </div>
        <div style="font-size: 0.875rem; font-weight: 700; color: var(--secondary); text-align: right;" class="tabular-nums">
          ${formatGBP(product.price * item.quantity)}
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="order-summary-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--surface-border);">
        <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--secondary);">Order Summary (${cart.reduce((s, i) => s + i.quantity, 0)})</h3>
        <a href="cart.html" style="font-size: 0.75rem; color: var(--primary); font-weight: 600;">Edit Cart</a>
      </div>

      <div style="max-height: 220px; overflow-y: auto; padding-right: 0.25rem; margin-bottom: 1rem; border-bottom: 1px solid var(--surface-border);">
        ${itemsHtml}
      </div>

      <div class="summary-row">
        <span>Subtotal</span>
        <span class="tabular-nums font-semibold">${formatGBP(subtotal)}</span>
      </div>

      ${discount > 0 ? `
      <div class="summary-row" style="color: var(--success);">
        <span>Coupon Discount (${appliedCoupon ? appliedCoupon.code : ''})</span>
        <span class="tabular-nums font-semibold">-${formatGBP(discount)}</span>
      </div>
      ` : ''}

      <div class="summary-row">
        <span>Delivery Charge</span>
        <span class="tabular-nums font-semibold">${shipping === 0 ? '<span style="color: var(--success);">FREE</span>' : formatGBP(shipping)}</span>
      </div>

      <div class="summary-row" style="font-size: 0.75rem; color: var(--text-light);">
        <span>VAT (20% Included)</span>
        <span class="tabular-nums">${formatGBP(vatAmount)}</span>
      </div>

      <div class="summary-row total-row">
        <span>Total Payable</span>
        <span class="tabular-nums" style="color: var(--primary); font-size: 1.35rem;">${formatGBP(total)}</span>
      </div>

      <!-- Payment Failure Simulation Toggle -->
      <div style="margin-top: 1rem; padding: 0.75rem; background: var(--bg-main); border: 1px dashed var(--surface-border); border-radius: var(--radius-sm); font-size: 0.75rem;">
        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; color: var(--text-muted); font-weight: 600;">
          <input type="checkbox" id="toggle-simulate-failure" onchange="toggleFailureSimulation(this.checked)">
          <span>Simulate Bank Gateway Failure (Testing)</span>
        </label>
      </div>

      <!-- Action Button -->
      <button id="pay-now-btn" class="btn btn-primary btn-block btn-lg" style="margin-top: 1.25rem; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);" onclick="handleProcessPayment()">
        <i class="fa-solid fa-lock"></i> Pay ${formatGBP(total)}
      </button>

      <div style="margin-top: 1rem; text-align: center; font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
        <i class="fa-solid fa-shield-halved" style="color: var(--success);"></i> 256-Bit SSL Secure Payment
      </div>
    </div>
  `;
}

// Payment method tab switching
function setupPaymentTabs() {
  const tabs = document.querySelectorAll('.payment-method-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedPaymentMethod = tab.getAttribute('data-method');

      // Hide all contents
      document.querySelectorAll('.payment-content-panel').forEach(p => p.style.display = 'none');
      const activePanel = document.getElementById(`payment-panel-${selectedPaymentMethod}`);
      if (activePanel) {
        activePanel.style.display = 'block';
      }
    });
  });
}

// Format card number with spaces and auto-detect brand
function setupCardFormatting() {
  const cardInput = document.getElementById('card-number-input');
  const cardBrandIcon = document.getElementById('card-brand-icon');
  const cardPreviewNum = document.getElementById('card-preview-num');
  const cardNameInput = document.getElementById('card-name-input');
  const cardPreviewName = document.getElementById('card-preview-name');
  const cardExpiryInput = document.getElementById('card-expiry-input');
  const cardPreviewExpiry = document.getElementById('card-preview-expiry');

  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 16) value = value.slice(0, 16);
      
      // Auto formatting with spaces every 4 digits
      const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = formatted;
      if (cardPreviewNum) {
        cardPreviewNum.textContent = formatted || '•••• •••• •••• ••••';
      }

      // Brand detection
      if (cardBrandIcon) {
        if (/^4/.test(value)) {
          cardBrandIcon.className = 'fa-brands fa-cc-visa';
          cardBrandIcon.style.color = '#38BDF8';
        } else if (/^5[1-5]/.test(value)) {
          cardBrandIcon.className = 'fa-brands fa-cc-mastercard';
          cardBrandIcon.style.color = '#F97316';
        } else if (/^60|^65|^81|^82/.test(value)) {
          cardBrandIcon.className = 'fa-solid fa-credit-card';
          cardBrandIcon.style.color = '#10B981';
        } else {
          cardBrandIcon.className = 'fa-solid fa-credit-card';
          cardBrandIcon.style.color = '#94A3B8';
        }
      }
    });
  }

  if (cardNameInput && cardPreviewName) {
    cardNameInput.addEventListener('input', (e) => {
      cardPreviewName.textContent = e.target.value.trim().toUpperCase() || 'CARDHOLDER NAME';
    });
  }

  if (cardExpiryInput && cardPreviewExpiry) {
    cardExpiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 4) val = val.slice(0, 4);
      if (val.length >= 2) {
        val = val.slice(0, 2) + '/' + val.slice(2);
      }
      e.target.value = val;
      cardPreviewExpiry.textContent = val || 'MM/YY';
    });
  }
}

// Toggle simulated failure mode
function toggleFailureSimulation(checked) {
  simulateFailureMode = checked;
  if (checked) {
    showToast('Simulation set to FAIL mode for testing retry flows.', 'error');
  } else {
    showToast('Simulation set to SUCCESS mode.', 'success');
  }
}

// Validate Customer & Delivery Details
function validateCustomerDetails() {
  let isValid = true;

  const clearError = (id) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('visible');
    const input = document.getElementById(id.replace('-error', ''));
    if (input) input.classList.remove('error');
  };

  const setError = (id, msg) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = msg;
      el.classList.add('visible');
    }
    const input = document.getElementById(id.replace('-error', ''));
    if (input) input.classList.add('error');
    isValid = false;
  };

  // Name
  const name = document.getElementById('cust-name')?.value.trim();
  if (!name || name.length < 2) {
    setError('cust-name-error', 'Please enter your full name (minimum 2 characters).');
  } else {
    clearError('cust-name-error');
  }

  // Email
  const email = document.getElementById('cust-email')?.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    setError('cust-email-error', 'Please enter a valid email address.');
  } else {
    clearError('cust-email-error');
  }

  // UK Mobile (07xxx xxxxxx or +44 7xxx xxxxxx)
  const phone = document.getElementById('cust-phone')?.value.replace(/[\s-]/g, '') || '';
  const phoneRegex = /^(?:\+44|0)7\d{9}$/;
  if (!phoneRegex.test(phone)) {
    setError('cust-phone-error', 'Please enter a valid UK mobile number (e.g. 07700 900123).');
  } else {
    clearError('cust-phone-error');
  }

  // Address
  const address = document.getElementById('cust-address')?.value.trim();
  if (!address || address.length < 5) {
    setError('cust-address-error', 'Please enter a complete street address.');
  } else {
    clearError('cust-address-error');
  }

  // City
  const city = document.getElementById('cust-city')?.value.trim();
  if (!city) {
    setError('cust-city-error', 'City is required.');
  } else {
    clearError('cust-city-error');
  }

  // State / County
  const state = document.getElementById('cust-state')?.value;
  if (!state) {
    setError('cust-state-error', 'Please select a county.');
  } else {
    clearError('cust-state-error');
  }

  // UK Postcode (e.g. TW3 3RS)
  const pin = document.getElementById('cust-pincode')?.value.trim();
  const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
  if (!pin || !postcodeRegex.test(pin)) {
    setError('cust-pincode-error', 'Please enter a valid UK postcode (e.g. TW3 3RS).');
  } else {
    clearError('cust-pincode-error');
  }

  return isValid;
}

// Validate Payment Method Fields
function validatePaymentFields() {
  if (selectedPaymentMethod === 'card') {
    const cardNum = document.getElementById('card-number-input')?.value.replace(/\s/g, '');
    const cardName = document.getElementById('card-name-input')?.value.trim();
    const expiry = document.getElementById('card-expiry-input')?.value.trim();
    const cvv = document.getElementById('card-cvv-input')?.value.trim();

    if (!cardNum || cardNum.length < 15) {
      showToast('Please enter a valid 16-digit card number.', 'error');
      return false;
    }
    if (!cardName) {
      showToast('Please enter the cardholder name.', 'error');
      return false;
    }
    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
      showToast('Please enter a valid expiry date (MM/YY).', 'error');
      return false;
    }
    if (!cvv || cvv.length < 3) {
      showToast('Please enter a valid 3 or 4-digit CVV.', 'error');
      return false;
    }
    return true;
  }

  if (selectedPaymentMethod === 'netbanking') {
    const bank = document.getElementById('netbanking-bank-select')?.value;
    if (!bank) {
      showToast('Please select your bank for online banking.', 'error');
      return false;
    }
    return true;
  }

  if (selectedPaymentMethod === 'wallet') {
    const wallet = document.querySelector('input[name="wallet-select"]:checked');
    if (!wallet) {
      showToast('Please select a digital wallet.', 'error');
      return false;
    }
    return true;
  }

  return true;
}

// Process Payment Flow
function handleProcessPayment() {
  // 1. Validate customer details
  if (!validateCustomerDetails()) {
    showToast('Please fix the highlighted errors in customer details.', 'error');
    window.scrollTo({ top: 120, behavior: 'smooth' });
    return;
  }

  // 2. Validate payment method fields
  if (!validatePaymentFields()) {
    return;
  }

  const cart = getStoredCart();
  if (cart.length === 0) {
    showToast('Your cart is empty.', 'error');
    return;
  }

  // Open simulated payment processing overlay
  const overlay = document.getElementById('payment-modal-overlay');
  if (overlay) overlay.classList.add('active');

  const step1 = document.getElementById('pay-step-1');
  const step2 = document.getElementById('pay-step-2');
  const step3 = document.getElementById('pay-step-3');
  const modalStatus = document.getElementById('modal-status-text');

  // Step 1: Initializing tunnel
  if (step1) {
    step1.className = 'payment-step active';
    step1.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Establishing 256-bit secure gateway tunnel...';
  }
  if (modalStatus) modalStatus.textContent = 'Contacting payment processor...';

  // Step 2: Authorizing with bank
  setTimeout(() => {
    if (step1) {
      step1.className = 'payment-step completed';
      step1.innerHTML = '<i class="fa-solid fa-circle-check"></i> Secure SSL tunnel established.';
    }
    if (step2) {
      step2.className = 'payment-step active';
      step2.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authorizing credentials with issuing bank...';
    }
    if (modalStatus) modalStatus.textContent = 'Verifying with bank...';
  }, 1200);

  // Step 3: Final outcome
  setTimeout(() => {
    if (step2) {
      step2.className = 'payment-step completed';
      step2.innerHTML = '<i class="fa-solid fa-circle-check"></i> Bank authorization received.';
    }

    if (simulateFailureMode) {
      // Simulate failure
      if (step3) {
        step3.className = 'payment-step';
        step3.style.color = 'var(--danger)';
        step3.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Transaction declined: Bank timeout / simulated test error.';
      }
      if (modalStatus) modalStatus.textContent = 'Payment Failed';

      setTimeout(() => {
        if (overlay) overlay.classList.remove('active');
        showFailureDialog();
      }, 900);
      return;
    }

    // Success flow!
    if (step3) {
      step3.className = 'payment-step completed';
      step3.innerHTML = '<i class="fa-solid fa-circle-check"></i> Payment token verified successfully.';
    }
    if (modalStatus) modalStatus.textContent = 'Payment Approved!';

    const orderId = generateOrderId();
    const appliedCouponCode = localStorage.getItem(STORAGE_KEYS.APPLIED_COUPON) || null;
    const totals = calculateOrderTotals(cart, appliedCouponCode);

    const customerData = {
      name: document.getElementById('cust-name')?.value.trim() || 'Guest Customer',
      email: document.getElementById('cust-email')?.value.trim() || 'customer@sunkaraltd.co.uk',
      phone: document.getElementById('cust-phone')?.value.trim() || '07700 900123',
      address: document.getElementById('cust-address')?.value.trim() || '61 Albion Road',
      city: document.getElementById('cust-city')?.value.trim() || 'Hounslow',
      state: document.getElementById('cust-state')?.value || 'Greater London',
      pin: document.getElementById('cust-pincode')?.value.trim() || 'TW3 3RS'
    };

    const orderRecord = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: customerData,
      paymentMethod: selectedPaymentMethod.toUpperCase(),
      paymentStatus: 'PAYMENT SUCCESSFUL',
      items: cart.map(item => {
        const prod = getProductById(item.productId);
        return {
          productId: item.productId,
          name: prod ? prod.name : 'Electronic Item',
          price: prod ? prod.price : 0,
          quantity: item.quantity,
          image: prod ? prod.image : ''
        };
      }),
      totals
    };

    // Save order record
    localStorage.setItem(STORAGE_KEYS.LAST_ORDER, JSON.stringify(orderRecord));

    // Clear cart and applied coupon now that order has succeeded
    setStoredCart([]);
    localStorage.removeItem(STORAGE_KEYS.APPLIED_COUPON);
    updateCartBadge();

    // Redirect to Order Confirmation page
    setTimeout(() => {
      window.location.href = 'order-success.html';
    }, 800);

  }, 2600);
}

// Failure modal retry handler
function showFailureDialog() {
  const failureModal = document.getElementById('failure-retry-modal');
  if (failureModal) {
    failureModal.style.display = 'flex';
  } else {
    showToast('Simulated payment was declined. You can uncheck failure simulation and try again.', 'error');
  }
}

function closeFailureDialog() {
  const failureModal = document.getElementById('failure-retry-modal');
  if (failureModal) failureModal.style.display = 'none';
}
