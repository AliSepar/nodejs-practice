// import fs from "fs";

import fs from "fs/promises";

//readFile(); - with callback

// fs.readFile("./test.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// //readFileSync() - synchrounus version
// const data = fs.readFileSync("./test.txt", "utf8");
// console.log(data);

// readFile() - promises .then() and there is await
// fs.readFile("./test.txt", "utf8")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// readFile() async await we have to make await function

const readFile = async () => {
  try {
    const data = await fs.readFile("./test.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// writeFile();
// it will over wite the data (means delete the old data and add the new data)
const writeFile = async () => {
  try {
    await fs.writeFile("./test.txt", "hello, writing to this file. new Data");
    console.log("file written to....");
  } catch (error) {
    console.log(error);
  }
};

//appendFile() it will and the new data without deleting the old data
const appendFile = async () => {
  try {
    fs.appendFile("./test.txt", "\nThis is the new data added");
    console.log("File appended to......");
  } catch (error) {
    console.log(error);
  }
};

writeFile();

appendFile();

readFile();
