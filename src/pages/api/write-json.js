import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const newData = req.body;

    // Validate incoming data
    if (!newData || typeof newData !== 'object') {
      return res.status(400).json({ message: 'Invalid data' });
    }

    // Define the file path
    const filePath = path.join(process.cwd(), 'public', 'data.json');

    try {
      // Read the existing file
      let fileData = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        if (fileContent) {
          fileData = JSON.parse(fileContent);
        }
      }

      // Append the new object to the array
      fileData.push(newData);

      // Write the updated array back to the file
      fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');

      return res.status(200).json({ message: 'Data appended successfully', data: newData });
    } catch (error) {
      console.error('Error writing file:', error);
      return res.status(500).json({ message: 'Failed to write file' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
