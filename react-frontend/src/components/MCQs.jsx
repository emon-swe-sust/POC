import { useState } from "react";
import { classNames } from "./Nav";
import { gql, useMutation } from "@apollo/client";
import { Modal } from "./Modal";

const ADD_MCQ_ANSWERS = gql`
  mutation AddAnswer(
    $examId: String!
    $examineeId: String!
    $answers: [MCQAnswerInput!]!
  ) {
    addAnswer(examId: $examId, examineeId: $examineeId, answers: $answers) {
      rightAnswers
      wrongAnswers
    }
  }
`;

export const MCQs = ({ examId, mcqs }) => {
  const [addAnswer] = useMutation(ADD_MCQ_ANSWERS);
  const [showModal, setShowModal] = useState(false);
  const initialAnswers = mcqs.map((mcq) => {
    return { mcqId: mcq.id, selectedAnswer: "" };
  });

  const [answers, setAnswers] = useState(initialAnswers);
  const [answerResult, setAnswerResult] = useState();
  const role = sessionStorage.getItem("role");
  const userId = sessionStorage.getItem("userId");

  const submitAnswer = async () => {
    try {
      const { data } = await addAnswer({
        variables: {
          examId: examId,
          examineeId: userId,
          answers: answers,
        },
      });
      setAnswerResult(data.addAnswer.rightAnswers.length);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="divide-y divide-gray-300 my-16">
      <Modal
        open={showModal}
        setOpen={setShowModal}
        info={{
          title: "Congratulations!",
          details: `🎉 You’ve earned a ${answerResult} on this one. Way to go!  🎉`,
        }}
        buttons={[
          {
            title: "Okay",
            onClick: () => setShowModal(false),
            textColor: "#fff",
            bgColor: "#33cc66",
          },
        ]}
      />
      {mcqs.map((mcq, index) => (
        <div
          key={mcq.id}
          className={classNames(
            index % 2 === 0 ? "bg-gray-50" : "bg-white",
            "flex flex-wrap flex-col justify-between gap-x-6 p-5 rounded-md cursor-pointer"
          )}
        >
          <h2 className="text-lg font-semibold mb-4">{mcq.question}</h2>
          {mcq.options &&
            mcq.options.map((option, index) => {
              return (
                <label
                  key={index}
                  className="flex items-center space-x-2 mb-2 ml-10"
                >
                  <input
                    type="radio"
                    name={mcq.id}
                    value={option}
                    onChange={(e) => {
                      setAnswers(
                        answers.map((answer) => {
                          if (answer.mcqId === mcq.id) {
                            return {
                              mcqId: mcq.id,
                              selectedAnswer: e.target.value,
                            };
                          } else {
                            return answer;
                          }
                        })
                      );
                    }}
                    className="text-blue-600 focus:ring-0"
                  />
                  <span>{option}</span>
                </label>
              );
            })}
        </div>
      ))}
      {role === "student" && (
        <button
          className="bg-green-600 hover:cursor-pointer hover:bg-green-500 text-white mt-10 font-semibold py-2 px-10 w-full rounded-md"
          onClick={() => submitAnswer()}
        >
          Submit
        </button>
      )}
    </div>
  );
};
