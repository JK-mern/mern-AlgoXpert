import mongoose, { Schema, mongo } from "mongoose";

const problemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  example: [
    {
      input: {
        type: String,
      },
      output: {
        type: String,
      },
      explanation: {
        type: String,
      },
    },
  ],

  constraints: [{ body: String }],

  followUp: {
    type: String,
  },
});


const Problem = new mongoose.model("Problem", problemSchema)
export default Problem