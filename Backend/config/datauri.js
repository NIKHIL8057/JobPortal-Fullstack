import DataURIParser from 'datauri/parser.js';
import path from 'path';


const dataUri = (file) => {
    const parser = new DataURIParser();
    if (!file) return null;  // common check to ensure file exists before processing
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

export default dataUri;