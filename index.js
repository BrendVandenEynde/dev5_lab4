const express = require('express');
const app = express();
const port = 3000;

//require the routes
const messagesRoutes = require('./routes/api/v1/messages');

//json body parser
app.use(express.json());
app.use("/api/v1/messages", messagesRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});