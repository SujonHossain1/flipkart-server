const fs = require('fs');

exports.removeFile = (file) => {
    console.log(file);
    if (fs.existsSync(`${__dirname}/../uploads/${file}`)) {
        fs.unlink(`${__dirname}/../uploads/${file}`, (err) => {
            if (err) console.log('unlink error', err);
            console.log('This file has been removed successfully.');
        });
    }
};
