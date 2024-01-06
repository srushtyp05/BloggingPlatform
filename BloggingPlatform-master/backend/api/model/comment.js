const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      require: true,
    },
    creationDate:{
        type: Date,
        default: Date.now,
    },
  },
  { timestamps: true, 
  }
)
module.exports = mongoose.model("Comment", CommentSchema)
