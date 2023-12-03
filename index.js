// const express = require('express');
// const app = express();
// const port = 3000;

// const mongoose = require('mongoose');
// mongoose.connect(
//   'mongodb+srv://r0883726:fhx9yCbCguA5IKet@cluster0.gt5kln4.mongodb.net/messageDB',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'messages',
//   }
// );

// const cors = require('cors');
// app.use(cors());

// const messageSchema = new mongoose.Schema(
//   {
//     user: String,
//     text: String,
//   },
//   {
//     collection: 'messages',
//   }
// );

// const Message = mongoose.model('Message', messageSchema);

// app.use(express.json());

// app.post("/api/v1/messages", async (req, res) => {
//   const { user, text } = req.body;

//   const newMessage = new Message({
//     user,
//     text,
//   });

//   try {
//     const message = await newMessage.save();
//     res.json({
//       status: "success",
//       message: `POSTING a new message for user ${user}`,
//       data: {
//         message,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: "Failed to save message",
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });


const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

// Set Pug as the view engine
app.set("view engine", "pug");
// Set the views directory
app.set("views", path.join(__dirname, "views"));

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://r0883726:fhx9yCbCguA5IKet@cluster0.gt5kln4.mongodb.net/messageDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "messages",
  }
);

const messageSchema = new mongoose.Schema(
  {
    user: String,
    text: String,
  },
  {
    collection: "messages",
  }
);

const Message = mongoose.model("Message", messageSchema);

// Body-parser middleware om JSON-berichten te verwerken
app.use(express.json());

// CORS toestaan
const cors = require("cors");
app.use(cors());

// GET-eindpunt for a message based on ID sent as a query parameter
app.get("/api/v1/messages", async (req, res) => {
  const username = req.query.user;
  const messageId = req.query.id;

  try {
    if (messageId) {
      const message = await Message.findById(messageId);

      if (!message) {
        return res.status(404).json({
          status: "error",
          message: "Message not found",
        });
      }

      return res.json({
        status: "success",
        data: {
          message,
        },
      });
    } else if (username) {
      const messages = await Message.find({ user: username });
      return res.json({
        status: "success",
        data: {
          messages,
        },
      });
    } else {
      const messages = await Message.find({});
      return res.json({
        status: "success",
        data: {
          messages,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

app.post("/api/v1/messages", async (req, res) => {
  const { user, text } = req.body.message;

  const newMessage = new Message({
    user,
    text,
  });

  try {
    const message = await newMessage.save();
    res.json({
      status: "success",
      data: {
        message,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to save message",
    });
  }
});

app.put("/api/v1/messages/:id", async (req, res) => {
  const messageId = req.params.id;

  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      req.body,
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        status: "error",
        message: "Message not found",
      });
    }

    res.json({
      status: "success",
      data: {
        message: updatedMessage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

app.delete("/api/v1/messages/:id", async (req, res) => {
  const messageId = req.params.id;

  try {
    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).json({
        status: "error",
        message: "Message not found",
      });
    }

    res.json({
      status: "success",
      data: {
        message: deletedMessage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

// GET endpoint for the homepage
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
