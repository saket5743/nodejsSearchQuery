import connectDB from './db/connect'
import Product from './module/product.module'

import jsonProducts from '../src/products'

const URL = "mongodb+srv://user:root1234@cluster0.oqq1mdt.mongodb.net/aasearchquery?retryWrites=true&w=majority&appName=Cluster0"

const starty = async () => {
  try {
    await connectDB(URL);
    console.log('Connected to Database');
    await Product.deleteMany();
    console.log('Deleted previous document');
    await Product.create(jsonProducts);
    console.log('Success!!');
  } catch (error) {
    console.log(error);
  }
}

export default starty;

