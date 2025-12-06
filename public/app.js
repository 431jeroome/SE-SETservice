// Income category dropdown logic
window.addEventListener('DOMContentLoaded', function() {
  var incomeCategories = [
    "Allowance",
    "Salary",
    "Scholarship",
    "Freelance",
    "Gifts",
    "Others"
  ];
  var incomeDropdown = document.getElementById('incomeDropdown');
  var incomeCategoryInput = document.getElementById('incomeCategory');
  var incomeDropdownList = document.getElementById('incomeDropdownList');
  if (incomeDropdown && incomeCategoryInput && incomeDropdownList) {
    incomeDropdownList.innerHTML = '';
    incomeCategories.forEach(function(cat) {
      var item = document.createElement('div');
      item.className = 'dropdown-item';
      item.textContent = cat;
      item.addEventListener('mousedown', function(e) {
        incomeCategoryInput.value = cat;
        incomeDropdownList.style.display = 'none';
      });
      incomeDropdownList.appendChild(item);
    });
    incomeCategoryInput.addEventListener('click', function(e) {
      if (incomeDropdownList.style.display === 'block') {
        incomeDropdownList.style.display = 'none';
      } else {
        incomeDropdownList.style.display = 'block';
      }
    });
    document.addEventListener('mousedown', function(e) {
      if (!incomeDropdown.contains(e.target)) {
        incomeDropdownList.style.display = 'none';
      }
    });
  }
});

// Expense category dropdown logic (no redeclaration)
window.addEventListener('DOMContentLoaded', function() {
  var expenseCategories = [
    "Food",
    "Transportation",
    "School Supplies",
    "Bills",
    "Personal",
    "Entertainment",
    "Health",
    "Others"
  ];
  var expenseDropdown = document.getElementById('expenseDropdown');
  var expenseCategoryInput = document.getElementById('expenseCategory');
  var expenseDropdownList = document.getElementById('expenseDropdownList');
  if (expenseDropdown && expenseCategoryInput && expenseDropdownList) {
    expenseDropdownList.innerHTML = '';
    expenseCategories.forEach(function(cat) {
      var item = document.createElement('div');
      item.className = 'dropdown-item';
      item.textContent = cat;
      item.addEventListener('mousedown', function(e) {
        expenseCategoryInput.value = cat;
        expenseDropdownList.style.display = 'none';
      });
      expenseDropdownList.appendChild(item);
    });
    expenseCategoryInput.addEventListener('click', function(e) {
      if (expenseDropdownList.style.display === 'block') {
        expenseDropdownList.style.display = 'none';
      } else {
        expenseDropdownList.style.display = 'block';
      }
    });
    document.addEventListener('mousedown', function(e) {
      if (!expenseDropdown.contains(e.target)) {
        expenseDropdownList.style.display = 'none';
      }
    });
  }
});
// Expense category dropdown logic
const expenseCategories = [
  "Food",
  "Transportation",
  "School Supplies",
  "Bills",
  "Personal",
  "Entertainment",
  "Health",
  "Others"
];

const expenseDropdown = document.getElementById('expenseDropdown');
const expenseCategoryInput = document.getElementById('expenseCategory');
const expenseDropdownList = document.getElementById('expenseDropdownList');

if (expenseDropdown && expenseCategoryInput && expenseDropdownList) {
  // Populate dropdown
  expenseDropdownList.innerHTML = '';
  expenseCategories.forEach(cat => {
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    item.textContent = cat;
    item.addEventListener('mousedown', function(e) {
      expenseCategoryInput.value = cat;
      expenseDropdown.classList.remove('open');
    });
    expenseDropdownList.appendChild(item);
  });

  // Show/hide dropdown on input click
  expenseCategoryInput.addEventListener('click', function(e) {
    expenseDropdown.classList.toggle('open');
  });

  // Hide dropdown when clicking outside
  document.addEventListener('mousedown', function(e) {
    if (!expenseDropdown.contains(e.target)) {
      expenseDropdown.classList.remove('open');
    }
  });
}
const api = {
  register: '/api/register',
  login: '/api/login',
  transaction: '/api/transaction',
  transactions: '/api/transactions',
  balance: '/api/balance',
  summary: '/api/summary',
  deleteTransaction: '/api/transaction/delete'
};

function el(id) { return document.getElementById(id); }

function showMessage(target, text, isError=false) {
  target.textContent = text;
  target.className = isError ? 'message error' : 'message success';
  setTimeout(()=> { target.textContent = ''; target.className='message'; }, 4000);
}

async function post(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function get(url) {
  const res = await fetch(url);
  return res.json();
}

// UI elements
const loginPage = el('loginPage');
const appLayout = el('appLayout');
const mainApp = el('mainApp');
const loggedUserSpan = el('loggedUser');
const authMessage = el('authMessage');

// Load saved username
const savedUser = localStorage.getItem('set_username');
if (savedUser) {
  showMainFor(savedUser);
} else {
  // show login page
  if (loginPage) loginPage.classList.remove('hidden');
  if (appLayout) appLayout.classList.add('hidden');
}

el('btnRegister').addEventListener('click', async () => {
  // Registration submit handler (from register form)
  const firstName = el('regFirstName').value.trim();
  const lastName = el('regLastName').value.trim();
  const fullName = firstName + (lastName ? ' ' + lastName : '');
  const username = el('regUsername').value.trim();
  const password = el('regPassword').value;
  const confirmPassword = el('regConfirmPassword').value;
  if (!username || !password) return showMessage(authMessage, 'Username and password required', true);
  if (password !== confirmPassword) return showMessage(authMessage, 'Passwords do not match', true);
  try {
    const res = await post(api.register, { username, email: username, fullName, password });
    if (res.error) return showMessage(authMessage, res.error, true);
    localStorage.setItem('set_username', res.username);
    showMessage(authMessage, 'Registered and logged in');
    showMainFor(res.username);
  } catch (err) {
    showMessage(authMessage, 'Error registering', true);
    console.error(err);
  }
});

el('btnLogin').addEventListener('click', async () => {
  const username = el('username').value.trim() || el('regUsername') && el('regUsername').value.trim();
  const password = el('password') ? el('password').value : null;
  if (!username) return showMessage(authMessage, 'Username required', true);
  try {
    // Note: server currently checks only username existence; password is not verified in this simple implementation
    const res = await post(api.login, { username });
    if (res.error) return showMessage(authMessage, res.error, true);
    localStorage.setItem('set_username', res.username);
    showMessage(authMessage, 'Logged in');
    showMainFor(res.username);
  } catch (err) {
    showMessage(authMessage, 'Error logging in', true);
    console.error(err);
  }
});

// Allow Enter key on username/password to trigger login
['username', 'password'].forEach(id => {
  const input = el(id);
  if (!input) return;
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const btn = el('btnLogin');
      if (btn) btn.click();
    }
  });
});

// Show registration form
el('btnShowRegister').addEventListener('click', () => {
  const form = el('registerForm');
  const heading = document.querySelector('.login-card h2');
  const paragraph = document.querySelector('.login-card p');
  const emailLabel = el('loginEmailLabel');
  const passwordLabel = el('loginPasswordLabel');
  const usernameInput = el('username');
  const passwordInput = el('password');
  const authControls = document.querySelector('.auth-controls');
  const hr = document.querySelector('#registerForm hr');
  
  if (heading) heading.style.display = 'none';
  if (paragraph) paragraph.style.display = 'none';
  if (emailLabel) emailLabel.style.display = 'none';
  if (passwordLabel) passwordLabel.style.display = 'none';
  if (usernameInput) usernameInput.style.display = 'none';
  if (passwordInput) passwordInput.style.display = 'none';
  if (authControls) authControls.style.display = 'none';
  if (form) form.classList.remove('hidden');
  if (hr) hr.style.display = 'none';
});

el('btnCancelRegister').addEventListener('click', () => {
  const form = el('registerForm');
  const heading = document.querySelector('.login-card h2');
  const paragraph = document.querySelector('.login-card p');
  const emailLabel = el('loginEmailLabel');
  const passwordLabel = el('loginPasswordLabel');
  const usernameInput = el('username');
  const passwordInput = el('password');
  const authControls = document.querySelector('.auth-controls');
  const hr = document.querySelector('#registerForm hr');
  
  if (heading) heading.style.display = 'block';
  if (paragraph) paragraph.style.display = 'block';
  if (emailLabel) emailLabel.style.display = 'block';
  if (passwordLabel) passwordLabel.style.display = 'block';
  if (usernameInput) usernameInput.style.display = 'block';
  if (passwordInput) passwordInput.style.display = 'block';
  if (authControls) authControls.style.display = 'flex';
  if (form) form.classList.add('hidden');
  if (hr) hr.style.display = 'block';
});
 

// Password visibility toggles
el('toggleRegPassword').addEventListener('click', (e) => {
  e.preventDefault();
  const input = el('regPassword');
  const btn = el('toggleRegPassword');
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
  }
});

el('toggleRegConfirmPassword').addEventListener('click', (e) => {
  e.preventDefault();
  const input = el('regConfirmPassword');
  const btn = el('toggleRegConfirmPassword');
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
  }
});

el('btnLogout').addEventListener('click', () => {
  localStorage.removeItem('set_username');
  // hide app layout and show login
  if (appLayout) appLayout.classList.add('hidden');
  if (loginPage) loginPage.classList.remove('hidden');
  // reset inputs
  if (el('username')) el('username').value = '';
  if (el('email')) el('email').value = '';
  // clear password fields on logout
  if (el('password')) el('password').value = '';
  if (el('regPassword')) el('regPassword').value = '';
  if (el('regConfirmPassword')) el('regConfirmPassword').value = '';
});

function showMainFor(username) {
  // hide login page
  if (loginPage) loginPage.classList.add('hidden');
  // show app layout
  if (appLayout) appLayout.classList.remove('hidden');
  // update UI
  loggedUserSpan.textContent = username;
  // show logout button
  const logoutBtn = el('btnLogout');
  if (logoutBtn) logoutBtn.classList.remove('hidden');
}

// Add expense
el('btnAddExpense').addEventListener('click', async () => {
  const username = localStorage.getItem('set_username');
  const amount = parseFloat(el('expenseAmount').value);
  const category = el('expenseCategory').value.trim() || 'Other';
  const description = el('expenseDesc').value.trim();
  if (!username) return showMessage(authMessage, 'Please login', true);
  if (!amount || isNaN(amount)) return showMessage(authMessage, 'Valid amount required', true);
  const res = await post(api.transaction, { username, amount, category, type: 'expense', description });
  if (res.error) showMessage(authMessage, res.error, true); else showMessage(authMessage, 'Expense added');
});

// Add income
el('btnAddIncome').addEventListener('click', async () => {
  const username = localStorage.getItem('set_username');
  const amount = parseFloat(el('incomeAmount').value);
  const category = el('incomeCategory').value.trim() || 'Other';
  const description = el('incomeDesc').value.trim();
  if (!username) return showMessage(authMessage, 'Please login', true);
  if (!amount || isNaN(amount)) return showMessage(authMessage, 'Valid amount required', true);
  const res = await post(api.transaction, { username, amount, category, type: 'income', description });
  if (res.error) showMessage(authMessage, res.error, true); else showMessage(authMessage, 'Income added');
});

// View transactions
el('btnViewTx').addEventListener('click', async () => {
  const username = localStorage.getItem('set_username');
  if (!username) return showMessage(authMessage, 'Please login', true);
  const data = await get(api.transactions + '?username=' + encodeURIComponent(username));
  if (data.error) return showMessage(authMessage, data.error, true);
  renderTransactions(data);
});

// View balance
el('btnViewBalance').addEventListener('click', async () => {
  const username = localStorage.getItem('set_username');
  if (!username) return showMessage(authMessage, 'Please login', true);
  const data = await get(api.balance + '?username=' + encodeURIComponent(username));
  if (data.error) return showMessage(authMessage, data.error, true);
  renderBalance(data.balance);
});

// View summary
el('btnViewSummary').addEventListener('click', async () => {
  const username = localStorage.getItem('set_username');
  if (!username) return showMessage(authMessage, 'Please login', true);
  const data = await get(api.summary + '?username=' + encodeURIComponent(username));
  if (data.error) return showMessage(authMessage, data.error, true);
  renderSummary(data);
});

function renderTransactions(list) {
  const out = el('output');
  if (!list || list.length === 0) return out.innerHTML = '<p>No transactions found.</p>';
  let html = '<table class="tx"><tr><th>ID</th><th>Type</th><th>Category</th><th>Amount</th><th>Description</th><th>Date</th><th>Action</th></tr>';
  for (const t of list) {
    const sign = t.type === 'income' ? '+' : '-';
    html += `<tr><td>${t.transactionId}</td><td>${t.type}</td><td>${t.category}</td><td>${sign}₱${Number(t.amount).toFixed(2)}</td><td>${t.description || ''}</td><td>${t.transactionDate}</td><td><button class="btn-remove" onclick="removeTransaction(${t.transactionId})">Remove</button></td></tr>`;
  }
  html += '</table>';
  out.innerHTML = html;
}

async function removeTransaction(transactionId) {
  const username = localStorage.getItem('set_username');
  if (!username) return alert('Please login');
  console.log('Attempting to delete transaction:', transactionId);
  try {
    const res = await post(api.deleteTransaction, { transactionId, username });
    console.log('Delete response:', res);
    if (res.error) {
      alert(res.error);
    } else {
      alert('Transaction removed');
      el('btnViewTx').click();
    }
  } catch (err) {
    alert('Error removing transaction: ' + err.message);
    console.error(err);
  }
}

function renderBalance(balance) {
  const out = el('output');
  const html = `<h3>Balance: ₱${Number(balance).toFixed(2)}</h3>`;
  out.innerHTML = html;
}

function renderSummary(list) {
  const out = el('output');
  if (!list || list.length === 0) return out.innerHTML = '<p>No summary data.</p>';
  let html = '<table class="tx"><tr><th>Category</th><th>Type</th><th>Total</th></tr>';
  for (const s of list) {
    const sign = s.type === 'income' ? '+' : '-';
    html += `<tr><td>${s.category}</td><td>${s.type}</td><td>${sign}₱${Number(s.total).toFixed(2)}</td></tr>`;
  }
  html += '</table>';
  out.innerHTML = html;
}
