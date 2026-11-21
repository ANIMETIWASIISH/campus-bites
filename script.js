/**
 * Campus Bites Cafe - Simple JavaScript
 * Web Development CA Project 1 (1st Year College Level)
 * Very simple, easy-to-read lines of code for viva & demonstration.
 */

// 1. Mobile Hamburger Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');

menuBtn.addEventListener('click', function () {
  navMenu.classList.toggle('show');
});

// Close mobile menu when any navigation link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    navMenu.classList.remove('show');
  });
});

// 2. Menu Category Filtering Function
function filterMenu(category) {
  // Update active button style
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(function (btn) {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  // Filter menu items
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
  alert(itemName + ' (₹' + price + ') added to your quick order tray!');
}

function updateOrderTray() {
  const orderList = document.getElementById('order-list');
  const emptyMsg = document.getElementById('order-empty-msg');
  const totalDisplay = document.getElementById('order-total');

  if (selectedOrders.length > 0) {
    emptyMsg.style.display = 'none';
    orderList.innerHTML = '';

    selectedOrders.forEach(function (item) {
      const li = document.createElement('li');
      li.innerHTML = '<span>' + item.name + '</span> <strong>₹' + item.price + '</strong>';
      orderList.appendChild(li);
    });

    totalDisplay.innerText = '₹' + totalAmount;
  }
}

function proceedToTableBooking() {
  if (selectedOrders.length === 0) {
    alert('Please add at least one item to order first!');
    return;
  }

  // Pre-fill special request field with order items
  const notesField = document.getElementById('notes');
  const itemsSummary = selectedOrders.map(function (item) { return item.name; }).join(', ');
  notesField.value = 'Pre-ordered items: ' + itemsSummary + ' (Total: ₹' + totalAmount + ')';

  // Smooth scroll to booking form
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// 4. Handle Table Booking Submission
function handleBooking(event) {
  event.preventDefault(); // Stop page reload

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const people = document.getElementById('people').value;

  alert(
    '🎉 Table Reserved Successfully!\n\n' +
    'Name: ' + name + '\n' +
    'Phone: ' + phone + '\n' +
    'Date & Time: ' + date + ' at ' + time + '\n' +
    'Party Size: ' + people + '\n\n' +
    'Show your Student ID at the counter for your 15% discount!'
  );

  // Reset form after successful booking
  document.getElementById('booking-form').reset();
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
