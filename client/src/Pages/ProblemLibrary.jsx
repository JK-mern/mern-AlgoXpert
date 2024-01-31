import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProblemLibrary() {
  const [skipValue, setSkipValue] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const res = await axios.get("/api/problem/all?", {
        params: { skip: skipValue },
      });
      const data = res.data;
      setQuestions(data);
    };
    getQuestions();
  }, [skipValue]);

  const handleNext = () => {
    setSkipValue(skipValue + 10);
  };
  const handlePrev = () => {
    setSkipValue(Math.max(0, skipValue - 10));
  };

  return (
    <main className="max-w-6xl mx-auto my-10">
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Difficulty Level</th>
            </tr>
          </thead>
          <tbody>
            {questions.length >= 1 &&
              questions.map((question, index) => (
                <tr key={index}>
                  <th>{skipValue + index + 1}</th>

                  <td className="cursor-pointer hover:underline">
                    <Link to={`/problems/${question.title}`}>{question.title}</Link> 
                    </td>
                  <td
                    className={
                      question.difficulty === "Easy"
                        ? "text-green-600"
                        : question.difficulty === "Medium"
                        ? "text-amber-500"
                        : question.difficulty === "Hard"
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {question.difficulty}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex flex-row my-6 justify-center gap-4  ">
          <button
            className="btn btn-active btn-ghost"
            disabled={skipValue === 0}
            onClick={handlePrev}
          >
            prev
          </button>
          <button
            className="btn btn-active btn-ghost "
            disabled={questions.length < 10}
            onClick={handleNext}
          >
            next
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProblemLibrary;