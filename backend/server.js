const express = require("express");
const app = express();

app.use('/api/transactions', transactionRoutes);
app.listen(3001,() => {
    console.log("Node server started");
});