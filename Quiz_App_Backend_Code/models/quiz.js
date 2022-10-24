import mongoose from "mongoose";

// Defining Schema
const quizSchema = new mongoose.Schema({
  quizId: { type: Number, required: true },
  quizName: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  difficultyLevel: { type: String, required: true, trim: true },
  totalQuestions: { type: Number, default: 0 },
  attemptedBy: { type: Number, default: 0 },
});

// Model
const quizModel = mongoose.model("quiz", quizSchema);

// Exporting Quiz Model
export default quizModel;

/*
This is for monggose-auto-increment to increment ids
// import autoIncrement from 'mongoose-auto-increment';
// const connection = mongoose.createConnection(`${DATABASE_URL}`);
// autoIncrement.initialize(connection);

// quizSchema.plugin(AutoIncrement, {inc_field: 'QuizId'});
*/
