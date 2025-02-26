import AdmZip from "adm-zip";
import { Document, Packer, Paragraph, TextRun } from "docx";
import path from "path";
import * as mammoth from "mammoth";

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

    const zip = new AdmZip(zipFile?.path);
    const existingEntry = zip.getEntry(documentName);

    if (existingEntry) {
        const docBuffer = zip.readFile(existingEntry);
        if (docBuffer) {
            const result = await mammoth.extractRawText({ buffer: docBuffer });
            const textContent = result.value.trim(); 

            const match = textContent.match(/Security Code: (\d+)/);
            const securityCode = match ? match[1] : "Not found";

            return {
                code: securityCode
            }
        }
    }

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
    zip.addFile(documentName, buffer);
    zip.writeZip(zipFile?.path);
    const fileName = path.basename(zipFile?.path);

    const data = {
        path: zipFile?.path,
        mimetype: zipFile.mimetype,
        originalname: fileName,
        securityCode: randomNumber
    }

    return data
}

export default zipFileManagement