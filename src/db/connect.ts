import mongoose from "mongoose"

// const URL = "mongodb+srv://user:root1234@cluster0.oqq1mdt.mongodb.net/aasearchquery?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = (url: string) => {
  return mongoose.connect(url)
}

export default connectDB;