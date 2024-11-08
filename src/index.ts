import express from 'express';
import { connectDB } from './db-connection'; 
import userRoutes from './routes/user.routes';
import bookRoutes from './routes/book.routes';
import { authenticateToken } from './middleware/auth';

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', userRoutes);
app.use("/book", authenticateToken, bookRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
