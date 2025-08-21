"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const api_1 = require("./api");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;
app.use(cors({}), api_1.default);
// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map