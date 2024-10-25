# Admin Platform - OpportuNIEty

## Overview

**OpportuNIEty** is a decentralized career development platform that enables placement coordinators to manage company recruitment opportunities. Utilizing blockchain technology, the platform provides secure data storage, Ethereum wallet connectivity, and user verification, streamlining the placement process for both students and coordinators.

## Features

- **Wallet Connection**: Securely connect via MetaMask for access.
- **Coordinator Registration**: Register by providing branch, graduation year, and unique student number (USN).
- **Coordinator Approval**: Admins can approve coordinators to grant access.
- **Dashboard**: Streamlined dashboard for posting and updating company opportunities.
- **Decentralized Storage**: Blockchain and IPFS used for secure, immutable data storage.

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Blockchain**: Ethereum, MetaMask, IPFS
- **Environment Variables**: `VITE_ADMIN_WALLET_ADDRESS` for admin wallet restriction

## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/admin-platform.git
   cd admin-platform
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following:

   ```env
   VITE_ADMIN_WALLET_ADDRESS=your_admin_wallet_address
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Run production build**

   ```bash
   npm start
   ```

7. **Access the application**

   Open your browser and navigate to `http://localhost:3000`

   ## Contribution

   This project is developed and maintained by:

   - **Abhinav**
   - **Abhinaya Vamsi**
   - **Akhil**
   - **Girish**

   We welcome contributions from the community. If you have any suggestions or improvements, feel free to create a pull request or open an issue.
