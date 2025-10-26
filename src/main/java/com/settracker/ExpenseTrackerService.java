package com.settracker;

import java.sql.SQLException;
import java.util.List;

/**
 * Service class to handle business logic for the expense tracker
 */
public class ExpenseTrackerService {
    private Database database;
    private User currentUser;

    public ExpenseTrackerService() {
        this.database = new Database();
    }

    /**
     * Register a new user
     */
    public boolean registerUser(String username, String email) {
        try {
            database.createUser(username, email);
            currentUser = database.getUser(username);
            System.out.println("User registered successfully!");
            return true;
        } catch (SQLException e) {
            System.err.println("Error registering user: " + e.getMessage());
            return false;
        }
    }

    /**
     * Login a user
     */
    public boolean loginUser(String username) {
        try {
            currentUser = database.getUser(username);
            if (currentUser != null) {
                System.out.println("Welcome back, " + username + "!");
                return true;
            } else {
                System.out.println("User not found. Please register first.");
                return false;
            }
        } catch (SQLException e) {
            System.err.println("Error logging in: " + e.getMessage());
            return false;
        }
    }

    /**
     * Add an expense
     */
    public boolean addExpense(double amount, String category, String description) {
        if (currentUser == null) {
            System.out.println("Please login first.");
            return false;
        }

        try {
            database.addTransaction(currentUser.getUserId(), amount, category, "expense", description);
            System.out.println("Expense added successfully!");
            return true;
        } catch (SQLException e) {
            System.err.println("Error adding expense: " + e.getMessage());
            return false;
        }
    }

    /**
     * Add income
     */
    public boolean addIncome(double amount, String category, String description) {
        if (currentUser == null) {
            System.out.println("Please login first.");
            return false;
        }

        try {
            database.addTransaction(currentUser.getUserId(), amount, category, "income", description);
            System.out.println("Income added successfully!");
            return true;
        } catch (SQLException e) {
            System.err.println("Error adding income: " + e.getMessage());
            return false;
        }
    }

    /**
     * Get all transactions
     */
    public List<Transaction> getAllTransactions() {
        if (currentUser == null) {
            System.out.println("Please login first.");
            return null;
        }

        try {
            return database.getAllTransactions(currentUser.getUserId());
        } catch (SQLException e) {
            System.err.println("Error retrieving transactions: " + e.getMessage());
            return null;
        }
    }

    /**
     * Get current balance
     */
    public double getCurrentBalance() {
        if (currentUser == null) {
            System.out.println("Please login first.");
            return 0.0;
        }

        try {
            return database.calculateBalance(currentUser.getUserId());
        } catch (SQLException e) {
            System.err.println("Error calculating balance: " + e.getMessage());
            return 0.0;
        }
    }

    /**
     * Get expense summary
     */
    public List<CategorySummary> getExpenseSummary() {
        if (currentUser == null) {
            System.out.println("Please login first.");
            return null;
        }

        try {
            return database.getExpenseSummary(currentUser.getUserId());
        } catch (SQLException e) {
            System.err.println("Error retrieving summary: " + e.getMessage());
            return null;
        }
    }

    /**
     * Get current user
     */
    public User getCurrentUser() {
        return currentUser;
    }

    /**
     * Close the database connection
     */
    public void close() {
        database.close();
    }
}
