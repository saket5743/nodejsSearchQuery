import connectDB from './db/connect';
require('express-async-errors');
import express, { Request, Response } from 'express'
const app = express();
const CONNECT_URL = 'mongodb+srv://user:root1234@cluster0.oqq1mdt.mongodb.net/aasearchquery?retryWrites=true&w=majority&appName=Cluster0';
import starty from './populate'

import notFoundMiddleware from './middleware/notfound.middleware';

import productRouter from './router/product.router'

// middleware
app.use(express.json())

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productRouter);

app.use(notFoundMiddleware);

const starts = async () => {
  try {
    await connectDB(CONNECT_URL)
    console.log("DB Connected")
    await starty()
    app.listen(3000, () => {
      console.log('Server is listening at port 3000...')
    })
  } catch (error) {
    console.log(error)
  }
}

starts();