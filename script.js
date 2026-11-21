/**
 * Campus Bites Cafe - Simple JavaScript
 * Web Development CA Project 1 (1st Year College Level)
 * Clear, beginner-friendly functions with full button functionality.
 */

// 1. Mobile Navigation Hamburger Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');

menuBtn.addEventListener('click', function () {
  navMenu.classList.toggle('show');
});

// Close mobile navigation when any link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    navMenu.classList.remove('show');
  });
});

// 2. Menu Category Filtering Function
function filterMenu(category) {
  // Update active button state
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(function (btn) {
    btn.classList.remove('active');
  });

  if (window.event && window.event.target) {
    window.event.target.classList.add('active');
  }

  // Filter food cards
  const items = document.querySelectorAll('.menu-item');
  items.forEach(function (item) {
    const itemCategory = item.getAttribute('data-category');
    if (category === 'all' || itemCategory === category) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// 3. Quick Order Tray & Total Calculator in Rupees (₹)
let selectedOrders = [];
let totalAmount = 0;

function addToOrder(itemName, price) {
  selectedOrders.push({ name: itemName, price: price });
  totalAmount += price;
  updateOrderTray();
  alert('Added to your tray: ' + itemName + ' (₹' + price + ')');
}

function removeFromOrder(index) {
  totalAmount -= selectedOrders[index].price;
  selectedOrders.splice(index, 1);
  updateOrderTray();
}

function updateOrderTray() {
  const orderList = document.getElementById('order-list');
  const emptyMsg = document.getElementById('order-empty-msg');
  const totalDisplay = document.getElementById('order-total');

  if (selectedOrders.length === 0) {
    emptyMsg.style.display = 'block';
    orderList.innerHTML = '';
    totalDisplay.innerText = '₹0';
    return;
  }

  emptyMsg.style.display = 'none';
  orderList.innerHTML = '';

  selectedOrders.forEach(function (item, index) {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.padding = '6px 0';
    li.style.borderBottom = '1px solid #ffe0b2';

    li.innerHTML = 
      '<span>' + item.name + '</span>' +
      '<div>' +
        '<strong>₹' + item.price + '</strong> ' +
        '<button onclick="removeFromOrder(' + index + ')" style="background:none; border:none; color:#d84315; cursor:pointer; font-weight:bold; margin-left:8px;" title="Remove">✕</button>' +
      '</div>';
    orderList.appendChild(li);
  });

  totalDisplay.innerText = '₹' + totalAmount;
}

function proceedToTableBooking() {
  if (selectedOrders.length === 0) {
    alert('Your tray is empty! Please click "+ Add to Order" on any item first.');
    return;
  }

  // Fill in pre-ordered items into the special request field
  const notesField = document.getElementById('notes');
  const itemsSummary = selectedOrders.map(function (item) { return item.name; }).join(', ');
  notesField.value = 'Pre-ordered items: ' + itemsSummary + ' (Tray Total: ₹' + totalAmount + ')';

  // Smoothly scroll down to reservation card
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// 4. Handle Table Booking Submission
function handleBooking(event) {
  event.preventDefault(); // Stop default form reload

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const college = document.getElementById('college').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const people = document.getElementById('people').value;

  alert(
    '🎉 Table Reserved Successfully at Campus Bites Cafe!\n\n' +
    '👤 Name: ' + name + '\n' +
    '📱 Phone: ' + phone + '\n' +
    '🎓 College: ' + college + '\n' +
    '📅 Date & Time: ' + date + ' at ' + time + '\n' +
    '👥 Group Size: ' + people + '\n' +
    '💰 Total Pre-order: ₹' + totalAmount + '\n\n' +
    'Show your College Student ID card at the counter to claim your 15% discount!'
  );

  // Reset form and order tray
  document.getElementById('booking-form').reset();
  selectedOrders = [];
  totalAmount = 0;
  updateOrderTray();
}

// Set minimum date to today so students cannot pick past dates
window.addEventListener('DOMContentLoaded', function () {
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }
});
