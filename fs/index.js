// const fs = require("fs");
const path = require("path");

// // fs.readFile('./files/intro.txt', 'utf-8', (err, data) => {
// //     if(err) throw err;
// //     // console.log(data.toString())
// //     console.log(data)
// // })

// fs.readFile(path.join(__dirname, "files", "intro.txt"), "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// console.log("salut, tu vais a la gare?");

// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "enchante Mubarak, j'mapelle Kadiri",
//   (err) => {
//     if (err) throw err;
//     console.log("write completed");

//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\n\n tu comprehend langue du francais tres bien?",
//       (err) => {
//         if (err) throw err;
//         console.log("append completed");

//         fs.rename(
//           path.join(__dirname, "files", "reply.txt"),
//           path.join(__dirname, "files", "newReply.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("rename completed completed");
//           },
//         );
//       },
//     );
//   },
// );

// fs.appendFile(
//   path.join(__dirname, "files", "examen.txt"),
//   "tu comprehend langue du francais tres bien?",
//   (err) => {
//     if (err) throw err;
//     console.log("append completed");
//   },
// );

// process.on("uncaughtException", (err) => {
//   console.error(`there was an uncaught error: ${err}`);
//   process.exit(1);
// });

//a cleaner way of writing the above would be
const fsPromises = require("fs").promises;

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(path.join(__dirname, "promiseFiles", "starter.txt"), "utf8");
    console.log(data);
    await fsPromises.writeFile(path.join(__dirname, 'promiseFiles', 'random.txt'), data)
  } catch (err) {
    console.log(err);
  }
};

fileOps()
