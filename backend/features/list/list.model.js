import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a list name.'],
    trim: true,
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
  cards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
  }],
}, { timestamps: true });

const List = mongoose.model('List', listSchema);

export default List;