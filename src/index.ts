import express from 'express';
import { connectDB } from './db-connection'; 
import userRoutes from './routes/user.routes';

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
