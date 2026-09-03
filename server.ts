import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './app/config/db/mongoose.conection';
import leadRoutes from './app/route';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(leadRoutes);

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  try {
    await connectToDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
}

bootstrap();