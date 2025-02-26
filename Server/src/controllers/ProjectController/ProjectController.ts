import { Response } from "express";
import uploadProjectMulter from "../../utils/MulterConfig/ProjectMulterConfig";
import AdmZip from "adm-zip";
import path from 'path';
import { uploadFile } from "../../utils/s3";
import { Project } from "../../models/Project";
import { Document, Packer, Paragraph, TextRun } from "docx";

const uploadProject = async (req: any, res: Response) => {
    try {
        uploadProjectMulter.fields([{ name: "zipfile", maxCount: 1 }, { name: "video", maxCount: 1 }, { name: "document", maxCount: 1 }])(req, res, async (err: any) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }
            const {title, description, techUsed, category, price, userId} = req.body;
            let zipUrl: string;
            let videoUrl: string | undefined = undefined;
            let documentUrl: string | undefined = undefined;            
            const zipFile = req.files?.zipfile ? req.files.zipfile[0] : null;
            const videoFile = req.files?.video ? req.files.video[0] : null;
            const documentFile = req.files?.document ? req.files.document[0] : null;

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
                const uploadedVideoFile = await uploadFile(videoFile, `Videos/${userId}`);
                videoUrl = uploadedVideoFile;
            }
            if(documentFile){
                const uploadedDocumentFile = await uploadFile(documentFile, `Documents/${userId}`);
                documentUrl = uploadedDocumentFile;
            }
            } else {
                return res.status(400).json({ message: "No project file provided" });
            }

            if(zipUrl){
                const tech = typeof techUsed === "string" ? JSON.parse(techUsed) : techUsed
                const project = await Project.create({
                    title,
                    description,
                    techUsed: tech,
                    category,
                    price,
                    userId,
                    file: zipUrl,
                    document: documentUrl,
                    demoVideo: videoUrl,
                    approvalStatus: "pending",
                    isFeatured: false
                })

                if(project){
                    res.status(200).json({message: "Project Created Successfully", data: project})
                }
            }
            });
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default { uploadProject };