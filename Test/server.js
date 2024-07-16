import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";
const PORT = process.env.PORT;

//GET current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__filename, __dirname);

const server = http.createServer(async (req, res) => {
  //   res.write("Hello World!"); you can also send response with end()
  //   res.setHeader("content-type", "text/html"); //set the type of data send\
  //   res.statusCode = 404; // you can change the statuscode by default its 200
  //instae of tow lone of you can write
  //   res.writeHead(200, { "Content-type": "application/json" });
  //   res.end(JSON.stringify({ message: "server error2" }));

  //  to check the url and the method there a lot more
  //   console.log(req.url);
  //   console.log(req.method);

  // simple html routing
  try {
    //check if GET request
    if (req.method === "GET") {
      let filePath;
      //   get routing
      if (req.url === "/") {
        filePath = path.join(__dirname, "public", "index.html"); // this will take the path and can go to folder and file
      } else if (req.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html");
      } else {
        throw new Error("Not Found");
      }

      const data = await fs.readFile(filePath); //getting the file
      res.setHeader("Content-Type", "text/html");
      res.write(data); // like sending the html file
      res.end(); //you have to end
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    // if client sent post will show error
    res.writeHead(500, { "Content-type": "text/plain" });
    res.end("Server Error");
  }

  //   res.end("<h1>Hello World</h1>");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
