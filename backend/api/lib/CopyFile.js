import fs from 'fs'

// Function to copy file
const copyFile = (source, destination, encoding='utf8') => {

    try {
        //Check if the source file exists
        if (fs.existsSync(source)) {
            try {
                // Check if the destination file exists
                if (fs.existsSync(destination)) {
                    // If destination file exists, remove it
                    fs.unlinkSync(destination);
                }
            
                // Read the file from the source path
                const fileContent = fs.readFileSync(source);

                // Write the file to the destination path
                fs.writeFileSync(destination, fileContent);

                console.log("File copied successfully.");
            } catch (error) {
                console.error("Error copying file:", error);
            }
        } else {
            console.error('Source file does not exist.');
        }
    } catch (err) {
        console.error('Error occurred while copying file:', err);
    }
}

// Export the copyFile function
export default copyFile;
