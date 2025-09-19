import Workspace from "./workspace.model.js";

//create a new workspace
export const createWorkspace = async (req, res) => {
  try {
    const { name } = req.body;
    const ownerId = req.user.id; // From authMiddleware

    if (!name) {
      return res.status(400).json({ message: "Workspace name is required." });
    }

    const newWorkspace = await Workspace.create({
      name,
      owner: ownerId,
      members: [ownerId], //creator is first member
    });

    res.status(201).json(newWorkspace);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//Get all workspaces for a user
export const getUserWorkspaces = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find workspaces
    const workspaces = await Workspace.find({
      $or: [{ owner: userId }, { members: userId }],
    })
      .populate("owner", "name email")
      .populate("members", "name email");

    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
