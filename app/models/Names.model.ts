import mongoose from 'mongoose'

const namesSchema =new mongoose.Schema({
  name: String
})

export const Names = mongoose.model('names', namesSchema)