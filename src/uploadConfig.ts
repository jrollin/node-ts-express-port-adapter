import multer from 'multer';

export const configUpload = (uploadTarget: string) => {
  // image only
  const fileFilter = (req: any, file: any, cb: any) => {
    if (
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Image uploaded is not of type jpg/jpeg   or png'), false);
    }
  };
  return multer({ dest: uploadTarget, fileFilter });
};
