/**
 * KEOVKA Premium Single-Product E-Commerce
 * Interactive Client Application
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. STATE MANAGEMENT
  // ==========================================
  const state = {
    selectedSize: '500g',
    sizes: {
      '250g': {
        price: 499,
        mrp: 550,
        discount: 'Save 9%',
        servingNote: 'Ideal for 5–7 personal indulgence moments',
        weight: '250g'
      },
      '500g': {
        price: 899,
        mrp: 1050,
        discount: 'Save 14%',
        servingNote: 'Ideal for 12–15 generous sharing & gifting moments',
        weight: '500g'
      }
    },
    quantity: 1,
    cart: [
      // Preload with 1 jar for instant delightful preview
      {
        id: 'keovka-500g',
        name: 'Keovka Traditional Dry Fruit Mix',
        size: '500g',
        price: 899,
        quantity: 1,
        image: 'assets/jar_isolated_zero_margin.webp'
      }
    ],
    appliedCoupon: null,
    freeShippingThreshold: 799
  };

  // ==========================================
  // 2. DOM ELEMENTS
  // ==========================================
  // Header & Nav
  const siteHeader = document.getElementById('siteHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const cartTriggerBtn = document.getElementById('cartTriggerBtn');
  const cartCountBadge = document.getElementById('cartCountBadge');

  // Product Showcase Elements
  const mainProductPicture = document.getElementById('mainProductPicture');
  const mainWebpSource = document.getElementById('mainWebpSource');
  const mainProductImg = document.getElementById('mainProductImg');
  const currentViewIndicator = document.getElementById('currentViewIndicator');
  const angleButtons = document.querySelectorAll('.angle-btn');

  // Size Selector Elements
  const sizeCards = document.querySelectorAll('.size-card-btn');
  const currentPriceDisplay = document.getElementById('currentPriceDisplay');
  const currentMrpDisplay = document.getElementById('currentMrpDisplay');
  const discountPercentBadge = document.getElementById('discountPercentBadge');
  const sizeServingNote = document.getElementById('sizeServingNote');

  // Quantity Elements
  const qtyInput = document.getElementById('productQuantityInput');
  const qtyDecrementBtn = document.getElementById('qtyDecrementBtn');
  const qtyIncrementBtn = document.getElementById('qtyIncrementBtn');
  const addToCartBtn = document.getElementById('addToCartBtn');
  const buyNowBtn = document.getElementById('buyNowBtn');

  // Sticky Quick Bar
  const stickyQuickBar = document.getElementById('stickyQuickBar');
  const stickyPriceText = document.getElementById('stickyPriceText');
  const stickySizeToggleBtn = document.getElementById('stickySizeToggleBtn');
  const stickyAddBtn = document.getElementById('stickyAddBtn');
  const productSection = document.getElementById('product');

  // Cart Drawer Elements
  const cartOverlay = document.getElementById('cartOverlay');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartDrawerBody = document.getElementById('cartDrawerBody');
  const cartItemsList = document.getElementById('cartItemsList');
  const emptyCartState = document.getElementById('emptyCartState');
  const emptyCartShopBtn = document.getElementById('emptyCartShopBtn');
  const cartHeaderCount = document.getElementById('cartHeaderCount');
  const shippingTrackerMessage = document.getElementById('shippingTrackerMessage');
  const shippingTrackerFill = document.getElementById('shippingTrackerFill');
  const cartSubtotalText = document.getElementById('cartSubtotalText');
  const discountLine = document.getElementById('discountLine');
  const discountCodeName = document.getElementById('discountCodeName');
  const cartDiscountText = document.getElementById('cartDiscountText');
  const cartShippingText = document.getElementById('cartShippingText');
  const cartTotalText = document.getElementById('cartTotalText');
  const couponCodeInput = document.getElementById('couponCodeInput');
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  const couponFeedback = document.getElementById('couponFeedback');
  const proceedCheckoutBtn = document.getElementById('proceedCheckoutBtn');

  // Checkout Modal Elements
  const checkoutModalBackdrop = document.getElementById('checkoutModalBackdrop');
  const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
  const checkoutForm = document.getElementById('checkoutForm');
  const orderSuccessState = document.getElementById('orderSuccessState');
  const modalOrderSummaryQty = document.getElementById('modalOrderSummaryQty');
  const modalOrderSummaryTotal = document.getElementById('modalOrderSummaryTotal');
  const checkoutButtonPrice = document.getElementById('checkoutButtonPrice');
  const successCustomerName = document.getElementById('successCustomerName');
  const orderRefNumber = document.getElementById('orderRefNumber');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');

  // Gifting Modal Elements
  const giftingModalBackdrop = document.getElementById('giftingModalBackdrop');
  const giftingCloseBtn = document.getElementById('giftingCloseBtn');
  const openCorporateGiftingBtn = document.getElementById('openCorporateGiftingBtn');
  const openGiftingModalMobile = document.getElementById('openGiftingModalMobile');
  const giftingInquiryForm = document.getElementById('giftingInquiryForm');
  const giftingSuccessMsg = document.getElementById('giftingSuccessMsg');

  // Policy Modal Elements
  const policyModalBackdrop = document.getElementById('policyModalBackdrop');
  const policyCloseBtn = document.getElementById('policyCloseBtn');
  const policyModalTitle = document.getElementById('policyModalTitle');
  const policyModalBody = document.getElementById('policyModalBody');
  const policyTriggers = document.querySelectorAll('.policy-modal-trigger');

  // Toast Container
  const toastContainer = document.getElementById('toastContainer');

  // ==========================================
  // 3. TOAST NOTIFICATION UTILITY
  // ==========================================
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">✦</span>
      <span class="toast-text">${message}</span>
    `;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // ==========================================
  // 4. HEADER & MOBILE MENU
  // ==========================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileNavDrawer.classList.toggle('open');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNavDrawer.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Active Nav Link On Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.desktop-nav a[href*="${sectionId}"]`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add('active');
      } else {
        if (navLink) navLink.classList.remove('active');
      }
    });
  });

  // ==========================================
  // 5. PRODUCT GALLERY ANGLE SWITCHER
  // ==========================================
  angleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      angleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const webpSrc = btn.getAttribute('data-img-webp');
      const fallbackSrc = btn.getAttribute('data-img-src');
      const labelText = btn.getAttribute('data-label');

      mainProductImg.style.opacity = '0.3';
      setTimeout(() => {
        mainWebpSource.srcset = webpSrc;
        mainProductImg.src = fallbackSrc;
        mainProductImg.style.opacity = '1';
        currentViewIndicator.textContent = labelText;
      }, 150);
    });
  });

  // ==========================================
  // 6. SIZE SELECTOR LOGIC
  // ==========================================
  function updateSizeSelection(sizeKey) {
    state.selectedSize = sizeKey;
    const sizeData = state.sizes[sizeKey];

    sizeCards.forEach(card => {
      if (card.getAttribute('data-size') === sizeKey) {
        card.classList.add('active');
        card.setAttribute('aria-checked', 'true');
      } else {
        card.classList.remove('active');
        card.setAttribute('aria-checked', 'false');
      }
    });

    currentPriceDisplay.textContent = sizeData.price;
    currentMrpDisplay.textContent = `₹${sizeData.mrp}`;
    discountPercentBadge.textContent = sizeData.discount;
    sizeServingNote.textContent = sizeData.servingNote;

    // Update Sticky Bar
    stickyPriceText.textContent = `₹${sizeData.price} (${sizeData.weight})`;
    stickySizeToggleBtn.textContent = `Size: ${sizeData.weight}`;
  }

  sizeCards.forEach(card => {
    card.addEventListener('click', () => {
      const sizeKey = card.getAttribute('data-size');
      updateSizeSelection(sizeKey);
    });
  });

  // Toggle button on sticky bar
  stickySizeToggleBtn.addEventListener('click', () => {
    const nextSize = state.selectedSize === '500g' ? '250g' : '500g';
    updateSizeSelection(nextSize);
    showToast(`Switched size to ${nextSize}`);
  });

  // ==========================================
  // 7. QUANTITY STEPPER
  // ==========================================
  qtyDecrementBtn.addEventListener('click', () => {
    if (state.quantity > 1) {
      state.quantity -= 1;
      qtyInput.value = state.quantity;
    }
  });

  qtyIncrementBtn.addEventListener('click', () => {
    if (state.quantity < 10) {
      state.quantity += 1;
      qtyInput.value = state.quantity;
    } else {
      showToast('Maximum order quantity per jar is 10. For larger orders, use our gifting concierge.', 'info');
    }
  });

  // ==========================================
  // 8. CART MANAGEMENT & DRAWER
  // ==========================================
  function openCartDrawer() {
    cartOverlay.classList.add('open');
    cartOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    renderCart();
  }

  function closeCartDrawer() {
    cartOverlay.classList.remove('open');
    cartOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cartTriggerBtn.addEventListener('click', openCartDrawer);
  cartCloseBtn.addEventListener('click', closeCartDrawer);
  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) closeCartDrawer();
  });
  if (emptyCartShopBtn) {
    emptyCartShopBtn.addEventListener('click', () => {
      closeCartDrawer();
      window.location.hash = 'product';
    });
  }

  function addItemToCart(sizeKey, qty) {
    const sizeData = state.sizes[sizeKey];
    const itemId = `keovka-${sizeKey}`;
    const existingIndex = state.cart.findIndex(item => item.id === itemId);

    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += qty;
    } else {
      state.cart.push({
        id: itemId,
        name: 'Keovka Traditional Dry Fruit Mix',
        size: sizeKey,
        price: sizeData.price,
        quantity: qty,
        image: 'assets/jar_isolated_zero_margin.webp'
      });
    }

    renderCart();
    openCartDrawer();
    showToast(`Added ${qty} × Keovka (${sizeKey}) to your bag`);
  }

  addToCartBtn.addEventListener('click', () => {
    addItemToCart(state.selectedSize, state.quantity);
  });

  stickyAddBtn.addEventListener('click', () => {
    addItemToCart(state.selectedSize, 1);
  });

  buyNowBtn.addEventListener('click', () => {
    addItemToCart(state.selectedSize, state.quantity);
    closeCartDrawer();
    openCheckoutModal();
  });

  function renderCart() {
    // Total Items
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadge.textContent = totalItems;
    cartHeaderCount.textContent = `(${totalItems} item${totalItems === 1 ? '' : 's'})`;

    // Subtotal
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotalText.textContent = `₹${subtotal}`;

    // Coupon calculation
    let discountAmount = 0;
    if (state.appliedCoupon === 'WELCOME10' || state.appliedCoupon === 'KEOVKA10') {
      discountAmount = Math.round(subtotal * 0.10);
      discountLine.style.display = 'flex';
      discountCodeName.textContent = state.appliedCoupon;
      cartDiscountText.textContent = `−₹${discountAmount}`;
    } else {
      discountLine.style.display = 'none';
    }

    // Shipping calculation
    const isFreeShipping = subtotal >= state.freeShippingThreshold || totalItems === 0;
    const shippingAmount = isFreeShipping ? 0 : 50;
    cartShippingText.textContent = isFreeShipping ? 'FREE' : '₹50';

    // Free Shipping Progress
    if (subtotal >= state.freeShippingThreshold) {
      shippingTrackerMessage.innerHTML = '🎉 You have unlocked <strong>Free All-India Express Shipping!</strong>';
      shippingTrackerFill.style.width = '100%';
    } else {
      const remaining = state.freeShippingThreshold - subtotal;
      const progressPercent = Math.min(100, Math.round((subtotal / state.freeShippingThreshold) * 100));
      shippingTrackerMessage.innerHTML = `Add <strong>₹${remaining}</strong> more to unlock <strong>Free Express Shipping!</strong>`;
      shippingTrackerFill.style.width = `${progressPercent}%`;
    }

    // Final Total
    const finalTotal = Math.max(0, subtotal - discountAmount + shippingAmount);
    cartTotalText.textContent = `₹${finalTotal}`;

    // Render items list
    if (state.cart.length === 0) {
      emptyCartState.style.display = 'block';
      cartItemsList.innerHTML = '';
      document.getElementById('cartDrawerFooter').style.display = 'none';
      shippingTrackerMessage.textContent = 'Add items to unlock Free Express Shipping across India.';
      shippingTrackerFill.style.width = '0%';
    } else {
      emptyCartState.style.display = 'none';
      document.getElementById('cartDrawerFooter').style.display = 'block';

      cartItemsList.innerHTML = state.cart.map(item => `
        <div class="cart-item zero-margin" data-item-id="${item.id}">
          <div class="cart-item-thumb-wrapper zero-margin">
            <img src="${item.image}" alt="${item.name}" class="cart-item-thumb zero-margin">
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-variant">Size: ${item.size} • Pure Glass Jar</span>
            <div class="cart-item-bottom">
              <div class="cart-item-qty">
                <button type="button" class="cart-qty-btn cart-qty-minus" data-id="${item.id}">−</button>
                <span class="cart-qty-num">${item.quantity}</span>
                <button type="button" class="cart-qty-btn cart-qty-plus" data-id="${item.id}">+</button>
              </div>
              <span class="cart-item-price">₹${item.price * item.quantity}</span>
            </div>
          </div>
          <button type="button" class="cart-item-remove-btn" data-id="${item.id}" aria-label="Remove item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      `).join('');

      // Wire cart item events
      document.querySelectorAll('.cart-qty-minus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const item = state.cart.find(i => i.id === id);
          if (item) {
            if (item.quantity > 1) {
              item.quantity -= 1;
            } else {
              state.cart = state.cart.filter(i => i.id !== id);
            }
            renderCart();
          }
        });
      });

      document.querySelectorAll('.cart-qty-plus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const item = state.cart.find(i => i.id === id);
          if (item) {
            item.quantity += 1;
            renderCart();
          }
        });
      });

      document.querySelectorAll('.cart-item-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          state.cart = state.cart.filter(i => i.id !== id);
          renderCart();
          showToast('Item removed from bag');
        });
      });
    }
  }

  // Coupon handling
  applyCouponBtn.addEventListener('click', () => {
    const code = couponCodeInput.value.trim().toUpperCase();
    if (code === 'WELCOME10' || code === 'KEOVKA10') {
      state.appliedCoupon = code;
      couponFeedback.className = 'coupon-feedback success';
      couponFeedback.textContent = `Promo code ${code} applied: 10% discount!`;
      renderCart();
      showToast('10% Festive discount applied!');
    } else if (code === '') {
      couponFeedback.className = 'coupon-feedback error';
      couponFeedback.textContent = 'Please enter a valid coupon code.';
    } else {
      couponFeedback.className = 'coupon-feedback error';
      couponFeedback.textContent = 'Invalid promo code. Try WELCOME10 for 10% off.';
    }
  });

  // ==========================================
  // 9. CHECKOUT MODAL
  // ==========================================
  function openCheckoutModal() {
    if (state.cart.length === 0) {
      showToast('Your bag is empty! Please add Keovka to proceed.');
      return;
    }
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    if (state.appliedCoupon) discount = Math.round(subtotal * 0.10);
    const final = subtotal - discount;

    modalOrderSummaryQty.textContent = totalItems;
    modalOrderSummaryTotal.textContent = `₹${final}`;
    checkoutButtonPrice.textContent = `₹${final}`;

    checkoutForm.style.display = 'block';
    orderSuccessState.style.display = 'none';

    checkoutModalBackdrop.classList.add('open');
    checkoutModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckoutModal() {
    checkoutModalBackdrop.classList.remove('open');
    checkoutModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  proceedCheckoutBtn.addEventListener('click', () => {
    closeCartDrawer();
    openCheckoutModal();
  });

  checkoutCloseBtn.addEventListener('click', closeCheckoutModal);
  checkoutModalBackdrop.addEventListener('click', (e) => {
    if (e.target === checkoutModalBackdrop) closeCheckoutModal();
  });

  // Payment Options Radio toggle styling
  document.querySelectorAll('.payment-method-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.payment-method-option').forEach(o => o.classList.remove('active'));
      option.classList.add('active');
    });
  });

  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameVal = document.getElementById('cName').value || 'Customer';
    const randomRef = 'KV-2026-' + Math.floor(1000 + Math.random() * 9000);

    successCustomerName.textContent = nameVal;
    orderRefNumber.textContent = randomRef;

    checkoutForm.style.display = 'none';
    orderSuccessState.style.display = 'block';

    // Clear cart after checkout
    state.cart = [];
    state.appliedCoupon = null;
    renderCart();

    showToast(`Order ${randomRef} confirmed! Thank you.`, 'success');
  });

  closeSuccessBtn.addEventListener('click', closeCheckoutModal);

  // ==========================================
  // 10. CORPORATE & FESTIVE GIFTING MODAL
  // ==========================================
  function openGiftingModal() {
    giftingModalBackdrop.classList.add('open');
    giftingModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeGiftingModal() {
    giftingModalBackdrop.classList.remove('open');
    giftingModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openCorporateGiftingBtn) openCorporateGiftingBtn.addEventListener('click', openGiftingModal);
  if (openGiftingModalMobile) openGiftingModalMobile.addEventListener('click', () => {
    mobileNavDrawer.classList.remove('open');
    openGiftingModal();
  });
  giftingCloseBtn.addEventListener('click', closeGiftingModal);
  giftingModalBackdrop.addEventListener('click', (e) => {
    if (e.target === giftingModalBackdrop) closeGiftingModal();
  });

  giftingInquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    giftingInquiryForm.style.display = 'none';
    giftingSuccessMsg.style.display = 'block';
    showToast('Gifting inquiry received! We will connect within 24 hours.');
  });

  // ==========================================
  // 11. POLICY MODAL WITH DYNAMIC CONTENT
  // ==========================================
  const policyDatabase = {
    shipping: {
      title: 'Shipping & Delivery',
      content: `
        <h4>All-India Express Dispatch</h4>
        <p>Every jar of Keovka is packed fresh and dispatched from our temperature-controlled packaging hub within 24 hours of receiving your order.</p>
        <h4>Delivery Timelines</h4>
        <ul>
          <li><strong>Metro Cities (Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata):</strong> 2–3 business days via express air.</li>
          <li><strong>Rest of India:</strong> 3–5 business days via premium surface couriers (Bluedart, Delhivery).</li>
        </ul>
        <h4>Shipping Charges</h4>
        <p>Complimentary Free Shipping on all orders above ₹799. Orders below ₹799 are subject to a nominal flat shipping fee of ₹50 across India.</p>
      `
    },
    returns: {
      title: 'Returns & Quality Guarantee',
      content: `
        <h4>Our Quality Assurance</h4>
        <p>Keovka products undergo rigorous sensory and quality audits before dispatch. In the rare event that your shipment arrives damaged or the glass seal is broken, we offer an immediate, hassle-free replacement or full refund.</p>
        <h4>How to Claim</h4>
        <p>Simply email our team at <strong>hello@keovka.com</strong> within 48 hours of delivery with photos of the damaged package. Our concierge team will dispatch a replacement within 24 hours.</p>
      `
    },
    privacy: {
      title: 'Privacy Policy',
      content: `
        <h4>Your Privacy is Sacred</h4>
        <p>At Keovka, we strictly honor your personal information. Your contact details, shipping addresses, and transaction histories are encrypted using 256-bit SSL protocols.</p>
        <h4>No Third-Party Sharing</h4>
        <p>We do not sell, license, or disclose your information to any third-party marketing entities. Information is solely utilized to process your orders and deliver shipment updates.</p>
      `
    },
    terms: {
      title: 'Terms & Conditions',
      content: `
        <h4>Handcrafted Food Product</h4>
        <p>Keovka is a premium packaged food product prepared with select agricultural ingredients (nuts, dried figs, lotus seeds, spices). Minor natural variations in harvest color and size may occur across batches.</p>
        <h4>Storage Advice</h4>
        <p>Keep the jar sealed airtight in a cool, dry place away from direct sunlight. Best consumed within 12 months from the packaging date stamped on the jar base.</p>
      `
    },
    faq: {
      title: 'Frequently Asked Questions',
      content: `
        <h4>What makes Keovka unique?</h4>
        <p>Keovka is designed as a singular, refined food experience that brings together roasted California almonds, succulent Afghan figs, emerald pistachios, and rich cashews with light crisp lotus seeds and warm Tellicherry black pepper.</p>
        <h4>Is Keovka a makhana product?</h4>
        <p>No. Keovka is a complete premium packaged snack and gifting product. Popped lotus seeds (makhana) are simply one of the ingredients used to provide an airy, crisp textural contrast to the rich slow-roasted nuts and figs.</p>
        <h4>Is it suitable for gifting?</h4>
        <p>Yes, Keovka was consciously designed for both modern personal snacking and elevated festive gifting. Encased in an elegant glass jar with a gold seal, it is ready for Diwali, weddings, and corporate gifting.</p>
      `
    }
  };

  policyTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const policyKey = trigger.getAttribute('data-policy');
      const data = policyDatabase[policyKey];
      if (data) {
        policyModalTitle.textContent = data.title;
        policyModalBody.innerHTML = data.content;
        policyModalBackdrop.classList.add('open');
        policyModalBackdrop.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  policyCloseBtn.addEventListener('click', () => {
    policyModalBackdrop.classList.remove('open');
    policyModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });

  policyModalBackdrop.addEventListener('click', (e) => {
    if (e.target === policyModalBackdrop) {
      policyModalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ==========================================
  // 12. STICKY QUICK BUY OBSERVER
  // ==========================================
  if (productSection && stickyQuickBar) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Show sticky bar when user scrolls PAST the product showcase
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          stickyQuickBar.classList.add('visible');
        } else {
          stickyQuickBar.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(productSection);
  }

  // ==========================================
  // 13. NEWSLETTER SUBSCRIPTION FORM
  // ==========================================
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      input.value = '';
      showToast('Welcome to the Keovka Table. Check your inbox for our seasonal batch note.');
    });
  }

  // Initial cart render on load
  renderCart();
});

