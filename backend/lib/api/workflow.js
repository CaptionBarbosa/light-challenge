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
exports.router = void 0;
const express_1 = require("express");
const workflowUtils_1 = require("../utils/workflowUtils");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/process-invoice", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { amount, department, requiresManagerApproval = true } = req.body; // Default value for requiresManagerApproval to ensure higher level appoval is always requested if not defined
        if (!amount || !department) {
            return res.status(403).json({ error: "Invalid request" });
        }
        const workflowParams = {
            amount,
            department,
            requiresManagerApproval
        };
        const approvalRequestDetails = yield (0, workflowUtils_1.default)(workflowParams);
        if (!approvalRequestDetails || !approvalRequestDetails.recipient) {
            return res.status(500).json({ error: "Failed to process workflow" });
        }
        // Here I would insert a scheduled notification to send so that notifications can be batched and load balanced accordingly if required.
        // This would require storing the notification in a database with the current timestamp, method of sending, recipient address, and payload (message with any additional actions).
        // An enhancement could include a priority field to allow for immediate processing of high priority notifications.
        // For auditing purposes, the details of the invoice and its processing outcome should also be stored in the database.
        // For simplicity, I will just return the details of the notification to be sent.
        res.status(200).json({ message: `Sending approval to ${approvalRequestDetails.recipient} via ${approvalRequestDetails.notificationMethod}` });
    });
});
//# sourceMappingURL=workflow.js.map