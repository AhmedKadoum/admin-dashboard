# Mock Backend API

## Overview
This is a simple Express-based backend that serves a list of products from a mock database JSON file. It includes pagination and sorting features.

## Features
- Fetch all products
- Sorting options: `price_asc`, `price_desc`, `name_asc`, `name_desc`
- Pagination support

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd mock-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Project
- Start the server:
  ```sh
  npm start
  ```
- Start in development mode (with live reload):
  ```sh
  npm run dev
  ```

## API Endpoints
### Get Products
#### Request:
```http
GET /products?page=1&limit=5&sort=name_asc
```

#### Query Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | int | (Optional) Page number, default is `1` |
| `limit` | int | (Optional) Number of products per page, default is `10` |
| `sort` | string | (Optional) Sorting method (`price_asc`, `price_desc`, `name_asc`, `name_desc`) |

#### Response:
```json
{
  "data": [...],
  "status": 200,
  "message": "Products fetched successfully",
  "pagination": {
    "total": 50,
    "currentPage": 1,
    "totalPages": 10
  }
}
```

## Environment Variables
Create a `.env` file and configure:
```
PORT=3000
```

## Dependencies
- Express
- Dotenv
- Nodemon (dev dependency)

## License
This project is licensed under the ISC License.

