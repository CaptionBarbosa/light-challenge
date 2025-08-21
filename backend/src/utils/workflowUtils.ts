import { workflowNodes } from "./workflowConstants";
import {
  ActionNode,
  DecisionNode,
  NodeTypes,
  WorkflowReturn,
} from "../types/workflowTypes";
import { InvoiceData } from "../types/invoiceTypes";

const processWorkflow = async (
  invoice: InvoiceData
): Promise<WorkflowReturn> => {
  const startNode: DecisionNode | ActionNode = workflowNodes.startNode;
  const nodes: Record<string, DecisionNode | ActionNode> = {
    ...workflowNodes.nodes.decisionNodes,
    ...workflowNodes.nodes.actionNodes,
  };

  let currentNode: DecisionNode | ActionNode = startNode;
  let finalAction: WorkflowReturn = { notificationMethod: null, recipient: "" };

  while (currentNode) {
    if (currentNode.type === NodeTypes.DECISION) {
      const decisionNode = currentNode as DecisionNode;
      const nextNodeId = decisionNode.condition(invoice)
        ? decisionNode.trueNodeId
        : decisionNode.falseNodeId;

      const nextNode = nodes[nextNodeId];
      if (!nextNode) {
        throw new Error(
          `Node with ID ${nextNodeId} not found, terminating workflow.`
        );
      }

      currentNode = nextNode;
    } else if (currentNode.type === NodeTypes.ACTION) {
      const actionNode = currentNode as ActionNode;
      finalAction = actionNode.action();
      break;
    }
  }

  return finalAction;
};

// TODO: Add error handling and logging
// Make a call to the backend API to process workflow actions (sending Slack messages and emails)

export default processWorkflow;
