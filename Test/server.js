import http from "http";
import { json } from "stream/consumers";
const PORT = 8000;

const server = http.createServer((req, res) => {
  //   res.write("Hello World!"); you can also send response with end()
  //   res.setHeader("content-type", "text/html"); //set the type of data send\
  //   res.statusCode = 404; // you can change the statuscode by default its 200
  //instae of tow lone of you can write
  res.writeHead(404, { "Content-type": "application/json" });
  res.end(JSON.stringify({ message: "server error1" }));

  //   res.end("<h1>Hello World</h1>");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
