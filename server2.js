import "dotenv/config";
import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Jim Doe" },
];

// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
// JSON middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};
// route handler for GET /api/users
const getUsersHandler = (req, res, next) => {
  res.write(JSON.stringify(users));
  res.end();
};

// route handler for GET /api/users/:id
const getUserByIdHandler = (req, res, next) => {
  const id = req.url.split("/")[3];
  const user = users.find((user) => user.id === parseInt(id));
  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "User not Found" }));
  }
  res.end();
};

// Not found handler
const notFoundHandler = (req, res, next) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Route not Found" }));
  res.end();
};

// Route handler for POST /api/users
const createUserHandler = (req, res) => {
  let body = "";
  // Listen for the data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    //将 JSON 字符串转换为 JavaScript 对象
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    //将 JavaScript 对象转换为 JSON 字符串
    res.write(JSON.stringify(newUser));
    res.end();
  });
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === "/api/users" && req.method === "GET") {
        getUsersHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        getUserByIdHandler(req, res);
      } else if (req.url === "/api/users" && req.method === "POST") {
        createUserHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
