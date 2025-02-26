import { Request, Response } from "express";
import uploadProjectMulter from "../../utils/MulterConfig/ProjectMulterConfig";
import AdmZip from "adm-zip";
const { Document, Packer, Paragraph, TextRun } = require("docx");
import path from 'path';
import fs from 'fs';
import { uploadFile } from "../../utils/s3";

const uploadProject = async (req: any, res: Response) => {
    try {
        uploadProjectMulter.fields([{ name: "zipfile", maxCount: 1 }, { name: "video", maxCount: 1 }])(req, res, async (err: any) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }
            const {userId} = req.body;
            let zipUrl: string
            let videoUrl: string
            const zipFile = req.files?.zipfile ? req.files.zipfile[0] : null;
            const videoFile = req.files?.video ? req.files.video[0] : null;

            if(zipFile){
                const documentName = `License_Code`;
                const randomNumber = Math.floor(100000 + Math.random() * 900000);
                const doc = new Document({
                    sections: [
                        {
                            properties: {},
                            children: [
                                new Paragraph({
                                    children: [new TextRun(`Security Code: ${randomNumber}`)],
                                }),
                            ],
                        },
                    ],
                });

            const buffer = await Packer.toBuffer(doc);
            const zip = new AdmZip(zipFile?.path);
            zip.addFile(documentName, buffer);
            zip.writeZip(zipFile?.path);
            const fileName = path.basename(zipFile?.path);

            const s3Data = {
                path: zipFile?.path,
                mimetype: zipFile.mimetype,
                originalname: fileName,
            }

            const uploadedZipFile = await uploadFile(s3Data, `Projects/${userId}`);
            zipUrl = uploadedZipFile;
            if(videoFile){
                const uploadedVideoFile = await uploadFile(videoFile, `Video/${userId}`);
                console.log("uploadedVideoFile", uploadedVideoFile)
                videoUrl = uploadedVideoFile;
            }
            } else {
                return res.status(400).json({ message: "No project file provided" });
            }
        
        
            res.json({ message: "Files uploaded successfully" });
        });
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default { uploadProject }