# 📊 Tax Optimization Calculator (MERN Stack)

A **Tax Optimization Calculator** built using the **MERN Stack** that helps businesses minimize total payroll tax by optimally distributing salaries among employees using a progressive tax system.

---

## 🚀 Project Overview

This application calculates the most tax-efficient salary distribution across multiple employees.
It provides **individual tax breakdowns**, **total tax savings**, and stores calculation history for future reference.

---

## 🏗️ Architecture

The project follows a clean **MVC architecture** with clear separation of concerns.

```
Frontend (React.js) → Backend API (Express.js) → Database (MongoDB)
```

---

## 🔄 Application Flow

1. **User Input (Frontend)**

   * User enters:

     * Number of employees
     * Total payroll amount
   * Input is validated in the React Calculator component.

2. **API Request**

   * Frontend sends a POST request to:

     ```
     /api/calculate
     ```

3. **Backend Processing**

   * Request is handled by the controller.
   * Input validation is performed.
   * Tax optimization logic is applied.
   * Result is saved to MongoDB.

4. **Tax Optimization Logic**

   * Uses a **progressive tax slab system**.
   * Salaries are equally distributed to minimize total tax.
   * Calculates:

     * Individual tax
     * Take-home salary
     * Slab-wise tax breakdown

5. **Response & Display**

   * Backend returns optimized results.
   * Frontend displays:

     * Total tax
     * Average tax rate
     * Employee-wise salary and tax details

6. **History Tracking**

   * Last 10 calculations are stored and retrieved using:

     ```
     /api/history
     ```

---

## 🧮 Tax Slabs Used

| Income Range           | Tax Rate             |
| ---------------------- | -------------------- |
| ₹0 – ₹2,50,000         | 0%                   |
| ₹2,50,001 – ₹5,00,000  | 10%                  |
| ₹5,00,001 – ₹10,00,000 | 20%                  |
| Above ₹10,00,000       | 25%                  |
| Surcharge              | +5% if tax > ₹50,000 |

---

## 🔌 API Endpoints

| Method | Endpoint         | Description                          |
| ------ | ---------------- | ------------------------------------ |
| POST   | `/api/calculate` | Calculate optimized tax distribution |
| GET    | `/api/history`   | Fetch last 10 calculations           |
| GET    | `/api/health`    | API health check                     |

---

## 💡 Key Features

* Progressive tax calculation
* Tax-optimized salary distribution
* Employee-wise tax breakdown
* Calculation history storage
* Responsive and modern UI
* Robust input validation and error handling

---

## 🛠️ Technology Stack

| Layer    | Technology             |
| -------- | ---------------------- |
| Frontend | React.js, CSS3         |
| Backend  | Node.js, Express.js    |
| Database | MongoDB, Mongoose      |
| API      | REST API               |
| Tools    | Nodemon, React Scripts |

---

