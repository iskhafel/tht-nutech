# Nutech Test

This project is a frontend application developed as part of a technical test for Nutech. It is designed as a basic wallet management system called **SIMS PPOB**. The app allows users to top up their balance, make transactions, view transaction history, and edit account details.

## Features

1. **Authentication**

   - Login and Logout functionality.
   - Token-based authentication stored in localStorage.

2. **Dashboard**

   - Displays user details and current wallet balance.
   - Balance visibility toggle (show/hide balance).
   - Navigation menu for easy access to other features.

3. **Top-Up**

   - Allows users to top up their wallet balance.
   - Predefined amounts for quick top-up.
   - Real-time balance updates upon successful top-up.

4. **Transaction**

   - Users can select a service and make payments.
   - Balance is updated based on the transaction amount.

5. **Transaction History**

   - Displays a list of all user transactions.
   - Pagination support with a "Show More" button.

6. **Account Management**
   - View account details like email, first name, and last name.
   - Edit account information (first name, last name).
   - Logout functionality.

## API Endpoints

- **Authentication**

  - `POST /login` - User login.
  - `GET /profile` - Get user profile details.
  - `PUT /profile/update` - Update user profile information.

- **Balance**

  - `GET /balance` - Get current wallet balance.
  - `POST /topup` - Top up wallet balance.

- **Transactions**

  - `POST /transaction` - Create a new transaction.
  - `GET /transaction/history` - Fetch transaction history.

- **Services**
  - `GET /services` - Fetch available services for transactions.

## Technologies Used

- **Frontend**
  - React.js
  - React Router for routing.
  - Axios for API calls.
  - Tailwind CSS for styling.
  - React Icons for UI icons.
  - Redux Toolkit
