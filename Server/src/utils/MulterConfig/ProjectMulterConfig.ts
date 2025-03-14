import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, 'uploads/');
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = [
    'application/zip',
    'video/mp4',
    'video/mkv',
    'video/avi',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ];
    
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only ZIP and video files are allowed!'), false);
  }
};

const uploadProjectMulter = multer({ storage, fileFilter });

export default uploadProjectMulter