
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth_routes.js';
import { verifyToken } from './middlewares/auth_middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);


app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route.', user: req.user });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
