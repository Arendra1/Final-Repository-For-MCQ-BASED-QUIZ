import quizModel from "../models/quiz.js";

class quizController {
  // ADD NEW QUIZ METHOD
  static addQuiz = async (req, res) => {
    const { quizId, quizName, category, difficultyLevel } = req.body;

    const quiz = await quizModel.findOne({ quizName: quizName });
    if (quiz) {
      res.send({ status: "failed", message: "Quiz already exists" });
    } else {
      if (quizId && quizName && category && difficultyLevel) {
        try {
          const doc = new quizModel({
            quizId,
            quizName,
            category,
            difficultyLevel,
          });
          res.status(201).send({
            status: "success",
            message: "Quiz Added Successfully",
          });
          await doc.save();
        } catch (error) {
          console.log(error);
          res.send({ status: "failed", message: "Not able to Add Quiz" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  // METHOD TO GET A SINGLE QUIZ
  static getQuiz = async (req, res) => {
    const { quizId } = req.body;

    try {
      const quiz = await quizModel.findOne({ quizId });
      if (quiz) {
        res.send({
          status: "success",
          message: "Successfully fetched the quiz",
          quiz: quiz,
        });
      } else {
        res.send({
          status: "failed",
          message: "Quiz Does Not Exists",
          quiz: null,
        });
      }
    } catch (err) {
      console.log(err.message);
      res.send({ status: "Failed", message: "Something Went Wrong" });
    }
  };

  //  METHOD TO GET QUIZ BY NAME
  static getQuizByName = async (req, res) => {
    const { quizName } = req.body;

    if (quizName) {
      await quizModel.find({ quizName: quizName }, (err, result) => {
        if (err) {
          console.log(err);
          res.send({ status: "failed", message: "Can't fetch quiz", err });
        } else {
          res.send({ status: "success", message: "fetched the quiz", result });
        }
      });
    } else {
      res.send({ status: "failed", message: "All Fields required" });
    }
  };

  // METHOD FOR INCREMENTING THE ATTEMPTED BY IN CURRENT QUIZ
  static incAttemptedBy = async (req, res) => {
    try {
      const { _id, count } = req.body;
      const result = await quizModel.findByIdAndUpdate(
        _id,
        { $set: { attemptedBy: count } },
        { new: true }
      );
      res.send({
        status: "success",
        message: "Incremented attemptedBy successfully",
      });
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Something Went Wrong" });
    }
  };

  // METHOD TO ADD NEW QUESTION
  static addQuestion = async (req, res) => {
    const { _id, questions } = req.body;
    try {
      await quizModel.findByIdAndUpdate(
        _id,
        { questions: questions },
        (err, docs) => {
          if (err) {
            console.log(err);
            res.send({
              status: "failed",
              message: "Question not added",
            });
          } else {
            console.log(docs);
            res.send({
              status: "success",
              message: "Question added successfully",
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.send({
        status: "failed",
        message: "Quiz not updated",
        _id,
        questions,
        error: err.name,
        mess: err.message,
      });
    }
  };

  // METHOD TO UPDATE QUIZ
  static updateQuiz = async (req, res) => {
    const { quizId } = req.body;
    const result = await quizModel.findOne({ quizId });

    if (result) {
      res.send({ status: "success", message: "Quiz updated Successfully" });
    } else {
      res.send({ status: "failed", message: "Quiz Not updated" });
    }
  };

  //METHOD TO GET ALL QUIZZES
  static getAllQuizzes = async (req, res) => {
    try {
      const result = await quizModel.find();
      res.send({
        status: "success",
        message: "All Quizzes are fetched",
        quizzes: result,
      });
    } catch (eroor) {
      res.send({ status: "failed", message: "Not able to fetch the data" });
    }
  };
}

export default quizController;
