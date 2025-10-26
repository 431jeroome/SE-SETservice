package com.settracker;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Database class to handle all database operations for the Student Expense Tracker
 */
public class Database {
    private static final String DB_URL = "jdbc:sqlite:expense_tracker.db";
    private Connection connection;

    /**
     * Constructor - initializes the database connection
     */
    public Database() {
        initializeDatabase();
    }

    /**
     * Initialize the database and create tables if they don't exist
     */
    private void initializeDatabase() {
        try {
            connection = DriverManager.getConnection(DB_URL);
            createTables();
            System.out.println("Database initialized successfully.");
        } catch (SQLException e) {
            System.err.println("Error initializing database: " + e.getMessage());
        }
    }

    /**
     * Create necessary tables for the application
     */
    private void createTables() throws SQLException {
        // Create users table
        String createUsersTable = """
            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """;

        // Create transactions table
        String createTransactionsTable = """
            CREATE TABLE IF NOT EXISTS transactions (
                transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                amount REAL NOT NULL,
                category TEXT NOT NULL,
                type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
                description TEXT,
                transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            )
        """;

        Statement stmt = connection.createStatement();
        stmt.execute(createUsersTable);
        stmt.execute(createTransactionsTable);
        stmt.close();
    }

    /**
     * Create a new user
     */
    public int createUser(String username, String email) throws SQLException {
        String sql = "INSERT INTO users (username, email) VALUES (?, ?)";
        try (PreparedStatement pstmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            pstmt.setString(1, username);
            pstmt.setString(2, email);
            pstmt.executeUpdate();

            ResultSet rs = pstmt.getGeneratedKeys();
            if (rs.next()) {
                return rs.getInt(1);
            }
        }
        return -1;
    }

    /**
     * Get user by username
     */
    public User getUser(String username) throws SQLException {
        String sql = "SELECT * FROM users WHERE username = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, username);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                return new User(rs.getInt("user_id"), rs.getString("username"), 
                               rs.getString("email"), rs.getTimestamp("created_at"));
            }
        }
        return null;
    }

    /**
     * Add a transaction (income or expense)
     */
    public void addTransaction(int userId, double amount, String category, String type, String description) 
            throws SQLException {
        String sql = "INSERT INTO transactions (user_id, amount, category, type, description) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, userId);
            pstmt.setDouble(2, amount);
            pstmt.setString(3, category);
            pstmt.setString(4, type);
            pstmt.setString(5, description);
            pstmt.executeUpdate();
        }
    }

    /**
     * Get all transactions for a user
     */
    public List<Transaction> getAllTransactions(int userId) throws SQLException {
        List<Transaction> transactions = new ArrayList<>();
        String sql = "SELECT * FROM transactions WHERE user_id = ? ORDER BY transaction_date DESC";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, userId);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                transactions.add(new Transaction(
                    rs.getInt("transaction_id"),
                    rs.getInt("user_id"),
                    rs.getDouble("amount"),
                    rs.getString("category"),
                    rs.getString("type"),
                    rs.getString("description"),
                    rs.getTimestamp("transaction_date")
                ));
            }
        }
        return transactions;
    }

    /**
     * Get transactions by category
     */
    public List<Transaction> getTransactionsByCategory(int userId, String category) throws SQLException {
        List<Transaction> transactions = new ArrayList<>();
        String sql = "SELECT * FROM transactions WHERE user_id = ? AND category = ? ORDER BY transaction_date DESC";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, userId);
            pstmt.setString(2, category);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                transactions.add(new Transaction(
                    rs.getInt("transaction_id"),
                    rs.getInt("user_id"),
                    rs.getDouble("amount"),
                    rs.getString("category"),
                    rs.getString("type"),
                    rs.getString("description"),
                    rs.getTimestamp("transaction_date")
                ));
            }
        }
        return transactions;
    }

    /**
     * Calculate total balance for a user
     */
    public double calculateBalance(int userId) throws SQLException {
        String sql = """
            SELECT 
                COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0) as balance
            FROM transactions
            WHERE user_id = ?
        """;
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, userId);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                return rs.getDouble("balance");
            }
        }
        return 0.0;
    }

    /**
     * Get expense summary by category
     */
    public List<CategorySummary> getExpenseSummary(int userId) throws SQLException {
        List<CategorySummary> summary = new ArrayList<>();
        String sql = """
            SELECT category, type, SUM(amount) as total
            FROM transactions
            WHERE user_id = ?
            GROUP BY category, type
            ORDER BY total DESC
        """;
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, userId);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                summary.add(new CategorySummary(
                    rs.getString("category"),
                    rs.getString("type"),
                    rs.getDouble("total")
                ));
            }
        }
        return summary;
    }

    /**
     * Close the database connection
     */
    public void close() {
        try {
            if (connection != null) {
                connection.close();
            }
        } catch (SQLException e) {
            System.err.println("Error closing database: " + e.getMessage());
        }
    }
}
