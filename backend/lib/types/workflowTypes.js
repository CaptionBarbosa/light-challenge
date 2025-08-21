"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationMethod = exports.NodeTypes = void 0;
var NodeTypes;
(function (NodeTypes) {
    NodeTypes["DECISION"] = "decision";
    NodeTypes["ACTION"] = "action";
    NodeTypes["START"] = "start";
    NodeTypes["END"] = "end";
})(NodeTypes || (exports.NodeTypes = NodeTypes = {}));
var NotificationMethod;
(function (NotificationMethod) {
    NotificationMethod["EMAIL"] = "email";
    NotificationMethod["SLACK"] = "Slack";
})(NotificationMethod || (exports.NotificationMethod = NotificationMethod = {}));
//# sourceMappingURL=workflowTypes.js.map