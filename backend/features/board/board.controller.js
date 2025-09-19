import Board from "./board.model.js";
import Workspace from "../workspace/workspace.model.js";

export const createBoard = async (req, res) => {
  try {
    const { name, workspaceId } = req.body;
    const ownerId = req.user._id;

    if (!name || !workspaceId) {
      return res
        .status(400)
        .json({ message: "Board name and workspace ID are required" });
    }

    const newBoard = await Board.create({
      name,
      owner: ownerId,
      workspace: workspaceId,
    });

    await Workspace.findByIdAndUpdate(workspaceId, {
      $push: { boards: newBoard._id },
    });

    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getWorkspaceBoards = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const boards = await Board.find({ workspace: workspaceId });

    if (!boards) {
      return res
        .status(444)
        .json({ message: "No boards found for this workspace." });
    }

    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
