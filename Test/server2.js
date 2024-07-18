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

// logger middleware usually you put it a seprate file
const logger = (req, res, next) => {
  console.log(`${req.method}  ${req.url}`);
  next();
};

//JSON middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

//Route handler for GET /api/users
const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

//Route handler for GET /api/users/:id
const getUsersByIdHandler = (req, res) => {
  const id = req.url.split("/")[3]; // getting the id from url
  const user = users.find((user) => user.id === parseInt(id)); //checking if there is a record by that id
  if (user) {
    res.statusCode = 200;
    res.write(JSON.stringify(user)); // showing the result (recode in json format)
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "User Not Found" }));
  }
  res.end();
};

//Not found handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Route Not Found" }));
  res.end();
};

// Router handler for POST /api/users
const createUserHandler = (req, res) => {
  let body = "";
  //listen for data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    // res.write(JSON.stringify(users));
    res.end();
  });
};

const server = createServer((req, res) => {
  //   logger(req, res, () => { // used handlers and middleware instead
  //     if (req.url === "/api/users" && req.method === "GET") {
  //       //checking the url and method
  //       res.setHeader("Content-Type", "application/json");
  //       res.write(JSON.stringify(users));
  //       res.end();
  //     } else if (
  //       req.url.match(/\/api\/users\/([0-9]+)/) &&
  //       req.method === "GET"
  //     ) {
  //       // checking the url is there anything after user and method

  //       const id = req.url.split("/")[3]; // getting the id from url
  //       const user = users.find((user) => user.id === parseInt(id)); //checking if there is a record by that id
  //       res.setHeader("Content-Type", "application/json");
  //       if (user) {
  //         res.statusCode = 200;
  //         res.write(JSON.stringify(user)); // showing the result (recode in json format)
  //       } else {
  //         res.statusCode = 404;
  //         res.write(JSON.stringify({ message: "User Not Found" }));
  //       }
  //       res.end();
  //     } else {
  //       // res.end("URL & Method Error");
  //       res.setHeader("Content-Type", "application/json");
  //       res.statusCode = 404;
  //       res.write(JSON.stringify({ message: "Route Not Found" }));
  //       res.end();
  //     }
  //   });

  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === "/api/users" && req.method === "GET") {
        getUsersHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        getUsersByIdHandler(req, res);
      } else if (req.url === "/api/users" && req.method === "POST") {
        createUserHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
