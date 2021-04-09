const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/' + file.fieldname);
    },
    filename: (req, file, cb) => {
        const name = file.fieldname + '-' + Date.now() + file.originalname;
        req.profilePics = name;
        cb(null, name);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        console.log(file.field)
        const types = /jpeg|jpg|png|gif/;
        const extName = types.test(path.extname(file.originalname).toLowerCase());
        const mimeType = types.test(file.mimetype);
        if(extName && mimeType){
            cb(null, true);

        } else {
            // cb(new Error('Only supprted jpeg,jpg,png,gif'))
            cb(true)
        }
    }
})

module.exports = upload;