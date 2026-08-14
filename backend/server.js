import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
import transactionRoutes from './routes/transaction.routes.js';
import authRoutes from './routes/auth.routes.js';
dotenv.config();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth',authRoutes);
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