// import Note from "../models/messageModel.js";
// import asyncHandler from "express-async-handler";


// // @desc    Get logged in user notes
// // @route   GET /api/notes
// // @access  Private

// const GetAllNote = async (req, res) => {
//   try {
//     // Use the find method with an empty object to retrieve all notes from the Note collection
//     const notes = await Note.find({});
//     res.json(notes);
//   } catch (error) {
//     // Handle errors appropriately
//     res.status(500).json({ message: 'Server Error' });
//   }
// };


// const getNotes = asyncHandler(async (req, res) => {
//   const notes = await Note.find({ user: req.user._id });
//   res.json(notes);
// });



// //@description     Fetch single Note
// //@route           GET /api/notes/:id
// //@access          Public
// const getNoteById = asyncHandler(async (req, res) => {
//   const note = await Note.findById(req.params.id);

//   if (note) {
//     res.json(note);
//   } else {
//     res.status(404).json({ message: "Note not found" });
//   }

//   res.json(note);
// });



// //@description     Create single Note
// //@route           GET /api/notes/create
// //@access          Private
// const CreateNote = asyncHandler(async (req, res) => {
//   const { customername, content, category  , Response } = req.body;

//   if (!customername || !content || !category) {
//     res.status(400);
//     throw new Error("Please Fill all the feilds");
//     return;
//   } else {
//     const note = new Note({ user: req.user._id, customername, content, category , Response });

//     const createdNote = await note.save();

//     res.status(201).json(createdNote);
//   }
// });



// //@description     Delete single Note
// //@route           GET /api/notes/:id
// //@access          Private
// const DeleteNote = asyncHandler(async (req, res) => {
//   const note = await Note.findById(req.params.id);

//   if (note.user.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error("You can't perform this action");
//   }

//   if (note) {
//     await note.remove();
//     res.json({ message: "Note Removed" });
//   } else {
//     res.status(404);
//     throw new Error("Note not Found");
//   }
// });




// // @desc    Update a note
// // @route   PUT /api/notes/:id
// // @access  Private
// const UpdateNote = asyncHandler(async (req, res) => {
//   const { customername, content, category , Response } = req.body;

//   const note = await Note.findById(req.params.id);

//   if (note.user.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error("You can't perform this action");
//   }

//   if (note) {
//     note.customername = customername;
//     note.content = content;
//     note.category = category;

//     const updatedNote = await note.save();
//     res.json(updatedNote);
//   } else {
//     res.status(404);
//     throw new Error("Note not found");
//   }
// });




// // @desc    Update a note
// // @route   post /api/notes/respon/:id
// // @access  public
// const respon = asyncHandler(async (req, res) => {
 
//   const { id , Response } = req.body;

//   const note = await Note.findById(id);

//   if (note) {
//     note.Response = Response;
//     const updatedNote = await note.save();
//     res.json(updatedNote);
//   } else {
//     res.status(404);
//     throw new Error("Note not found");
//   }
// });




// export { getNoteById, getNotes, CreateNote, DeleteNote, UpdateNote , GetAllNote, respon};



import Message from "../models/messageModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user messages
// @route   GET /api/messages
// @access  Private

const GetAllMessage = async (req, res) => {
  try {
    // Use the find method with an empty object to retrieve all messages from the Message collection
    const messages = await Message.find({});
    res.json(messages);
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ user: req.user._id });
  res.json(messages);
});

//@description     Fetch single Message
//@route           GET /api/messages/:id
//@access          Public
const getMessageById = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message) {
    res.json(message);
  } else {
    res.status(404).json({ message: "Message not found" });
  }
});

//@description     Create single Message
//@route           POST /api/messages/create
//@access          Private
const CreateMessage = asyncHandler(async (req, res) => {
  const { customername, content, category, Response } = req.body;

  if (!customername || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the fields");
  } else {
    const message = new Message({ user: req.user._id, customername, content, category, Response });

    const createdMessage = await message.save();

    res.status(201).json(createdMessage);
  }
});

//@description     Delete single Message
//@route           DELETE /api/messages/:id
//@access          Private
const DeleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (message) {
    await message.remove();
    res.json({ message: "Message Removed" });
  } else {
    res.status(404);
    throw new Error("Message not Found");
  }
});

// @desc    Update a message
// @route   PUT /api/messages/:id
// @access  Private
const UpdateMessage = asyncHandler(async (req, res) => {
  const { customername, content, category, Response } = req.body;

  const message = await Message.findById(req.params.id);

  if (message.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (message) {
    message.customername = customername;
    message.content = content;
    message.category = category;

    const updatedMessage = await message.save();
    res.json(updatedMessage);
  } else {
    res.status(404);
    throw new Error("Message not found");
  }
});

// @desc    Update a message
// @route   POST /api/messages/response/:id
// @access  public
const respon = asyncHandler(async (req, res) => {
  const { id, Response } = req.body;

  const message = await Message.findById(id);

  if (message) {
    message.Response = Response;
    const updatedMessage = await message.save();
    res.json(updatedMessage);
  } else {
    res.status(404);
    throw new Error("Message not found");
  }
});

export { getMessageById, getMessages, CreateMessage, DeleteMessage, UpdateMessage, GetAllMessage, respon };
