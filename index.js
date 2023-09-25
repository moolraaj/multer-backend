const express=require('express')
const app=express()
require('./database')
const imageModel=require('./imageModel')
const multer=require('multer')
const path=require('path')
const cors=require('cors')
app.use(express.json())

app.use('/profile',express.static('uploads'))
app.use(cors())

const upload=multer({
    
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'./uploads')
        },
        filename:function(req,file,cb){
            cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
    })
}).single('profile')




app.post('/upload', upload, async (req, resp) => {
    try {
        // Assuming you have fields for 'name' and 'email' in your form
        const data = new imageModel({
            name: req.body.name,
            email: req.body.email,
            imageName: req.file.originalname,
            image: {
                data: req.file.buffer, // Assuming you're using multer with storage in memory
                contentType: req.file.mimetype,
            },
            imageUrl: `http://localhost:4500/profile/${req.file.filename}`,
        });

        const savedData = await data.save();
        resp.status(201).json(savedData);
        console.log(savedData);
    } catch (error) {
        resp.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/upload',async(req,resp)=>{
    let data=await imageModel.find()
   resp.send(data)
    console.log(data)
})



app.listen(4500,()=>{
    console.log('app is working on 4500')
})
