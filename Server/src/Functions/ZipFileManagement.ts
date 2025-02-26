import AdmZip from "adm-zip";
import { Document, Packer, Paragraph, TextRun } from "docx";
import path from "path";

/**
 * Manages the creation of a zip file by adding a security code document to it.
 *
 * @async
 * @function zipFileManagement
 * @param {any} zipFile - The zip file object containing the path and metadata.
 * @returns {Promise<{ path: string, mimetype: string, originalname: string }>} - A promise that resolves with the file data containing the path, mimetype, and original name of the zip file.
 * 
 * @throws {Error} If an error occurs during the zip file creation process.
 *
 * @example
 * // Example usage:
 * zipFileManagement(zipFile)
 *   .then(data => console.log('Zip file data:', data))
 *   .catch(err => console.error('Error managing zip file:', err));
 */
const zipFileManagement = async (zipFile: any) => {
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

    const data = {
        path: zipFile?.path,
        mimetype: zipFile.mimetype,
        originalname: fileName,
    }

    return data
}

export default zipFileManagement