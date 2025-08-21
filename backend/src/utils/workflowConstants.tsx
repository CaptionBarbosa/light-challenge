import { InvoiceData, InvoiceDepartment } from "../types/invoiceTypes";
import {
  ActionNode,
  DecisionNode,
  NodeTypes,
  NotificationMethod,
} from "../types/workflowTypes";

export enum DecisionNodeID {
  AmountGreaterThan10000 = "amount-greater-than-1000",
  AmountGreaterThan5000 = "amount-greater-than-5000",
  MarketingRelated = "is-marketing-related",
  RequiresManagerApproval = "requires-manager-approval",
}

export enum ActionNodeID {
  SendToFinanceManager = "send-to-finance-manager",
  SendToFinanceTeam = "send-to-finance-team",
  SendToCFO = "send-to-cfo",
  SendToCMO = "send-to-cmo",
}

const decisionNodes: Record<DecisionNodeID, DecisionNode> = {
  [DecisionNodeID.AmountGreaterThan10000]: {
    id: DecisionNodeID.AmountGreaterThan10000,
    label: "Amount greater than 10,000",
    type: NodeTypes.DECISION,
    condition: (data) => data.amount > 10000,
    trueNodeId: DecisionNodeID.MarketingRelated,
    falseNodeId: DecisionNodeID.AmountGreaterThan5000,
  },
  [DecisionNodeID.AmountGreaterThan5000]: {
    id: DecisionNodeID.AmountGreaterThan5000,
    label: "Amount greater than 5000",
    type: NodeTypes.DECISION,
    condition: (data) => data.amount > 5000,
    trueNodeId: DecisionNodeID.RequiresManagerApproval,
    falseNodeId: ActionNodeID.SendToFinanceTeam,
  },
  [DecisionNodeID.MarketingRelated]: {
    id: DecisionNodeID.MarketingRelated,
    label: "Is marketing related?",
    type: NodeTypes.DECISION,
    condition: (invoice: InvoiceData) =>
      invoice.department === InvoiceDepartment.Marketing,
    trueNodeId: ActionNodeID.SendToCMO,
    falseNodeId: ActionNodeID.SendToCFO,
  },
  [DecisionNodeID.RequiresManagerApproval]: {
    id: DecisionNodeID.RequiresManagerApproval,
    label: "Requires manager approval",
    type: NodeTypes.DECISION,
    condition: (invoice: InvoiceData) => invoice.requiresManagerApproval,
    trueNodeId: ActionNodeID.SendToFinanceManager,
    falseNodeId: ActionNodeID.SendToFinanceTeam,
  },
};

const actionNodes: Record<ActionNodeID, ActionNode> = {
  [ActionNodeID.SendToFinanceManager]: {
    id: ActionNodeID.SendToFinanceManager,
    label: "Send to Finance Manager",
    type: NodeTypes.ACTION,
    action: () => {
      console.log("Sending to Finance Manager");
      return {
        notificationMethod: NotificationMethod.EMAIL,
        recipient: "Finance Manager",
      };
    },
  },
  [ActionNodeID.SendToFinanceTeam]: {
    id: ActionNodeID.SendToFinanceTeam,
    label: "Send to Finance Team",
    type: NodeTypes.ACTION,
    action: () => {
      console.log("Sending to Finance Team");
      return {
        notificationMethod: NotificationMethod.SLACK,
        recipient: "Finance Team",
      };
    },
  },
  [ActionNodeID.SendToCFO]: {
    id: ActionNodeID.SendToCFO,
    label: "Send to CFO",
    type: NodeTypes.ACTION,
    action: () => {
      console.log("Sending to CFO");
      return {
        notificationMethod: NotificationMethod.SLACK,
        recipient: "CFO",
      };
    },
  },
  [ActionNodeID.SendToCMO]: {
    id: ActionNodeID.SendToCMO,
    label: "Send to CMO",
    type: NodeTypes.ACTION,
    action: () => {
      console.log("Sending to CMO");
      return {
        notificationMethod: NotificationMethod.EMAIL,
        recipient: "CMO",
      };
    },
  },
};

export const workflowNodes = {
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
