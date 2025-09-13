import express from "express";
import { createWorkspace, getUserWorkspaces } from "./workspace.controller.js";
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

// All routes
router.use(isAuthenticated);

router.route("/").post(createWorkspace).get(getUserWorkspaces);

export default router;
