const multer  = require('multer');
let uploadSingle = (name, folderDesk, maxSizeMB) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload\\' + folderDesk + '\\')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload = multer({ 
    storage: storage,
    limits: {
    fileSize: maxSizeMB*1024*1024
    },
    // fileFilter: function (req, file, cb) {
    //   console.log(file.mimetype);
    //   const fileTypes = /jpeg|jpg|png|gif|pptx|presentation/;
    //   const mimetype = fileTypes.test(file.mimetype);
    //   if (!mimetype) {
    //     cb(null, false);
    //     cb(new Error('Không hợp lệ'));
    //   }
    //   else cb(null, true);
      
    // }
  }).single(name);
  return upload;
}

let uploadArray = (name, folderDesk, maxSizeMB) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path_base + '\\upload\\' + folderDesk + '\\')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload = multer({ 
    storage: storage,
    limits: {
    fileSize: maxSizeMB*1024*1024
    },
    fileFilter: function (req, file, cb) {
      console.log(file.mimetype);
      const fileTypes = /jpeg|jpg|png|gif|pptx|presentation/;
      const mimetype = fileTypes.test(file.mimetype);
      if (!mimetype) {
        cb(null, false);
        cb(new Error('Không hợp lệ'));
      }
      else cb(null, true);
      
    }
  }).array(name);
  return upload;
}

module.exports = {
    uploadSingle: uploadSingle,
    uploadArray: uploadArray
}
