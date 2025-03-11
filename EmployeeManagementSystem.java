import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Employee {
    private int id;
    private String name;
    private double salary;

    public Employee(int id, String name, double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public void displayDetails() {
        System.out.println("Employee ID: " + id);
        System.out.println("Name: " + name);
        System.out.println("Salary: $" + String.format("%.2f", salary));
        System.out.println("-----------------------------");
    }
}

public class EmployeeManagementSystem {
    
    public static List<Employee> getDefaultEmployees() {
        List<Employee> defaultList = new ArrayList<>();
        defaultList.add(new Employee(101, "Debidutta Panigrahi", 65000.00));
        defaultList.add(new Employee(102, "Robin Panda", 72000.50));
        defaultList.add(new Employee(103, "Ranjit Dash", 58750.75));
        defaultList.add(new Employee(104, "Sara Khana", 81200.25));
        return defaultList;
    }

    public static void displayEmployeeStats(List<Employee> employeeList) {
        System.out.println("\nEmployee Details:");
        System.out.println("------------------");
        for (Employee emp : employeeList) {
            emp.displayDetails();
        }

        double totalSalary = 0;
        for (Employee emp : employeeList) {
            totalSalary += emp.getSalary();
        }
        double averageSalary = totalSalary / employeeList.size();

        System.out.println("Summary:");
        System.out.println("------------------");
        System.out.println("Total number of employees: " + employeeList.size());
        System.out.println("Average salary: $" + String.format("%.2f", averageSalary));
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Employee> employeeList = new ArrayList<>();

        System.out.println("Employee Management System");
        System.out.println("===========================");
        System.out.println("1. Enter employee data manually");
        System.out.println("2. Use default test case data");
        System.out.print("Enter your choice (1 or 2): ");
        
        int choice = scanner.nextInt();
        scanner.nextLine();

        if (choice == 1) {
            System.out.print("Enter number of employees: ");
            int numEmployees = scanner.nextInt();
            scanner.nextLine();

            for (int i = 0; i < numEmployees; i++) {
                System.out.println("\nEnter details for Employee #" + (i + 1));
                System.out.print("ID: ");
                int id = scanner.nextInt();
                scanner.nextLine();
                
                System.out.print("Name: ");
                String name = scanner.nextLine();
                
                System.out.print("Salary: ");
                double salary = scanner.nextDouble();
                
                employeeList.add(new Employee(id, name, salary));
            }
        } else if (choice == 2) {
            employeeList = getDefaultEmployees();
        } else {
            System.out.println("Invalid choice! Using default data.");
            employeeList = getDefaultEmployees();
        }

        displayEmployeeStats(employeeList);
        scanner.close();
    }
}