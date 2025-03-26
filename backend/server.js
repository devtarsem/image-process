const app = require('./app')
const fs = require('fs')
const path = require('path');



app.listen(9000, (req, res)=>{
    console.log('connected')
})

app.post('/api/v1/image', (req, res)=>{
    const {image} = req.body;
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
    const filePath = path.join(__dirname, "uploads", `image_${Date.now()}.png`);
    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error("Error saving image:", err);
            return res.status(500).json({ error: "Error saving image" });
        }
        res.json({ message: "Image saved successfully", path: filePath });
    });
})