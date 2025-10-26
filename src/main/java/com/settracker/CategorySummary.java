package com.settracker;

/**
 * CategorySummary class to represent summary data for a category
 */
public class CategorySummary {
    private String category;
    private String type;
    private double total;

    public CategorySummary(String category, String type, double total) {
        this.category = category;
        this.type = type;
        this.total = total;
    }

    // Getters
    public String getCategory() {
        return category;
    }

    public String getType() {
        return type;
    }

    public double getTotal() {
        return total;
    }

    // Setters
    public void setCategory(String category) {
        this.category = category;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return "CategorySummary{" +
                "category='" + category + '\'' +
                ", type='" + type + '\'' +
                ", total=" + total +
                '}';
    }
}
