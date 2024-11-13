import mongoose from 'mongoose'

interface IUser {
  name: string,
  price: number,
  featured: boolean,
  rating: number,
  company: string
}

const productSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'product name must be provided'],
  },
  price: {
    type: Number,
    required: [true, 'product price must be provided']
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 4.5
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: `VALUE is not supported`
    }
  }
})

const Product = mongoose.model('Products', productSchema);

export default Product;