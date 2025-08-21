"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workflowNodes = exports.ActionNodeID = exports.DecisionNodeID = void 0;
const invoiceTypes_1 = require("../types/invoiceTypes");
const workflowTypes_1 = require("../types/workflowTypes");
var DecisionNodeID;
(function (DecisionNodeID) {
    DecisionNodeID["AmountGreaterThan10000"] = "amount-greater-than-1000";
    DecisionNodeID["AmountGreaterThan5000"] = "amount-greater-than-5000";
    DecisionNodeID["MarketingRelated"] = "is-marketing-related";
    DecisionNodeID["RequiresManagerApproval"] = "requires-manager-approval";
})(DecisionNodeID || (exports.DecisionNodeID = DecisionNodeID = {}));
var ActionNodeID;
(function (ActionNodeID) {
    ActionNodeID["SendToFinanceManager"] = "send-to-finance-manager";
    ActionNodeID["SendToFinanceTeam"] = "send-to-finance-team";
    ActionNodeID["SendToCFO"] = "send-to-cfo";
    ActionNodeID["SendToCMO"] = "send-to-cmo";
})(ActionNodeID || (exports.ActionNodeID = ActionNodeID = {}));
const decisionNodes = {
    [DecisionNodeID.AmountGreaterThan10000]: {
        id: DecisionNodeID.AmountGreaterThan10000,
        label: "Amount greater than 10,000",
        type: workflowTypes_1.NodeTypes.DECISION,
        condition: (data) => data.amount > 10000,
        trueNodeId: DecisionNodeID.MarketingRelated,
        falseNodeId: DecisionNodeID.AmountGreaterThan5000,
    },
    [DecisionNodeID.AmountGreaterThan5000]: {
        id: DecisionNodeID.AmountGreaterThan5000,
        label: "Amount greater than 5000",
        type: workflowTypes_1.NodeTypes.DECISION,
        condition: (data) => data.amount > 5000,
        trueNodeId: DecisionNodeID.RequiresManagerApproval,
        falseNodeId: ActionNodeID.SendToFinanceTeam,
    },
    [DecisionNodeID.MarketingRelated]: {
        id: DecisionNodeID.MarketingRelated,
        label: "Is marketing related?",
        type: workflowTypes_1.NodeTypes.DECISION,
        condition: (invoice) => invoice.department === invoiceTypes_1.InvoiceDepartment.Marketing,
        trueNodeId: ActionNodeID.SendToCMO,
        falseNodeId: ActionNodeID.SendToCFO,
    },
    [DecisionNodeID.RequiresManagerApproval]: {
        id: DecisionNodeID.RequiresManagerApproval,
        label: "Requires manager approval",
        type: workflowTypes_1.NodeTypes.DECISION,
        condition: (invoice) => invoice.requiresManagerApproval,
        trueNodeId: ActionNodeID.SendToFinanceManager,
        falseNodeId: ActionNodeID.SendToFinanceTeam,
    },
};
const actionNodes = {
    [ActionNodeID.SendToFinanceManager]: {
        id: ActionNodeID.SendToFinanceManager,
        label: "Send to Finance Manager",
        type: workflowTypes_1.NodeTypes.ACTION,
        action: () => {
            console.log("Sending to Finance Manager");
            return {
                notificationMethod: workflowTypes_1.NotificationMethod.EMAIL,
                recipient: "Finance Manager",
            };
        },
    },
    [ActionNodeID.SendToFinanceTeam]: {
        id: ActionNodeID.SendToFinanceTeam,
        label: "Send to Finance Team",
        type: workflowTypes_1.NodeTypes.ACTION,
        action: () => {
            console.log("Sending to Finance Team");
            return {
                notificationMethod: workflowTypes_1.NotificationMethod.SLACK,
                recipient: "Finance Team",
            };
        },
    },
    [ActionNodeID.SendToCFO]: {
        id: ActionNodeID.SendToCFO,
        label: "Send to CFO",
        type: workflowTypes_1.NodeTypes.ACTION,
        action: () => {
            console.log("Sending to CFO");
            return {
                notificationMethod: workflowTypes_1.NotificationMethod.SLACK,
                recipient: "CFO",
            };
        },
    },
    [ActionNodeID.SendToCMO]: {
        id: ActionNodeID.SendToCMO,
        label: "Send to CMO",
        type: workflowTypes_1.NodeTypes.ACTION,
        action: () => {
            console.log("Sending to CMO");
            return {
                notificationMethod: workflowTypes_1.NotificationMethod.EMAIL,
                recipient: "CMO",
            };
        },
    },
};
exports.workflowNodes = {
    startNode: decisionNodes[DecisionNodeID.AmountGreaterThan10000],
    nodes: {
        decisionNodes,
        actionNodes,
    },
};
// TODO:
// Decide if action nodes should be generic and only determine the method that a message is sent (Slack, Email, etc), with the invoice informing manager approval, department, and position.
// This would allow for more flexibility in the future, as new action nodes could be added without changing the workflow structure.
// Alternatively, we could keep the current structure and add new action nodes as needed, but this would require more changes to the workflow structure each time a new action is added.
//# sourceMappingURL=workflowConstants.js.map