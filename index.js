const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
