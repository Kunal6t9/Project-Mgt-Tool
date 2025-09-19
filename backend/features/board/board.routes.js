import express from "express";
import {createBoard,getWorkspaceBoards} from "./board.controller.js"
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

router.use(isAuthenticated);

router.route('/').post(createBoard);
router.route('/:workspaceId').get(getWorkspaceBoards);

export default router;