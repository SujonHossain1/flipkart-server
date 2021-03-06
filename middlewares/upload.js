const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName =
            file.originalname
                .replace(fileExt, '')
                .toLowerCase()
                .split(' ')
                .join('-') +
            '-' +
            Date.now();

        cb(null, fileName + fileExt);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const imageTypes = /jpeg|jpg|png|gif|svg/;
        const extName = imageTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        const mimeType = imageTypes.test(file.mimetype);

        if (file.fieldname === 'categoryImage') {
            if (extName && mimeType) {
                cb(null, true);
            } else {
                cb(new Error('Allow png, jpg and jpeg'));
            }
        }

        if (file.fieldname === 'image') {
            if (
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg'
            ) {
                cb(null, true);
            } else {
                cb(new Error('Allow png, jpg and jpeg'));
            }
        }
        if (file.fieldname === 'images') {
            if (
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg'
            ) {
                cb(null, true);
            } else {
                cb(new Error('Allow png, jpg and jpeg'));
            }
        }
    },
});

module.exports = upload;
