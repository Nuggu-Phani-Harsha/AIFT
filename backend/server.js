const express = require("express");
const mongoose = require("mongoose");
const app = express();
import transactionRoutes from './routes/transaction.routes.js';

app.use('/api/transactions', transactionRoutes);
app.listen(3001,() => {
    console.log("Node server started");
});

 mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(' MongoDB connection error:', error);
    process.exit(1);
  });