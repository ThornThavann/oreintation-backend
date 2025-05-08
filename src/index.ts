import express from 'express';
const app = express();
import dotenv from 'dotenv';
import authRoutes from './routes/authRoute';
import skillsRoutes from './routes/skillsRoute';
import surveyRoute from './routes/surveyRoute';



dotenv.config();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/skill', skillsRoutes);
app.use('/api/survey', surveyRoute);




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});