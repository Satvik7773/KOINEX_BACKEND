# KOINEX_BACKEND
This project provides a background job that fetches the latest cryptocurrency data for Bitcoin, Matic, and Ethereum from the CoinGecko API, stores the data in a MongoDB database, and provides APIs to retrieve that data and calculate price deviation.

### **Features**
- **Background Job**: Fetches the current price, market cap, and 24-hour change for Bitcoin, Matic, and Ethereum every 2 hours.
- **/stats API**: Fetches the latest data for a specified cryptocurrency.
- **/deviation API**: Calculates the standard deviation of the last 100 price records for a specified cryptocurrency.

---

## **Setup and Running the Project**

### **Prerequisites**
- Node.js (version >= 12.x)
- MongoDB (locally or using a MongoDB cloud service like MongoDB Atlas)
- A CoinGecko API key (if required)

### **Step 1: Clone the repository**
```bash
git clone https://github.com/yourusername/KOINEX_BACKEND.git
cd KOINEX_BACKEND
```

### **Step 2: Install Dependencies**
Install the required dependencies using `npm`:
```bash
npm install
```

### **Step 3: Set up environment variables**
Create a `.env` file in the root directory of the project with the following variables:

```bash
MONGO_URI=mongodb://localhost:27017/crypto-db
CRYPTO_API=https://api.coingecko.com/api/v3/simple/price
CRYPTO_IDS=bitcoin,ethereum,matic-network
CRYPTO_VS_CURRENCY=usd
API_KEY=your_api_key_here
CRON_SCHEDULE="0 */2 * * *"  # Every 2 hours
```

- **MONGO_URI**: Your MongoDB connection string.
- **CRYPTO_API**: The CoinGecko API endpoint to fetch cryptocurrency data.
- **CRYPTO_IDS**: The CoinGecko IDs for the cryptocurrencies you want to track (Bitcoin, Ethereum, Matic).
- **CRYPTO_VS_CURRENCY**: The currency in which the prices are fetched (e.g., `usd`).
- **API_KEY**: Your CoinGecko API key (if required).
- **CRON_SCHEDULE**: The cron schedule string to define how often the background job runs (e.g., every 2 hours).

### **Step 4: Run the Project**
Start the server using:

```bash
npm start
```

This will start the Express server on port 3000.

### **Step 5: Accessing the APIs**

1. **/stats API**  
   Fetch the latest data for a specified cryptocurrency (e.g., Bitcoin):
   ```bash
   GET http://localhost:3000/api/stats?coin=bitcoin
   ```
   **Sample Response**:
   ```json
   {
     "price": 40000,
     "marketCap": 800000000,
     "24hChange": 3.4
   }
   ```

2. **/deviation API**  
   Calculate the standard deviation of the price for the last 100 records of a specified cryptocurrency (e.g., Bitcoin):
   ```bash
   GET http://localhost:3000/deviation?coin=bitcoin
   ```
   **Sample Response**:
   ```json
   {
     "deviation": 4082.48
   }
   ```

---

## **Background Job**

The background job fetches cryptocurrency data every 2 hours and stores it in the database. It runs automatically after the application starts. You can customize the fetch frequency by adjusting the **CRON_SCHEDULE** in the `.env` file.

### **Cron Schedule Format**:
- `"0 */2 * * *"` - Runs every 2 hours.
- Refer to [cron expression documentation](https://crontab.guru/) for custom schedules.

---

## **Technologies Used**
- **Node.js**: For server-side JavaScript.
- **Express**: To handle API requests.
- **Mongoose**: For MongoDB interaction.
- **Cron**: For scheduling background jobs.
- **CoinGecko API**: To fetch cryptocurrency data.

---
