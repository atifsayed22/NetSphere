import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js';
import connectionRoutes from "./routes/connectionRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import cors from 'cors'



const app = express();


const port = 8080;

dotenv.config();
app.use(cors());
  
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.listen(port,()=>{
    console.log('server running......')

})

main().then(()=>{

    console.log('DB CONNECTED')
}

).catch((err)=>{
    console.log(err)
})
async function main() {
    await mongoose.connect(process.env.MONGO_DB_URL)

}


app.use('/api/auth',authRoutes)
app.use("/api/posts", postRoutes);
app.use('/api/user', userRoutes); 
app.use("/api/connections", connectionRoutes);
app.use("/api/comment", commentRoutes);
app.get('/', (req,res)=>{
    res.send('Home Route  !!!!')

})

