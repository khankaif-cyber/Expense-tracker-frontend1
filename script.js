let expenses = []; // Array to store expenses
let totalAmount = 0; // Track total balance

const API_URL = "https://expense-racker-backend2-18.onrender.com";

// Example fetch expenses
fetch(`${API_URL}/api/expenses`)
  .then(res => res.json())
  .then(data => console.log(data));

// DOM elements
const categorySelect = document.getElementById('category_select');
const amountInput = document.getElementById('amount_input');
const infoInput = document.getElementById('info');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

function updateTable() {
  expenseTableBody.innerHTML = '';
  totalAmount = 0;

  expenses.forEach((expense, index) => {
    if (expense.category === 'Income') totalAmount += expense.amount;
    if (expense.category === 'Expense') totalAmount -= expense.amount;

    const newRow = expenseTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    infoCell.textContent = expense.info;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      expenses.splice(index, 1);
      updateTable();
    });

    deleteCell.appendChild(deleteBtn);
  });

  totalAmountCell.textContent = totalAmount;
}

addBtn.addEventListener('click', () => {
  const category = categorySelect.value;
  const amount = Number(amountInput.value);
  const info = infoInput.value;
  const date = dateInput.value;

  // Validations
  if (!category) {
    alert('Please select a category');
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }
  if (!info) {
    alert('Please enter info');
    return;
  }
  if (!date) {
    alert('Please select a date');
    return;
  }

  // Add expense
  expenses.push({ category, amount, info, date });
  updateTable();

  // Clear inputs
  categorySelect.value = '';
  amountInput.value = '';
  infoInput.value = '';
  dateInput.value = '';
});
