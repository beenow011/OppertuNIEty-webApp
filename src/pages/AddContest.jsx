import axios from "axios";
import React, { useState } from "react";
import { useWeb3Context } from "../context/useWeb3Context";

function AddContest() {
  const { Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;
  const [formData, setFormData] = useState({
    contestName: "",
    questions: [],
    schedule: "",
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",
    options: ["", "", "", ""], // Four options
    correctAnswer: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionInput = (event) => {
    const value = event.target.value;
    parseQuestionInput(value);
  };

  const parseQuestionInput = (inputText) => {
    // Assuming the format: Question text | Option 1 | Option 2 | Option 3 | Option 4 | Correct Answer
    const parts = inputText.split("|").map((part) => part.trim());

    if (parts.length === 6) {
      const [questionText, option1, option2, option3, option4, correctAnswer] =
        parts;
      setCurrentQuestion({
        questionText,
        options: [option1, option2, option3, option4],
        correctAnswer,
      });
    } else {
      alert(
        "Invalid input format! Use: Question | Option 1 | Option 2 | Option 3 | Option 4 | Correct Answer"
      );
    }
  };
  console.log(formData);

  const addQuestion = () => {
    if (
      currentQuestion.questionText.trim() &&
      currentQuestion.options.every((option) => option.trim()) &&
      currentQuestion.correctAnswer.trim()
    ) {
      setFormData((prev) => ({
        ...prev,
        questions: [...prev.questions, currentQuestion],
      }));
      setCurrentQuestion({
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
    } else {
      alert("Please fill out all fields for the question!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      `http://localhost:3000/api/contest/create-contest?address=${selectedAccount}`,
      formData
    );
    console.log("Submitting Contest:", formData);
    alert("Contest Scheduled Successfully!");
    // Submit logic here (e.g., API call)
  };

  return (
    <div className="max-w-4xl mx-auto p-6 border-lg text-white border-gray-200 rounded shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Add MCQ Contest</h1>

      <form onSubmit={handleSubmit}>
        {/* Contest Name */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Contest Name</label>
          <input
            type="text"
            name="contestName"
            value={formData.contestName}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-black"
            placeholder="Enter contest name"
            required
          />
        </div>

        {/* Add Question */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Add Question</label>
          <textarea
            name="questionInput"
            onChange={handleQuestionInput}
            className="w-full p-3 border rounded text-black"
            placeholder="Enter question in the format: Question | Option 1 | Option 2 | Option 3 | Option 4 | Correct Answer"
            rows={3}
            required
          ></textarea>
        </div>

        {/* Options Preview */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Preview</h3>
          <p>
            <strong>Question:</strong> {currentQuestion.questionText}
          </p>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index}>{`Option ${index + 1}: ${option}`}</li>
            ))}
          </ul>
          <p>
            <strong>Correct Answer:</strong> {currentQuestion.correctAnswer}
          </p>
        </div>

        <button
          type="button"
          onClick={addQuestion}
          className="w-full py-2 mb-6 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Question
        </button>

        {/* Display Questions */}
        {formData.questions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Questions Added</h3>
            <ul className="list-disc pl-6">
              {formData.questions.map((q, index) => (
                <li key={index}>
                  <strong>Q{index + 1}: </strong>
                  {q.questionText} <br />
                  <em>Options:</em> {q.options.join(", ")} <br />
                  <em>Correct Answer:</em> {q.correctAnswer}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Schedule */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">
            Schedule Contest
          </label>
          <input
            type="datetime-local"
            name="schedule"
            value={formData.schedule}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Schedule Contest
        </button>
      </form>
    </div>
  );
}

export default AddContest;
