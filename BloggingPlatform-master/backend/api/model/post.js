const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    content: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      unique: true,
    },
    creationDate:{
        type: Date,
        default: Date.now
    },
    categories: {
      type: Array,
      require: true
    },
    comment: {
      type: String,
      require: true
    }
  },
  { timestamps: true, 
  }
)
module.exports = mongoose.model("Post", PostSchema)
