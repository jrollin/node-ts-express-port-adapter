import * as path from 'path';
import multer from 'multer';

export const MEDIA_TARGET = path.join(path.dirname(__dirname), 'medias');
export const UPLOAD_TARGET = path.join(path.dirname(__dirname), 'tmp');
// image only
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }
  else {
    cb(new Error('Image uploaded is not of type jpg/jpeg   or png'), false);
  }
};
export const upload = multer({ dest: `${UPLOAD_TARGET}/`, fileFilter });
