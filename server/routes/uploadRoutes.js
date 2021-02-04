import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

//config
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/');
	},
	filename(req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
	}
});

function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png/;
	// true or false
	// const extname = filetypes.test(path.extname(file.orignialname).toLowerCase());
	// const mimetype = filetypes.test(file.mimetype);
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb('Images only!');
	}
}

const upload = multer({
	storage,
	fileFilter: function(req, file, cb) {
		checkFileType(file, cb);
	}
});

router.post('/', upload.single('image'), (req, res) => {
	res.send(`/${req.file.path}`);
});

export default router;
