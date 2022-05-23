import { v4 as uuidv4 } from "uuid";
import { s3Config } from "../configs/s3-configs";

export const s3Upload = (file: any) => {
  const s3 = s3Config();

  const uploadParams: any = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuidv4()}.${file?.mimetype.split("/")[1]}`,
    Body: file?.buffer,
    ContentType: file?.mimetype,
  };

  return s3.upload(uploadParams).promise();
};

export const s3Delete = (filename: any) => {
  const s3 = s3Config();

  const deleteParams: any = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
  };

  return s3.deleteObject(deleteParams).promise();
};
