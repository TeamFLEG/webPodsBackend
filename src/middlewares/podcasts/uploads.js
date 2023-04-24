const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

// Check file type
function checkFileType(file, cb) {
    // Allowed extenstions are only audio and video
    const filetypes = /mp3|mp4|wav|avi|mov|mpeg|mpg|flv|wmv|mkv|webm|ogg|ogv|3gp|3g2/;
    // Check extenstion
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb('Error: Only audio and video files are allowed!');
    }
}

// Function that handles the upload
function uploadFile(req, res, next) {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        else {
            if (req.file == undefined) {
                res.status(400).json({ message: 'Error: No file selected!' });
            }
            else {
                res.status(200).json({
                    message: 'File uploaded successfully!',
                    filename: req.file.filename
                });
            }
        }
    });
}

module.exports = {
    upload,
    uploadFile
};