document.addEventListener('DOMContentLoaded', () => {
  // DOM Element References
  const billInput = document.getElementById('bill-input');
  const customTipInput = document.getElementById('custom-tip');
  const peopleInput = document.getElementById('people-input');
  const tipBtns = document.querySelectorAll('.tip-btn');
  const tipPerPersonDisplay = document.getElementById('tip-per-person');
  const totalPerPersonDisplay = document.getElementById('total-per-person');
  const resetBtn = document.getElementById('reset-btn');
  const peopleInputGroup = peopleInput.closest('.input-group');

  // State Variables
  let billValue = 0;
  let tipPercent = 15; // Default selected 15%
  let peopleValue = 1;

  // Helper function to format currency in Indian Rupees (en-IN)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Calculation logic
  const calculateResults = () => {
    // Guard against division by zero and invalid negative values
    if (peopleValue <= 0 || isNaN(peopleValue)) {
      peopleInputGroup.classList.add('invalid');
      tipPerPersonDisplay.textContent = '₹0.00';
      totalPerPersonDisplay.textContent = '₹0.00';
      return;
    }

    peopleInputGroup.classList.remove('invalid');

    if (billValue >= 0) {
      const totalTip = billValue * (tipPercent / 100);
      const totalBill = billValue + totalTip;

      const tipPerPerson = totalTip / peopleValue;
      const totalPerPerson = totalBill / peopleValue;

      tipPerPersonDisplay.textContent = formatCurrency(tipPerPerson);
      totalPerPersonDisplay.textContent = formatCurrency(totalPerPerson);
    }
  };

  // Event Listeners for Live Updates
  billInput.addEventListener('input', (e) => {
    billValue = parseFloat(e.target.value) || 0;
    calculateResults();
  });

  peopleInput.addEventListener('input', (e) => {
    peopleValue = parseInt(e.target.value, 10);
    calculateResults();
  });

  // Tip Preset Buttons Event
  tipBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active state from all buttons
      tipBtns.forEach((b) => b.classList.remove('active'));
      customTipInput.value = '';

      // Set active button & tip percentage
      btn.classList.add('active');
      tipPercent = parseFloat(btn.dataset.tip);

      calculateResults();
    });
  });

  // Custom Tip Input Event
  customTipInput.addEventListener('input', (e) => {
    tipBtns.forEach((b) => b.classList.remove('active'));

    const val = parseFloat(e.target.value);
    tipPercent = isNaN(val) ? 0 : val;

    calculateResults();
  });

  // Reset Button Event
  resetBtn.addEventListener('click', () => {
    billInput.value = '';
    customTipInput.value = '';
    peopleInput.value = '1';

    billValue = 0;
    tipPercent = 15;
    peopleValue = 1;

    tipBtns.forEach((b) => b.classList.remove('active'));
    // Restore default active button (15%)
    document.querySelector('.tip-btn[data-tip="15"]').classList.add('active');

    peopleInputGroup.classList.remove('invalid');
    calculateResults();
  });

  // Initial Calculation Run
  calculateResults();
});