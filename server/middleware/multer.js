import multer from "multer";
import path from "path";

// npm i multer 설치하기

// image storage config
const storage = multer.diskStorage({
  destination: (req, file, done) => {
    console.log("xx");
    done(null, "public/images");
  },
  filename: function (req, file, done) {
    const ext = path.extname(file.originalname); // 확장자 추가
    const fileName = path.basename(file.originalname, ext) + ext;
    console.log("xxxx");
    done(null, fileName);
    // done(null, file.fieldname + '-' + Date.now());
  },
});

// create multer instance
const uploadImage = multer({ storage: storage });

export default uploadImage;
