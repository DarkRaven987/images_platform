import { uploadFile } from 'react-s3';
window.Buffer = window.Buffer || require('buffer').Buffer;

const S3_BUCKET = process.env.REACT_APP_AWS_BUCKET;
const REGION = process.env.REACT_APP_AWS_REGION;
const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  dirName: 'images',
};

export const handleUploadToS3 = async (file) => {
  return uploadFile(file, config).catch((err) => console.error(err));
};
