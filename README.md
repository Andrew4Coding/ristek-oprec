![logo](https://github.com/Andrew4Coding/ristek-oprec/assets/66892355/344ba1ea-ef2a-4acc-a2f9-09a6ca84cdb9)
# 💵 Maniy Financial Management Website 💵
Made for RISTEK FASILKOM UI Website Development SIG Open Recruitment

## Table of contents
1. [About Maniy](#about)
2. [Installation](#installation)
3. [Features](#features-and-usages)
4. [Tech Stack Used](#tech-stacks-used)

## About
A simple financial management website designed just for your Maniy, where you can Create, Read, Edit, and Delete transactions. You can also see your balance and your categories analytics.

## Tech Stacks Used
1. ### Next JS
   Used for main development framework and API endpoints.

2. ### Prisma ORM
   Used to access the main database to store user data.

3. ### Tailwind CSS
   Used for styling and animating.

4. ### Supabase (PosgreSQL)
   Used to deploy the main database.

5. ### JSON Web Token (JWT)
   Used for the authentication process and to secure the API endpoints.

6. ### BcryptJS
   Used to encrypt user passwords.

7. ### react-date-picker
   Used to create the date picker when the user tries to create and edit transactions

8. ### react-spring
   Used to implement count-up animation

## Installation
1. Clone this repository using `git clone https://github.com/Andrew4Coding/ristek-oprec.git`
2. Inside that root directory, use the command `npm install` or `yarn install`. Install necessary [libraries](#tech-stacks-used)
3. Run command:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
5. Enjoy 🍴

## Features and Usages
### Authentication
1. When the website opens for the first time, it will be directed to the `/authentication` route.
2. If you already have an account before, sign in with that account, and then click `Continue`
3. But, if you never had an account before, click `Do not have an account? Sign up now.` text.
4. Signup by entering your **Name**, **Email (Must be a valid @gmail.com)**, and **Password**. After that, click `Create`
5. This will direct you to the main dashboard page.

### Main Dashboard
This page is divided into 4 sections, **Navbar, Transactions Dashboard, Expense Information, Income Information, and Analytics**
1. **Navbar**
   This section shows the information of user `Name` and `Email`. It also contains a `Sign Out` button, if the user wants to sign out from their account.
2. **Transactions Board**
   - **`See Transaction`**
   - **`Search Transactions`** by searching the transaction name.
   - **`Filter Transactions`** by clicking one of the filter types.
   - **`Create Transactions`** by clicking the `+` button
   - **`Delete Transactions`** by clicking the wanted transaction, and then clicking delete.
   - **`Edit Transactions`** by clicking the wanted transaction, and then clicking edit.
3. **Expense Information**
   This section shows the total of your expenses for all the time.
4. **Income Information**
   This section shows the total of your income for all the time.
5. **Analytics**
   This section shows the analytics of your balance. For instance, it shows you about what transaction category takes the most expense or income.
