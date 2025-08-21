export enum NodeTypes {
    DECISION = "decision",
    ACTION = "action",
    START = "start",
    END = "end",
}

export enum NotificationMethod {
    EMAIL = "email",
    SLACK = "Slack",
}

export type WorkflowReturn = {
    notificationMethod: NotificationMethod | null;
    recipient: string;
}

export type WorkflowNode = {
    id: string;
    label: string;
}

export type DecisionNode = WorkflowNode & {
    type: NodeTypes.DECISION;
    condition: (data: any) => boolean;
    trueNodeId: string;
    falseNodeId: string;
}

export type ActionNode = WorkflowNode & {
    type: NodeTypes.ACTION;
    action: () => WorkflowReturn;
}