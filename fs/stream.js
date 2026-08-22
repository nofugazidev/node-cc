const fs = require('fs')

const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf8'});

const ws = fs.createWriteStream('./files/new-lorem.txt')

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk)
// })

rs.pipe(ws)

rs.on('error', (err) => console.error('Read error:', err.message));
ws.on('error', (err) => console.error('Write error:', err.message));
ws.on('finish', () => console.log('File copied successfully!'));