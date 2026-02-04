import { v2 as cloudinary } from 'cloudinary';
import pkg from 'multer-storage-cloudinary';
const  CloudinaryStorage  = pkg;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'netsphere_profile_banner',
    allowedFormats: ['jpg', 'jpeg', 'png'], // camelCase is required
  },
});

export { cloudinary, storage };
