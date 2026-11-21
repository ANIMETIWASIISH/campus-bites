/**
 * Bella Vista Bistro - Interactive Application Logic
 * Features:
 * - Dark / Light Theme Toggle with LocalStorage persistence
 * - Menu Category Filtering (All, Starters, Mains, Desserts, Beverages)
 * - Interactive Order / Cart Drawer with item counters and totals
 * - Live Toast Notifications
 * - Reservation Form Validation & Confirmation Modal
 * - Mobile Menu Auto-close on link click
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== 1. THEME TOGGLE (DARK / LIGHT) ====================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('bv_theme') || 'light';

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('bv_theme', isDark ? 'dark' : 'light');
      showToast(isDark ? 'Switched to Dark Theme' : 'Switched to Light Theme');
    });
  }

  // ==================== 2. MOBILE MENU AUTO-CLOSE ====================
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link, .nav-btn');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navToggle && navToggle.checked) {
        navToggle.checked = false;
      }
    });
  });

  // ==================== 3. MENU CATEGORY FILTER ====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          // Add re-appearance animation
          card.style.animation = 'none';
          card.offsetHeight; // trigger reflow
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ==================== 4. CART & ORDER STATE ====================
  let cart = [];
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartCountEl = document.getElementById('cart-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const cartCheckoutBtn = document.getElementById('cart-checkout-btn');

  function updateCartUI() {
    // Total count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalCount;
    cartCountEl.style.display = totalCount > 0 ? 'inline-flex' : 'none';

    // Total price
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalEl.textContent = `$${totalAmount.toFixed(2)}`;

    // Render items
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart-state">
          <span class="empty-cart-icon">🍽️</span>
          <p>Your order is currently empty.</p>
          <p class="empty-cart-sub">Add your favorite dishes from the menu!</p>
        </div>
      `;
      cartCheckoutBtn.disabled = true;
      return;
    }

    cartCheckoutBtn.disabled = false;
    cartItemsContainer.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)} ($${item.price.toFixed(2)} each)</span>
        </div>
        <div class="cart-item-controls">
          <button type="button" class="qty-btn" onclick="window.changeCartQty(${index}, -1)" aria-label="Decrease quantity">−</button>
          <span class="qty-display">${item.quantity}</span>
          <button type="button" class="qty-btn" onclick="window.changeCartQty(${index}, 1)" aria-label="Increase quantity">+</button>
          <button type="button" class="del-btn" onclick="window.removeCartItem(${index})" aria-label="Remove item">🗑️</button>
        </div>
      </div>
    `).join('');
  }

  // Global methods for inline button actions
  window.changeCartQty = function(index, change) {
    if (cart[index]) {
      cart[index].quantity += change;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      updateCartUI();
    }
  };

  window.removeCartItem = function(index) {
    if (cart[index]) {
      const removed = cart.splice(index, 1)[0];
      updateCartUI();
      showToast(`Removed ${removed.name} from order`);
    }
  };

  function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price: parseFloat(price), quantity: 1 });
    }
    updateCartUI();
    showToast(`Added ${name} to order! 🛒`);
  }

  // Bind all "Add to Order" buttons
  const orderBtns = document.querySelectorAll('.btn-add-order');
  orderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.getAttribute('data-name');
      const price = btn.getAttribute('data-price');
      addToCart(name, price);
    });
  });

  // Open/Close Cart Drawer
  function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Cart Checkout / Proceed to Reservation
  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', () => {
      closeCart();
      const notesField = document.getElementById('notes');
      if (notesField && cart.length > 0) {
        const orderSummary = cart.map(i => `${i.quantity}x ${i.name}`).join(', ');
        notesField.value = `Pre-ordered dishes: ${orderSummary}`;
      }
      const reserveSection = document.getElementById('reserve');
      if (reserveSection) {
        reserveSection.scrollIntoView({ behavior: 'smooth' });
        showToast('Order linked! Please complete your table details below.');
      }
    });
  }

  // ==================== 5. TOAST NOTIFICATION ====================
  function showToast(message) {
    let toast = document.getElementById('live-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'live-toast';
      toast.className = 'live-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // ==================== 6. RESERVATION FORM & CONFIRMATION MODAL ====================
  const resForm = document.getElementById('reservation-form');
  const resDateInput = document.getElementById('resDate');
  const modal = document.getElementById('confirmation-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDetails = document.getElementById('modal-details');

  // Set today's date as min
  if (resDateInput) {
    const today = new Date().toISOString().split('T')[0];
    resDateInput.min = today;
    resDateInput.value = today;
  }

  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const date = document.getElementById('resDate').value;
      const time = document.getElementById('resTime').value;
      const guests = document.getElementById('guests').value;
      const notes = document.getElementById('notes').value;

      const bookingRef = 'BV-' + Math.floor(100000 + Math.random() * 900000);

      modalDetails.innerHTML = `
        <div class="booking-summary-card">
          <div class="booking-ref-badge">Booking Ref: <strong>${bookingRef}</strong></div>
          <p><strong>Guest Name:</strong> ${name}</p>
          <p><strong>Contact:</strong> ${email} | ${phone}</p>
          <p><strong>Date & Time:</strong> ${date} at ${time}</p>
          <p><strong>Party Size:</strong> ${guests} Guest(s)</p>
          ${notes ? `<p><strong>Special Notes:</strong> ${notes}</p>` : ''}
          ${cart.length > 0 ? `
            <div class="preordered-section">
              <strong>Pre-Ordered Dishes:</strong>
              <ul>${cart.map(i => `<li>${i.quantity}x ${i.name} ($${(i.price * i.quantity).toFixed(2)})</li>`).join('')}</ul>
            </div>
          ` : ''}
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Reset form and cart
      resForm.reset();
      if (resDateInput) resDateInput.value = new Date().toISOString().split('T')[0];
      cart = [];
      updateCartUI();
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      showToast('Reservation confirmed! We look forward to hosting you.');
    });
  }

  // Initialize UI
  updateCartUI();
});
