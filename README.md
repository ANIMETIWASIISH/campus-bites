# Bella Vista Bistro - Restaurant Website

A clean, welcoming, and fully responsive website designed for an artisanal Mediterranean bistro. Built with semantic **HTML5**, modern **CSS3** (Flexbox & CSS Grid), and responsive design principles.

Developed for **CA Web Development - Project 1 (Beginner)**.

---

## 🌟 Live Demo & Repository
- **GitHub Repository**: [https://github.com/ANIMETIWASIISH/restaurant-website](https://github.com/ANIMETIWASIISH/restaurant-website)
- **Deployment Platform**: Ready for Netlify / Vercel / GitHub Pages

---

## 📋 Features & Specifications

### 1. Header & Navigation
- Restaurant brand logo with custom typography and icon badge.
- Smooth scrolling anchor navigation linking to `#about`, `#specials`, `#menu`, `#testimonials`, and `#contact`.
- **Pure CSS Responsive Hamburger Menu** for seamless mobile navigation without heavy JavaScript.

### 2. Hero Section
- Warm, inviting high-resolution background with contrast overlay.
- Subtle `@keyframes` smooth entrance animation.
- Dual Call-to-Action (CTA) buttons: *Explore Our Menu* and *Reserve a Table*.

### 3. About Section
- Two-column layout showcasing the restaurant's culinary philosophy, farm-to-table sourcing, and heritage.
- Floating milestone badge (*12+ Years of Culinary Excellence*).
- 3 key commitment pillars: Organic produce, master chef craft, and curated wine pairings.

### 4. Chef's Specials & Offers
- Featured seasonal specials with badge ribbons (*Chef's Special* and *20% Off Lunch*).
- Hover elevation and image scaling effects.

### 5. Signature Menu (8 Items)
- Built with **CSS Grid** (`repeat(auto-fit, minmax(280px, 1fr))`).
- Covers Starters, Mains, Desserts, and Beverages:
  1. *Bruschetta Pomodoro* ($9.50)
  2. *Burrata Caprese* ($13.00)
  3. *Margherita Verace* ($16.50)
  4. *Seafood Tagliatelle* ($24.00)
  5. *Rosemary Prime Ribeye* ($32.00)
  6. *Risotto allo Zafferano* ($19.50)
  7. *Classic Tiramisu* ($8.50)
  8. *Sicilian Blood Orange Spritz* ($7.00)
- High-quality food imagery, category tags, clear descriptions, and prominent pricing.

### 6. Customer Testimonials
- Authentic patron reviews with 5-star ratings, quotes, reviewer avatars, and titles.

### 7. Opening Hours, Location & Table Reservation
- Weekly opening schedule (Monday–Thursday, Friday–Saturday, Sunday).
- Physical address, contact phone, and email.
- Interactive table reservation form with date, time, party size, and dietary requirements.

### 8. Semantic HTML & Responsive Design
- Semantic elements throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<blockquote>`, `<figure>`, `<footer>`.
- Responsive breakpoints tested across mobile (< 520px), tablet (768px - 992px), and desktop (> 992px).

---

## 📁 Project Structure

```text
restaurant-website/
├── index.html       # Semantic HTML5 page structure
├── style.css        # Modern CSS3 with custom properties, Flexbox, Grid, & media queries
└── README.md        # Documentation, feature guide, and setup instructions
```

---

## 🚀 How to Run Locally

1. Clone or download the repository:
   ```bash
   git clone https://github.com/ANIMETIWASIISH/restaurant-website.git
   cd restaurant-website
   ```
2. Open `index.html` directly in any web browser, or serve it using a local static server:
   ```bash
   # Python 3
   python3 -m http.server 8000
   ```
3. Visit `http://localhost:8000` in your browser.

---

## 📤 Publishing to GitHub & Live Deployment

### Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Responsive restaurant website with HTML5 & CSS3"
git branch -M main
git remote add origin https://github.com/ANIMETIWASIISH/restaurant-website.git
git push -u origin main
```

### Deploy to Netlify / Vercel
1. Log in to [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).
2. Select **Add New Project** -> **Import from GitHub**.
3. Choose `restaurant-website` repository.
4. Click **Deploy** (No build command needed for plain HTML/CSS).
