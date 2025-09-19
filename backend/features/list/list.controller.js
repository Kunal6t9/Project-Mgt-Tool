import List from "./list.model.js";
import Board from "../board/board.model.js";

export const createList = async (req, res) => {
  try {
    const { name, boardId } = req.body;

    if (!name || !boardId) {
      return res.status(400).json({ message: 'List name and board ID are required.' });
    }
    
    // Create the new list
    const newList = await List.create({
      name,
      board: boardId,
    });
    
    // Add the list id to the board
    await Board.findByIdAndUpdate(boardId, { $push: { lists: newList._id } });

    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getBoardLists = async (req, res) => {
    try {
        const { boardId } = req.params;
        const lists = await List.find({ board: boardId });

        if (!lists) {
            return res.status(404).json({ message: 'No lists found for this board.' });
        }

        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};