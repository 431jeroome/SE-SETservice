# User Guide - Student Expense Tracker

## Welcome to Student Expense Tracker!

This guide will help you get started with tracking your expenses and managing your budget as a student.

## Getting Started

### First Run
When you first start the application, you'll see:
```
========================================
  Student Expense Tracker (SETservice)
========================================

--- Welcome ---
1. Register
2. Login
3. Exit
```

### Step 1: Register Your Account
1. Select option `1` to Register
2. Enter a unique username
3. Enter your email address
4. You'll be automatically logged in after registration

### Step 2: Start Tracking
Once logged in, you'll see the Main Menu:
```
--- Main Menu ---
1. Add Expense
2. Add Income
3. View All Transactions
4. View Balance
5. View Expense Summary
6. Logout
7. Exit
```

## Features Explained

### 1. Add Expense
Track your spending:
- **Amount**: Enter the amount you spent (e.g., 25.50)
- **Category**: Choose from:
  - Food
  - Transport
  - Study Materials
  - Entertainment
  - Other
- **Description**: Add a brief note (e.g., "Lunch at cafeteria")

**Example:**
```
Enter amount: 15.50
Enter category: Food
Enter description: Pizza lunch
```

### 2. Add Income
Record money you receive:
- **Amount**: Enter the amount received (e.g., 500.00)
- **Category**: Choose from:
  - Salary
  - Allowance
  - Gift
  - Other
- **Description**: Add a brief note (e.g., "Monthly allowance")

**Example:**
```
Enter amount: 500.00
Enter category: Allowance
Enter description: October monthly allowance
```

### 3. View All Transactions
See your complete financial history:
- Lists all income and expenses
- Shows date, category, and description
- Displays amounts with appropriate signs (+ for income, - for expenses)

### 4. View Balance
Check your current financial status:
- Shows total income minus total expenses
- Positive balance means you have savings
- Negative balance means you've spent more than earned

### 5. View Expense Summary
Get insights into your spending:
- Shows total spending by category
- Helps identify where most money is spent
- Useful for budget planning

### 6. Logout
Switch to a different user account (useful if multiple people share the system)

### 7. Exit
Close the application

## Best Practices

### Daily Tracking
- Add expenses as soon as you make them
- Be consistent with categories
- Add clear descriptions for future reference

### Regular Review
- Check your balance weekly
- Review expense summaries monthly
- Identify patterns in spending

### Budget Management
- Set income and expense targets
- Compare actual spending against budgets
- Adjust habits based on summary reports

## Common Categories Explained

### Income Categories
- **Salary**: Money from part-time or full-time work
- **Allowance**: Money from parents or guardians
- **Gift**: Unexpected money received
- **Other**: Any other income source

### Expense Categories
- **Food**: Meals, snacks, groceries
- **Transport**: Bus fare, gas, rideshare
- **Study Materials**: Books, supplies, software
- **Entertainment**: Movies, games, activities
- **Other**: Any other expenses

## Tips for Students

1. **Record Immediately**: Don't wait to record transactions; do it right away
2. **Be Detailed**: Clear descriptions help you remember what you spent money on
3. **Regular Checks**: Review your balance at least weekly
4. **Learn Patterns**: Use expense summaries to understand spending habits
5. **Budget Wisely**: Use your tracking data to create realistic budgets

## Example Usage Session

```
Welcome to Student Expense Tracker!
--- Welcome ---
1. Register
2. Login
3. Exit
Choose an option: 1

Enter username: john_doe
Enter email: john@example.com
User registered successfully!

--- Main Menu ---
... (menu options)

Choose an option: 2
Enter amount: 500.00
Enter category: Allowance
Enter description: October monthly allowance
Income added successfully!

Choose an option: 1
Enter amount: 25.50
Enter category: Food
Enter description: Lunch
Expense added successfully!

Choose an option: 4
--- Current Balance ---
Balance: $474.50 (Positive)
```

## Need Help?

- Check the README.md for technical information
- Review INSTALLATION.md for setup issues
- Make sure all fields are filled correctly when adding transactions
- Ensure you're logged in before accessing features

## Privacy & Security

- Your data is stored locally in an SQLite database
- No data is transmitted over the internet
- Keep your database file safe and backed up
- The database file is named `expense_tracker.db`

Enjoy managing your finances with Student Expense Tracker!
