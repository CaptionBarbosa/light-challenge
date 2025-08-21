import { Router, Request, Response } from "express";
import processWorkflow from "../utils/workflowUtils";
import { InvoiceData } from "../types/invoiceTypes";
const router: Router = Router();

router.post("/process-invoice", async function (req: Request, res: Response) {
  const { amount, department, requiresManagerApproval = true } = req.body; // Default value for requiresManagerApproval to ensure higher level appoval is always requested if not defined

  if(!amount || !department) {
    return res.status(403).json({ error: "Invalid request" });
  }

  const workflowParams: InvoiceData = {
    amount,
    department,
    requiresManagerApproval
  }

  const approvalRequestDetails = await processWorkflow(workflowParams);

  if(!approvalRequestDetails || !approvalRequestDetails.recipient) {
    return res.status(500).json({ error: "Failed to process workflow" });
  }

  // Here I would insert a scheduled notification to send so that notifications can be batched and load balanced accordingly if required.
  // This would require storing the notification in a database with the current timestamp, method of sending, recipient address, and payload (message with any additional actions).
  // An enhancement could include a priority field to allow for immediate processing of high priority notifications.
  // For auditing purposes, the details of the invoice and its processing outcome should also be stored in the database.
  // For simplicity, I will just return the details of the notification to be sent.

  res.status(200).json({ message: `Sending approval to ${approvalRequestDetails.recipient} via ${approvalRequestDetails.notificationMethod}`});
});

export { router };
