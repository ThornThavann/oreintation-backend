import express from 'express';
const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use('/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
