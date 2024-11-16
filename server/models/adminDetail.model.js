import mongoose, { Types } from "mongoose";


const adminDetailsSchema = new mongoose.Schema({
    adminLogo:{
        type:String,
        default:null
    }
})

export default mongoose.model('AdminDetails',adminDetailsSchema)