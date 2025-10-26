# Installation Guide - Student Expense Tracker

## Quick Start Guide

### Prerequisites
Before running the application, ensure you have the following installed:
- Java 11 or higher
- Maven 3.6 or higher

### Step 1: Install Maven (if not already installed)

#### Windows:
1. Download Maven from: https://maven.apache.org/download.cgi
2. Extract to a folder (e.g., `C:\Program Files\Apache\maven`)
3. Add Maven to PATH:
   - Right-click "This PC" → Properties → Advanced System Settings
   - Click "Environment Variables"
   - Under "System Variables", find "Path" and click "Edit"
   - Add: `C:\Program Files\Apache\maven\bin`
4. Verify installation:
   ```cmd
   mvn --version
   ```

#### macOS:
```bash
brew install maven
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install maven
```

### Step 2: Build the Project

Open a terminal/command prompt in the `SE-SETservice` directory and run:

```bash
mvn clean compile
```

This will download all dependencies and compile the project.

### Step 3: Run the Application

#### Option 1: Using Maven Exec Plugin
```bash
mvn exec:java -Dexec.mainClass="com.settracker.Main"
```

#### Option 2: Build and Run JAR
```bash
# Build the JAR file
mvn clean package

# Run the JAR
java -jar target/student-expense-tracker-1.0-SNAPSHOT.jar
```

### Step 4: Using the Application

1. **Register**: Create a new account with username and email
2. **Login**: Use your username to login
3. **Add Income/Expenses**: Track your financial transactions
4. **View Reports**: Check your balance and expense summaries

## Troubleshooting

### Issue: "mvn: command not found"
**Solution**: Maven is not installed or not in your PATH. Follow Step 1 above.

### Issue: "java: command not found"
**Solution**: Java is not installed or not in your PATH.
- Download from: https://www.oracle.com/java/technologies/downloads/
- Follow installation instructions
- Add Java to PATH environment variable

### Issue: Database errors
**Solution**: The SQLite database will be created automatically. Make sure you have write permissions in the project directory.

### Issue: Dependencies not downloading
**Solution**: Check your internet connection and Maven repository access:
```bash
mvn dependency:resolve
```

## Project Structure
```
SE-SETservice/
├── src/
│   └── main/
│       └── java/
│           └── com/
│               └── settracker/
│                   ├── Main.java
│                   ├── Database.java
│                   ├── ExpenseTrackerService.java
│                   ├── User.java
│                   ├── Transaction.java
│                   └── CategorySummary.java
├── pom.xml
├── README.md
└── INSTALLATION.md
```

## Need Help?
If you encounter any issues, please check:
1. Java version: `java -version` (should be 11 or higher)
2. Maven version: `mvn --version` (should be 3.6 or higher)
3. Project structure matches the above
4. All files are present in the correct directories
