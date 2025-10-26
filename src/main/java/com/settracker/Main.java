package com.settracker;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Scanner;

/**
 * Main class for the Student Expense Tracker application
 */
public class Main {
    private static ExpenseTrackerService service;
    private static Scanner scanner;
    private static DecimalFormat df = new DecimalFormat("#.##");

    public static void main(String[] args) {
        System.out.println("========================================");
        System.out.println("  Student Expense Tracker (SETservice)");
        System.out.println("========================================\n");

        service = new ExpenseTrackerService();
        scanner = new Scanner(System.in);

        boolean running = true;

        while (running) {
            if (service.getCurrentUser() == null) {
                running = showLoginMenu();
            } else {
                running = showMainMenu();
            }
        }

        service.close();
        System.out.println("\nThank you for using Student Expense Tracker!");
    }

    /**
     * Display login/register menu
     */
    private static boolean showLoginMenu() {
        System.out.println("\n--- Welcome ---");
        System.out.println("1. Register");
        System.out.println("2. Login");
        System.out.println("3. Exit");
        System.out.print("Choose an option: ");

        int choice = Integer.parseInt(scanner.nextLine());

        switch (choice) {
            case 1:
                register();
                break;
            case 2:
                login();
                break;
            case 3:
                return false;
            default:
                System.out.println("Invalid option.");
        }
        return true;
    }

    /**
     * Display main menu
     */
    private static boolean showMainMenu() {
        System.out.println("\n--- Main Menu ---");
        System.out.println("1. Add Expense");
        System.out.println("2. Add Income");
        System.out.println("3. View All Transactions");
        System.out.println("4. View Balance");
        System.out.println("5. View Expense Summary");
        System.out.println("6. Logout");
        System.out.println("7. Exit");
        System.out.print("Choose an option: ");

        int choice = Integer.parseInt(scanner.nextLine());

        switch (choice) {
            case 1:
                addExpense();
                break;
            case 2:
                addIncome();
                break;
            case 3:
                viewAllTransactions();
                break;
            case 4:
                viewBalance();
                break;
            case 5:
                viewExpenseSummary();
                break;
            case 6:
                service = new ExpenseTrackerService();
                System.out.println("Logged out successfully!");
                break;
            case 7:
                return false;
            default:
                System.out.println("Invalid option.");
        }
        return true;
    }

    /**
     * Register a new user
     */
    private static void register() {
        System.out.print("Enter username: ");
        String username = scanner.nextLine();
        System.out.print("Enter email: ");
        String email = scanner.nextLine();
        
        service.registerUser(username, email);
    }

    /**
     * Login a user
     */
    private static void login() {
        System.out.print("Enter username: ");
        String username = scanner.nextLine();
        
        service.loginUser(username);
    }

    /**
     * Add an expense
     */
    private static void addExpense() {
        System.out.print("Enter amount: ");
        double amount = Double.parseDouble(scanner.nextLine());
        System.out.print("Enter category (Food, Transport, Study Materials, Entertainment, Other): ");
        String category = scanner.nextLine();
        System.out.print("Enter description: ");
        String description = scanner.nextLine();
        
        service.addExpense(amount, category, description);
    }

    /**
     * Add income
     */
    private static void addIncome() {
        System.out.print("Enter amount: ");
        double amount = Double.parseDouble(scanner.nextLine());
        System.out.print("Enter category (Salary, Allowance, Gift, Other): ");
        String category = scanner.nextLine();
        System.out.print("Enter description: ");
        String description = scanner.nextLine();
        
        service.addIncome(amount, category, description);
    }

    /**
     * View all transactions
     */
    private static void viewAllTransactions() {
        List<Transaction> transactions = service.getAllTransactions();
        
        if (transactions == null || transactions.isEmpty()) {
            System.out.println("\nNo transactions found.");
            return;
        }

        System.out.println("\n--- All Transactions ---");
        System.out.println(String.format("%-5s %-15s %-15s %-10s %-20s %-20s", 
            "ID", "Type", "Category", "Amount", "Description", "Date"));
        System.out.println("-".repeat(90));
        
        for (Transaction t : transactions) {
            String type = t.getType().equals("income") ? "Income" : "Expense";
            String amountDisplay = t.getType().equals("income") ? 
                "+$" + df.format(t.getAmount()) : "-$" + df.format(t.getAmount());
            
            System.out.println(String.format("%-5s %-15s %-15s %-10s %-20s %-20s",
                t.getTransactionId(),
                type,
                t.getCategory(),
                amountDisplay,
                t.getDescription() != null ? t.getDescription() : "N/A",
                t.getTransactionDate().toString()));
        }
    }

    /**
     * View current balance
     */
    private static void viewBalance() {
        double balance = service.getCurrentBalance();
        System.out.println("\n--- Current Balance ---");
        
        if (balance >= 0) {
            System.out.println("Balance: $" + df.format(balance) + " (Positive)");
        } else {
            System.out.println("Balance: -$" + df.format(Math.abs(balance)) + " (Negative)");
        }
    }

    /**
     * View expense summary
     */
    private static void viewExpenseSummary() {
        List<CategorySummary> summary = service.getExpenseSummary();
        
        if (summary == null || summary.isEmpty()) {
            System.out.println("\nNo transaction data available for summary.");
            return;
        }

        System.out.println("\n--- Expense Summary by Category ---");
        System.out.println(String.format("%-15s %-15s %-15s", "Category", "Type", "Total"));
        System.out.println("-".repeat(45));
        
        for (CategorySummary s : summary) {
            String typeDisplay = s.getType().equals("income") ? "Income" : "Expense";
            String sign = s.getType().equals("income") ? "+$" : "-$";
            
            System.out.println(String.format("%-15s %-15s %-15s",
                s.getCategory(),
                typeDisplay,
                sign + df.format(s.getTotal())));
        }
    }
}
