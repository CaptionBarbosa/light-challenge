"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const workflowConstants_1 = require("./workflowConstants");
const workflowTypes_1 = require("../types/workflowTypes");
const processWorkflow = (invoice) => __awaiter(void 0, void 0, void 0, function* () {
    const startNode = workflowConstants_1.workflowNodes.startNode;
    const nodes = Object.assign(Object.assign({}, workflowConstants_1.workflowNodes.nodes.decisionNodes), workflowConstants_1.workflowNodes.nodes.actionNodes);
    let currentNode = startNode;
    let finalAction = { notificationMethod: null, recipient: "" };
    while (currentNode) {
        if (currentNode.type === workflowTypes_1.NodeTypes.DECISION) {
            const decisionNode = currentNode;
            const nextNodeId = decisionNode.condition(invoice)
                ? decisionNode.trueNodeId
                : decisionNode.falseNodeId;
            const nextNode = nodes[nextNodeId];
            if (!nextNode) {
                throw new Error(`Node with ID ${nextNodeId} not found, terminating workflow.`);
            }
            currentNode = nextNode;
        }
        else if (currentNode.type === workflowTypes_1.NodeTypes.ACTION) {
            const actionNode = currentNode;
            finalAction = actionNode.action();
            break;
        }
    }
    return finalAction;
});
// TODO: Add error handling and logging
// Make a call to the backend API to process workflow actions (sending Slack messages and emails)
exports.default = processWorkflow;
//# sourceMappingURL=workflowUtils.js.map