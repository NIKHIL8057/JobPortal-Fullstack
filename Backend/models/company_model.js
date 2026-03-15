import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    
   name: {
    type: String,
    unique:true,
    require:true,
   },
   description: {
    type: String,
  },
  website: {
     type:String,
  },
  location: {
    type:String,
  },
  logo: {
    type:String, // url to company logo
  },
  userId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
},{timestamps: true})

export const Company = mongoose.model('Company',companySchema)