const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const eventLog = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }

        await fsPromises.appendFile(path.join(__dirname, 'logs', 'log-events.txt'), logItem)
    } catch (error) {
        console.error("there was an uncaught error: ", error)
    }
};


module.exports = eventLog