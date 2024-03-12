// Requires / Consts
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const multer = require('multer')
const cors = require('cors')
const path = require('path')

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

// Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.post('/upload-image', upload.single('image'), (req, res) => {
    res.send('Uploaded')
})

app.get('/get-image/:image', async (req, res) => {
    try {
        const file = req.params.image
        const path_file = await './public/uploads/'+file

        return res.status(200).sendFile(path.resolve(path_file))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Starting app
app.listen(PORT, () => console.log(`App running on ${PORT}`))
