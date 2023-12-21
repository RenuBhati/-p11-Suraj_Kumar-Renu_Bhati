
## Requirement
Create a Wealth Portfolio Web API Service with MySQL

## Architecture

![[Pasted image 20231221145407.png]]
## API Design
### Asset Management

1. **Get All Assets for a Specific User**
    
    - **Endpoint**: `/api/users/{userId}/assets`
    - **Method**: `GET`
    - **Description**: Retrieves all assets (Equity, Fixed Income, and Alternatives) for a specific user.
    - **Path Parameters**:
        - `userId` (required): The ID of the user whose assets are being requested.
    - **Response**: A list of assets associated with the user.
2. **Add New Asset for a Specific User**
    
    - **Endpoint**: `/api/users/{userId}/assets`
    - **Method**: `POST`
    - **Description**: Allows a user to add a new asset.
    - **Path Parameters**:
        - `userId` (required): The ID of the user.
    - **Body Parameters**:
        - Asset details (e.g., type, value, etc.).
    - **Response**: Confirmation of asset addition along with the details of the new asset.
3. **Update an Existing Asset for a Specific User**
    
    - **Endpoint**: `/api/users/{userId}/assets/{assetId}`
    - **Method**: `PUT`
    - **Description**: Updates an existing asset for a user.
    - **Path Parameters**:
        - `userId` (required): The ID of the user.
        - `assetId` (required): The ID of the asset to update.
    - **Body Parameters**:
        - Asset details to be updated.
    - **Response**: Confirmation of the update along with the updated asset details.
4. **Delete an Asset for a Specific User**
    
    - **Endpoint**: `/api/users/{userId}/assets/{assetId}`
    - **Method**: `DELETE`
    - **Description**: Deletes a specific asset for a user.
    - **Path Parameters**:
        - `userId` (required): The ID of the user.
        - `assetId` (required): The ID of the asset to delete.
    - **Response**: Confirmation of deletion.

### Income, Expenses, and Savings

**Get Income, Expenses, and Savings for the Current Financial Year**

- **Endpoint**: `/api/users/{userId}/financials/current-year`
- **Method**: `GET`
- **Description**: Retrieves the income, expenses, and savings data for a specific user for the current financial year.
- **Path Parameters**:
    - `userId` (required): The ID of the user whose financial data is being requested.
- **Query Parameters**:
    - `month` (optional): The specific month within the current financial year for which data is requested.
- **Response**: Financial data for the current year, including income, expenses, and savings, optionally filtered by month.

### Detailed Income and Expenses Breakdown:

**Get Detailed Breakdown of Income and Expenses**

- **Endpoint**: `/api/users/{userId}/financials/breakdown`
- **Method**: `GET`
- **Description**: Retrieves a detailed breakdown of income and expenses for a specific user.
- **Path Parameters**:
    - `userId` (required): The ID of the user whose detailed financial data is being requested.
- **Query Parameters**:
    - `year` (optional): The financial year for which the detailed breakdown is requested.
    - `month` (optional): The specific month within the financial year for which the detailed breakdown is requested.
- **Response**: A detailed breakdown of income and expenses for the specified time frame, optionally filtered by financial year or month.

## Database Design 
link https://dbdiagram.io/d/Wealth-Portfolio-Schema-65842f0689dea6279959ef01
![[Pasted image 20231221175407.png]]

### Create queries
```sql
-- create tables

CREATE TABLE users (
  userId SERIAL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255), -- Assuming hashed password
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assets (
  assetId SERIAL PRIMARY KEY,
  userId INT REFERENCES users(userId),
  assetType VARCHAR(255),
  assetValue DECIMAL(15, 2),
  assetName VARCHAR(255),
  purchaseDate DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE income (
  incomeId SERIAL PRIMARY KEY,
  userId INT REFERENCES users(userId),
  source VARCHAR(255),
  amount DECIMAL(15, 2),
  date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
  expenseId SERIAL PRIMARY KEY,
  userId INT REFERENCES users(userId),
  category VARCHAR(255),
  amount DECIMAL(15, 2),
  date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE savings (
  savingsId SERIAL PRIMARY KEY,
  userId INT REFERENCES users(userId),
  amount DECIMAL(15, 2),
  date DATE,
  description VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- inserting dummy data
INSERT INTO users (username, email, password) VALUES 
('user1', 'user1@example.com', 'hashedpassword1'),
('user2', 'user2@example.com', 'hashedpassword2'),
('user3', 'user3@example.com', 'hashedpassword3'),
('user4', 'user4@example.com', 'hashedpassword4'),
('user5', 'user5@example.com', 'hashedpassword5');

INSERT INTO assets (userId, assetType, assetValue, assetName, purchaseDate) VALUES 
(1, 'Equity', 10000.00, 'Equity Fund', '2020-01-10'),
(1, 'Fixed Income', 5000.00, 'Bond Fund', '2020-02-15'),
(2, 'Alternatives', 3000.00, 'Real Estate Fund', '2020-03-20'),
(2, 'Equity', 15000.00, 'Stock Fund', '2020-04-25'),
(3, 'Fixed Income', 20000.00, 'Corporate Bond', '2020-05-30');

INSERT INTO income (userId, source, amount, date) VALUES 
(1, 'Salary', 3000.00, '2020-01-01'),
(1, 'Investment', 200.00, '2020-02-01'),
(2, 'Salary', 3200.00, '2020-03-01'),
(3, 'Freelance', 1500.00, '2020-04-01'),
(4, 'Investment', 250.00, '2020-05-01');

INSERT INTO expenses (userId, category, amount, date) VALUES 
(1, 'Rent', 1000.00, '2020-01-05'),
(1, 'Groceries', 300.00, '2020-02-05'),
(2, 'Utilities', 200.00, '2020-03-05'),
(3, 'Transport', 150.00, '2020-04-05'),
(4, 'Entertainment', 400.00, '2020-05-05');

INSERT INTO savings (userId, amount, date, description) VALUES 
(1, 5000.00, '2020-01-15', 'Regular Savings'),
(2, 6000.00, '2020-02-15', 'Emergency Fund'),
(3, 3000.00, '2020-03-15', 'Travel Fund'),
(4, 2000.00, '2020-04-15', 'Gift Fund'),
(5, 1000.00, '2020-05-15', 'Misc Savings');

```
