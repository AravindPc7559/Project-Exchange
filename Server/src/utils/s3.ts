import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { config } from '../config/config';
import * as fs from 'fs';

if (!config.awsAccessKeyId || !config.awsSecretAccessKey || !config.awsRegion) {
    throw new Error('AWS credentials are required');
}

export const s3Client = new S3Client({
    region: config.awsRegion,
    credentials: {
        accessKeyId: config.awsAccessKeyId,
        secretAccessKey: config.awsSecretAccessKey
    }
});

interface UploadedFile {
    path: string;
    mimetype: string;
    originalname: string;
}

export const uploadFile = async (file: UploadedFile, folderName: string): Promise<string> => {
    const fileStream = fs.createReadStream(file.path);
    const fileName = `${folderName}/${Date.now()}-${file.originalname}`;

    const uploadParams = {
        Bucket: config.awsBucketName,
        Key: fileName,
        Body: fileStream,
        ContentType: file.mimetype,
    };

    try {
        await s3Client.send(new PutObjectCommand(uploadParams));
        fs.unlink(file.path, (err) => {
            if (err) {
                console.error('Error deleting temporary file:', err);
            }
        });

        fs.unlink(file.path, (err) => {
            if (err) {
                console.error("Error deleting temporary file:", err);
            } else {
                console.log("Temporary file deleted:", file.path);
            }
        });

        return `https://${config.awsBucketName}.s3.${config.awsRegion}.amazonaws.com/${fileName}`;
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw new Error('Failed to upload file');
    }
}


export const deleteFile = async (url: string) => {
    try {
        const urlObj = new URL(url);
        const bucketName = urlObj.hostname.split('.')[0];
        const objectKey = urlObj.pathname.substring(1);

        const params = { Bucket: bucketName, Key: objectKey }

        await s3Client.send(new DeleteObjectCommand(params))
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}