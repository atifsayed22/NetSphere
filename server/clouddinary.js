// clouddinary.js (ESM version)
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'netsphere_profile_banner',
    allowed_formats: ["png", "jpeg", "jpg"], // ✅ fixed key name
  },
});

export { cloudinary, storage };
