import { Response } from "express";
import uploadProjectMulter from "../../utils/MulterConfig/ProjectMulterConfig";
import { uploadFile, deleteFile } from "../../utils/s3";
import { Project } from "../../models/Project";
import zipFileManagement from "../../Functions/zipFileManagement";
import { IProject } from "../../types/modelTypes";

/**
 * Uploads a project along with its associated files (zip, video, document).
 *
 * @async
 * @function uploadProject
 * @param {Request} req - The request object containing project details and files.
 * @param {Response} res - The response object used to send back the desired HTTP response.
 * @returns {Promise<void>} - A promise that resolves when the project is created or rejects with an error.
 * 
 * @throws {Error} If an internal server error occurs during the file upload process.
 * @throws {Error} If no project file is provided in the request.
 *
 * @example
 * // Example usage:
 * uploadProject(req, res)
 *   .then(() => console.log('Project uploaded successfully'))
 *   .catch(err => console.error('Error uploading project:', err));
 */
const uploadProject = async (req: any, res: Response) => {
    try {
        uploadProjectMulter.fields([
            { name: "zipfile", maxCount: 1 },
            { name: "video", maxCount: 1 },
            { name: "document", maxCount: 1 }
        ])(req, res, async (err: any) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }

            const { title, description, techUsed, category, price, userId } = req.body;

            let zipUrl: string;
            let videoUrl: string | undefined = undefined;
            let documentUrl: string | undefined = undefined;
            const zipFile = req.files?.zipfile ? req.files.zipfile[0] : null;
            const videoFile = req.files?.video ? req.files.video[0] : null;
            const documentFile = req.files?.document ? req.files.document[0] : null;

            if (zipFile) {
                const s3Data = await zipFileManagement(zipFile)

                const uploadedZipFile = await uploadFile(s3Data, `Projects/${userId}`);
                zipUrl = uploadedZipFile;

                if (videoFile) {
                    const uploadedVideoFile = await uploadFile(videoFile, `Videos/${userId}`);
                    videoUrl = uploadedVideoFile;
                }

                if (documentFile) {
                    const uploadedDocumentFile = await uploadFile(documentFile, `Documents/${userId}`);
                    documentUrl = uploadedDocumentFile;
                }
            } else {
                return res.status(400).json({ message: "No project file provided" });
            }

            if (zipUrl) {
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

                if (project) {
                    res.status(200).json({ message: "Project Created Successfully", data: project })
                }
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateProject = (req: any, res: Response) => {
    try {
        uploadProjectMulter.fields([
            { name: "zipfile", maxCount: 1 },
            { name: "video", maxCount: 1 },
            { name: "document", maxCount: 1 }
        ])(req, res, async (err: any) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }

            const { projectId } = req.params;
            const { title, description, techUsed, category, price, userId } = req.body;

            if(!projectId){
               return res.status(400).json({ message: 'Invalid request params' });
            }

            let zipUrl: string | undefined = undefined;
            let videoUrl: string | undefined = undefined;
            let documentUrl: string | undefined = undefined;

            const zipFile = req.files?.zipfile ? req.files.zipfile[0] : null;
            const videoFile = req.files?.video ? req.files.video[0] : null;
            const documentFile = req.files?.document ? req.files.document[0] : null;

            const currentData: IProject | null = await Project.findOne({ _id: projectId })

            if (zipFile) {
                if (currentData?.file) {
                    await deleteFile(currentData?.file)
                }
                const s3Data = await zipFileManagement(zipFile)

                const uploadedZipFile = await uploadFile(s3Data, `Projects/${userId}`);
                zipUrl = uploadedZipFile;
            }

            if (videoFile) {
                const uploadedVideoFile = await uploadFile(videoFile, `Videos/${userId}`);
                videoUrl = uploadedVideoFile;
            }

            if (documentFile) {
                const uploadedDocumentFile = await uploadFile(documentFile, `Documents/${userId}`);
                documentUrl = uploadedDocumentFile;
            }

            const tech = typeof techUsed === "string" ? JSON.parse(techUsed) : techUsed
            const project = await Project.findByIdAndUpdate({_id: projectId}, {
                $set: {
                    title,
                    description,
                    techUsed: tech,
                    category,
                    price,
                    userId,
                    file: zipUrl,
                    demoVideo: videoUrl,
                    document: documentUrl
                }
            })

            if(project){
                res.status(200).json({ message: 'Project updated successfully' });
            } else{
                res.status(404).json({ message: 'Project not found' });
            }

        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default { uploadProject, updateProject };