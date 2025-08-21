import { ActionNode, DecisionNode } from "../types/workflowTypes";
export declare enum DecisionNodeID {
    AmountGreaterThan10000 = "amount-greater-than-1000",
    AmountGreaterThan5000 = "amount-greater-than-5000",
    MarketingRelated = "is-marketing-related",
    RequiresManagerApproval = "requires-manager-approval"
}
export declare enum ActionNodeID {
    SendToFinanceManager = "send-to-finance-manager",
    SendToFinanceTeam = "send-to-finance-team",
    SendToCFO = "send-to-cfo",
    SendToCMO = "send-to-cmo"
}
export declare const workflowNodes: {
    startNode: DecisionNode;
    nodes: {
        decisionNodes: Record<DecisionNodeID, DecisionNode>;
        actionNodes: Record<ActionNodeID, ActionNode>;
    };
};
//# sourceMappingURL=workflowConstants.d.ts.map