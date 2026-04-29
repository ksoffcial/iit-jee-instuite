const mongoose = require("mongoose");
const { Schema } = mongoose;

const attemptSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    testId: {
      type: Schema.Types.ObjectId,
      ref: "test",
      required: true,
    },

    answers: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          required: true,
        },

        selectedAnswer: {
          type: String,
          enum: ["option1", "option2", "option3", "option4", null],
          default: null,
        },

        isCorrect: {
          type: Boolean,
          default: false,
        },

        marksObtained: {
          type: Number,
          default: 0,
        },
      },
    ],

    totalMarks: {
      type: Number,
      default: 0,
    },

    obtainedMarks: {
      type: Number,
      default: 0,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    submittedAt: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["started", "submitted", "expired"],
      default: "started",
    },

    resultVisible: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

attemptSchema.index({ userId: 1, testId: 1 }, { unique: true });

const Attempt = mongoose.model("Attempt", attemptSchema);

module.exports = Attempt;