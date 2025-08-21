"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workflow_1 = require("./workflow");
const router = (0, express_1.Router)();
router.use('/workflow', workflow_1.router);
exports.default = router;
//# sourceMappingURL=index.js.map