import e from "express";
import quizModel from "../models/quiz.js";

class quizController {
  static addQuiz = async (req, res) => {
    const { quizId, quizName, category, difficultyLevel } = req.body;

    // what is coming in body
    // console.log(req.body);

    const quiz = await quizModel.findOne({ quizName: quizName });
    if (quiz) {
      console.log("Quiz already exists");
      res.send({ status: "failed", message: "Quiz already exists" });
    } else {
      if (quizId && quizName && category && difficultyLevel) {
        console.log("four fields are provided");
        try {
          const doc = new quizModel({
            quizId,
            quizName,
            category,
            difficultyLevel,
          });
          console.log("successfully Added Quiz");
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
        console.log("All fields are required");
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  // GET A SINGLE QUIZ
  static getQuiz = async (req, res) => {
    const { quizId } = req.body;

    try {
      console.log(quizId);
      const quiz = await quizModel.findOne({ quizId });
      console.log(quiz);
      if (quiz) {
        console.log(quiz);
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
      console.log(err.name);
      console.log(err.message);
      res.send({ status: "Failed", message: "Something Went Wrong" });
    }
  };

  // GET QUIZ BY NAME
  static getQuizByName = async (req, res) => {
    const { quizName } = req.body;

    if (quizName) {
        await quizModel.find({ quizName: quizName } , (err , result)=>{
        if(err)
        {
          console.log(err);
          res.send({ status: "failed", message: "Can't fetch quiz", err});

        }
        else{
          console.log(docs);
          res.send({ status: "success", message: "fetched the quiz", result });

        }
      });

    }
    else{
      res.send({ status: "failed", message: "All Fields required"});
      
    }
  };



  // INCREMENTING THE ATTEMPTED BY IN CURRENT QUIZ

  static incAttemptedBy = async (req , res)=>{

    try{

      const { _id , count} = req.body;
      const result = await quizModel.findByIdAndUpdate(_id, {$set:{attemptedBy : count}}, ({new:true}));
      // console.log("** result to incremnet the count of attempted by of current Quiz ** ", result);
      res.send({status:"success" , message:"Incremented attemptedBy successfully"})

    }catch(error)
    {
      console.log(error);
      res.send({status:"failed" , message:"Something Went Wrong"})
    }
    

  }







   // NEW ADD QUESTION
   static addQuestion = async (req , res) =>{
    console.log("Add Question function called");
    const { _id , questions} = req.body;
    try{

    console.log(_id);
    console.log(questions);

     await quizModel.findByIdAndUpdate(_id, {questions : questions} , (err , docs)=>{
      if(err)
      {
        console.log(err);
        res.send({
          status: "failed",
          message: "Question not added"
        });
      }
      else{
        console.log(docs);
        res.send({
          status: "success",
          message: "Question added successfully"
        });
      }
    })

    }catch(err)
    {
      console.log(err);
      res.send({status:"failed" , message:"Quiz not updated" , _id , questions , error : err.name , mess: err.message});
    }

  }





  // UPDATE QUIZ

  static updateQuiz = async (req, res) => {
    const { quizId } = req.body;
    const result = await quizModel.findOne({ quizId });

    if (result) {
      res.send({ status: "success", message: "Quiz updated Successfully" });
    } else {
      res.send({ status: "failed", message: "Quiz Not updated" });
    }
  };

  // GET ALL QUIZZES DETAILS
  static getAllQuizzes = async (req, res) => {
    try {
      const result = await quizModel.find();
      res.send({
        status: "success",
        message: "All Quizzes are fetched",
        quizzes: result,
      });
      //   console.log(result);
    } catch (eroor) {
      //   console.log(error);
      res.send({ status: "failed", message: "Not able to fetch the data" });
    }
  };
}

export default quizController;
