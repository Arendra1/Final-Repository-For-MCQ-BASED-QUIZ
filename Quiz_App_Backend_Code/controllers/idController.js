import idModel from "../models/incremnetID.js";
import quizModel from "../models/quiz.js";
import axios from "axios";

class idController {
  // Method To provide the Incremented quizId to newly added quiz.
  static addId = async (req, res) => {
    idModel.findOneAndUpdate(
      { id: "autoval" },
      { $inc: { count: 1 } },
      { new: true },
      async (err, cd) => {
        try {
          let seqId;
          if (cd == null) {
            const newVal = new idModel({ id: "autoval", count: 1 });
            newVal.save();
            seqId = 1;
          } else {
            seqId = cd.count;
          }

          let quizId = seqId;
          const { quizName, category, difficultyLevel } = req.body;

          const doc = new quizModel({
            quizId,
            quizName,
            category,
            difficultyLevel,
          });

          try {
            const response = await axios.post(
              "https://mevn-quiz-application-fynd.herokuapp.com/api/quiz/addQuiz",
              doc
            );
            if (response.message == "successfully Added Quiz") {
              res.status(201).send({
                status: "success",
                message: "Quiz Added Successfully",
              });
            } else {
              res.send({ status: "failed", message: "Quiz Already Exists" });
            }
          } catch (err) {
            res.status(400).send({
              status: "failed",
              message: "Quiz not Added",
            });
          }
        } catch (error) {
          res.send({ status: "failed", message: "Some error has occured" });
        }
      }
    );
  };

  // Method to get the current count of Quiz
  static getData = async (req, res) => {
    try {
      const result = await idModel.find();
      res.send({
        status: "success",
        message: "Id count is fetched",
        result,
      });
      console.log(result);
    } catch (eroor) {
      res.send({ status: "failed", message: "Not able to fetch the data" });
    }
  };
}

// Exporting The IdController
export default idController;
