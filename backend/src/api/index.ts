
import {Router, type Router as ExpressRouter } from "express";
import { router as workflowRouter } from "./workflow";

const router: ExpressRouter = Router();
router.use('/workflow', workflowRouter);

export default router;
