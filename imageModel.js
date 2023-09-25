const mongoose=require('mongoose')
const imageSchema=new mongoose.Schema({
    name:String,
    email:String,
    imageName: String,
    image: {
      data: Buffer,
      contentType: String,
    },
    imageUrl: String,
    
})
const imageModel=mongoose.model('images',imageSchema)
module.exports=imageModel