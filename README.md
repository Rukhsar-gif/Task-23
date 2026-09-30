# 💰 Tip Calculator in INR (Web Development Task 23)

A responsive, interactive Tip Calculator with Indian Rupee (₹) formatting built using HTML5, CSS3, and JavaScript.

---

## 🛠️ Tech Stack & Features

- **HTML5**: Input validation, custom currency symbols (₹), and accessibility.
- **CSS3**: Custom variables, Flexbox, Grid layout, and modern styling.
- **JavaScript (ES6+)**: Live calculations, `Intl.NumberFormat('en-IN', { currency: 'INR' })` formatting, and conditional validation logic.

---

## ❓ Interview Questions & Answers

### 1. How would you prevent division by zero?
Division by zero occurs when the number of people is `0` or empty, resulting in `Infinity` or `NaN`. 
We prevent this by:
- Setting `min="1"` on the HTML number input.
- Validating the input in JavaScript prior to calculations:
  ```js
  if (peopleValue <= 0 || isNaN(peopleValue)) {
      // Show error UI and halt calculation
      return;
  }
