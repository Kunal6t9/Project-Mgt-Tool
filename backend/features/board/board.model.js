import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a board name'],
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true,
  },
  lists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
  }],
}, {timestamps:true});

const Board = mongoose.model('Board',boardSchema);

export default Board;