/**
 * Sunkara LTD - Main Shared Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  updateCartBadge();
  initAnnouncement();
  initGlobalSearch();
});

// Setup sticky header & mobile navigation drawer
function initHeader() {
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav-close');

  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', () => {
      mobileNav.classList.add('open');
    });
  }

  if (closeBtn && mobileNav) {
    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  }

  // Close on backdrop click
  if (mobileNav) {
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        mobileNav.classList.remove('open');
      }
    });
  }
}

// Global search handling
function initGlobalSearch() {
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = input.value.trim();
        if (query) {
          window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  });
}

// Announcement dismissal
function initAnnouncement() {
  const bar = document.querySelector('.announcement-bar');
  const closeBtn = document.querySelector('.announcement-close');
  if (bar && closeBtn) {
    closeBtn.addEventListener('click', () => {
      bar.style.display = 'none';
      sessionStorage.setItem('sunkara_promo_closed', 'true');
    });

    if (sessionStorage.getItem('sunkara_promo_closed') === 'true') {
      bar.style.display = 'none';
    }
  }
}

// Standard Product Card HTML Generator
function renderProductCard(product) {
  const isFav = isWishlisted(product.id);
  return `
    <article class="product-card" data-id="${product.id}" data-category="${product.categorySlug}" data-price="${product.price}">
      <div class="product-thumb-wrap">
        ${product.discount > 0 ? `<span class="badge badge-discount product-badge-float">${product.discount}% OFF</span>` : ''}
        ${product.badge && product.discount === 0 ? `<span class="badge badge-featured product-badge-float">${product.badge}</span>` : ''}
        
        <button class="product-wishlist-btn ${isFav ? 'active' : ''}" onclick="handleWishlistClick(this, '${product.id}')" aria-label="Add to Wishlist">
          <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>

        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" onerror="handleImageError(this, '${product.name}')">
        </a>
      </div>

      <div class="product-body">
        <div class="product-meta">
          <span class="product-category-text">${product.brand ? `${product.brand} · ` : ''}${product.category}</span>
          <span>·</span>
          <span>${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
        </div>

        <a href="product.html?id=${product.id}">
          <h3 class="product-title">${product.name}</h3>
        </a>

        <p class="product-desc">${product.shortDesc}</p>

        <div class="product-rating">
          <span class="rating-stars">
            <i class="fa-solid fa-star"></i>
          </span>
          <span class="font-semibold text-xs">${product.rating}</span>
          <span class="rating-count">(${product.reviewsCount})</span>
        </div>

        <div class="product-pricing">
          <span class="current-price tabular-nums">${formatINR(product.price)}</span>
          ${product.originalPrice > product.price ? `<span class="original-price tabular-nums">${formatINR(product.originalPrice)}</span>` : ''}
        </div>

        <div class="product-actions">
          <button class="btn btn-primary btn-sm" onclick="addToCart('${product.id}', 1)">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
          <a href="product.html?id=${product.id}" class="btn btn-outline btn-sm" style="flex: 0 0 auto; padding: 0.4rem 0.65rem;" title="View Details">
            <i class="fa-regular fa-eye"></i>
          </a>
        </div>
      </div>
    </article>
  `;
}

// Handle Wishlist button toggle
function handleWishlistClick(btn, productId) {
  const added = toggleWishlist(productId);
  const icon = btn.querySelector('i');
  if (added) {
    btn.classList.add('active');
    icon.className = 'fa-solid fa-heart';
  } else {
    btn.classList.remove('active');
    icon.className = 'fa-regular fa-heart';
  }
}
