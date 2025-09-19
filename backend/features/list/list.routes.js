import express from "express";
import { createList, getBoardLists } from "./list.controller.js";
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

router.use(isAuthenticated);

router.route('/').post(createList);
router.route('/:boardId').get(getBoardLists);

export default router;