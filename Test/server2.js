import { createServer } from "http";
import { url } from "inspector";
import { join } from "path";

const PORT = process.env.PORT;

// begining of REST API

//my data
const users = [
  { id: 1, name: "Mike doe" },
  { id: 2, name: "Jim doe" },
  { id: 3, name: "Mark doe" },
];

const server = createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    //checking the url and method
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(users));
    res.end();
  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
    // checking the url is there anything after user and method

    const id = req.url.split("/")[3]; // getting the id from url
    const user = users.find((user) => user.id === parseInt(id)); //checking if there is a record by that id

    if (user) {
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(user)); // showing the result (recode in json format)
      res.end();
    } else {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 404;
      res.write(JSON.stringify({ message: "User Not Found" }));
      res.end();
    }
  } else {
    // res.end("URL & Method Error");
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "Route Not Found" }));
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
