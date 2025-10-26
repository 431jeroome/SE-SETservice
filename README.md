# Student Expense Tracker (SETservice)

## Overview
Student Expense Tracker is a simple and easy-to-use app designed to help students manage their daily expenses. It allows users to record income and spending, categorize expenses (like food, transport, or study materials), and view summaries or charts to track where their money goes. The goal is to help students stay organized, save money, and build better financial habits.

## Features
- **User Registration & Login**: Create an account and manage your expenses
- **Add Income**: Track your income from various sources (salary, allowance, gifts, etc.)
- **Add Expenses**: Record expenses across different categories (food, transport, study materials, entertainment, etc.)
- **View Transactions**: See all your income and expenses in one place
- **Balance Tracking**: Monitor your current balance in real-time
- **Expense Summary**: View categorized summaries of your spending

## Technologies Used
- Java 11
- Maven (Build tool)
- SQLite (Database)
- JDBC (Database connectivity)

## Prerequisites
- Java 11 or higher
- Maven 3.6 or higher

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd SE-SETservice
```

### 2. Build the project
```bash
mvn clean install
```

### 3. Run the application
```bash
mvn exec:java -Dexec.mainClass="com.settracker.Main"
```

Or you can run the JAR file:
```bash
java -jar target/student-expense-tracker-1.0-SNAPSHOT.jar
```

## How to Use

### 1. Register/Login
- When you first run the application, you'll need to register with a username and email
- After registration, you can login with your username

### 2. Add Transactions
- **Add Income**: Record any money you receive (e.g., salary, allowance)
- **Add Expense**: Record your spending (e.g., food, transport)

### 3. View Information
- **View All Transactions**: See your complete transaction history
- **View Balance**: Check your current balance (income - expenses)
- **View Expense Summary**: See your spending categorized by type

### 4. Logout/Exit
- Use "Logout" to switch users
- Use "Exit" to close the application

## Database
The application uses SQLite database (`expense_tracker.db`) which is automatically created when you first run the application. The database contains:
- **users** table: Stores user information
- **transactions** table: Stores all income and expense records

## Project Structure
```
SE-SETservice/
├── src/
│   └── main/
│       └── java/
│           └── com/
│               └── settracker/
│                   ├── Main.java                    # Main application entry point
│                   ├── Database.java                # Database operations
│                   ├── ExpenseTrackerService.java   # Business logic layer
│                   ├── User.java                    # User model
│                   ├── Transaction.java             # Transaction model
│                   └── CategorySummary.java         # Summary model
├── pom.xml                                          # Maven configuration
└── README.md                                        # This file
```

## Team Members & Contributions
- **Nathalie Peter** - Class Diagram, Use Case setup
- **Jerome Sabanal** - Database implementation

## License
This project is part of a Software Engineering course assignment.

## Run & JDK (added)

Note: This repository was tested with Java 21 (Temurin/OpenJDK). The code compiles and runs on Java 21 and the project includes a local SQLite JDBC driver under `libs/` to allow running without a build tool.

Quick steps to run locally (no Maven required):

1. Ensure Java 21 is installed and available in your PATH. On Windows you can install Temurin 21 and set JAVA_HOME:

	 - I installed Temurin 21 and set the user environment variable:

		 JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.8.9-hotspot

		 The above was added to your user environment via `setx` so new terminals (and VS Code after restart) will pick it up.

2. Compile the sources (from repository root):

```powershell
javac -d out --release 21 src\main\java\com\settracker\*.java
```

3. Run the application (the project includes the sqlite JDBC jar under `libs/`):

```powershell
java -cp "out;libs\sqlite-jdbc-<version>.jar" com.settracker.Main
```

Replace `<version>` with the actual filename in `libs/` (for example `sqlite-jdbc-3.50.3.0.jar`).

VS Code convenience
- A `.vscode/launch.json` and `.vscode/tasks.json` were added to this repository. After restarting VS Code (so it picks up the persisted `JAVA_HOME`), you can:
	- Run the task `run: SETservice` (Task runner) — this compiles and runs in the integrated terminal.
	- Use the Run and Debug side bar and select `Run SETservice Main` to launch the app with the correct classpath.

Recommendations
- For long-term development, consider adding a `pom.xml` or `build.gradle` so dependencies (like the sqlite JDBC driver) are managed automatically and builds are reproducible.
