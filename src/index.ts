import express from 'express';
const app = express();
import dotenv from 'dotenv';
import authRoutes from './routes/authRoute';
import skillsRoutes from './routes/skillsRoute';
import questionRoutes from './routes/questionRoute';
import surveyRoute from './routes/surveyRoute';
import studentRoute from './routes/studentRoute';




dotenv.config();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/skill', skillsRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/survey', surveyRoute);
app.use('/api/student', studentRoute);






const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});