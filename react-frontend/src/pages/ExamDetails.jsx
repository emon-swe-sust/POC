import { useForm } from "react-hook-form";
import { classNames } from "../components/Nav";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { MCQs } from "../components/MCQs";
import { isAuthenticate } from "../utils/isAuthenticate";
import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { ExamResult } from "../components/ExamResult";
const ADD_MCQ = gql`
  mutation Add_MCQ(
    $question: String!
    $options: [String!]!
    $examId: String!
    $answer: String!
  ) {
    addMCQ(
      question: $question
      options: $options
      examId: $examId
      answer: $answer
    ) {
      id
      question
      options
      examId
      answer
    }
  }
`;

const GET_QUESTIONS = gql`
  query GetMCQsByExamID($examId: String!) {
    getMCQsByExamID(examId: $examId) {
      id
      question
      options
      examId
      answer
    }
  }
`;

const GET_EXAM = gql`
  query GetExamById($id: String!) {
    getExamById(id: $id) {
      title
      description
      author
      authorId
    }
  }
`;

export const ExamDetails = () => {
  const { examId } = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [addMCQ] = useMutation(ADD_MCQ);
  const role = sessionStorage.getItem("role");
  const [showModal, setShowModal] = useState(false);

  const authentic = isAuthenticate();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authentic) {
      navigate("/login");
    }
  }, []);

  const { data: questions, refetch } = useQuery(GET_QUESTIONS, {
    variables: { examId },
  });

  const { data: examDetails } = useQuery(GET_EXAM, {
    variables: { id: examId },
  });

  const onSubmit = async (value) => {
    const options = [
      value.optionA,
      value.optionB,
      value.optionC,
      value.optionD,
    ];
    try {
      await addMCQ({
        variables: {
          question: value.question,
          options,
          examId,
          answer: value.answer,
        },
      });
      reset();
      refetch();
    } catch (err) {
      console.error("Error adding MCQ:", err);
    }
  };

  return (
    <div className="my-14 mx-28">
      <Modal
        open={showModal}
        setOpen={setShowModal}
        info={{
          title: "Participants!",
        }}
        buttons={[
          {
            title: "Okay",
            onClick: () => setShowModal(false),
            textColor: "#fff",
            bgColor: "#33cc66",
          },
        ]}
      >
        <ExamResult examId={examId} />
      </Modal>
      <div className="flex justify-between p-10 bg-violet-50 border-b border-gray-900/10 border rounded-lg border-gray-300">
        <div>
          <h1 className="text-3xl font-semibold leading-7 text-gray-900 ">
            {examDetails?.getExamById?.title}
          </h1>
          <h1 className="text-xl font-semibold leading-7 text-gray-500 ">
            {examDetails?.getExamById?.author}
          </h1>
          <h1 className="text-md font-semibold leading-7 text-gray-700 ">
            {examDetails?.getExamById?.description}
          </h1>
        </div>
        <div>
          {role === "teacher" && (
            <button
              className="bg-blue-600 px-8 py-2 rounded-md text-white hover:bg-blue-500 font-semibold"
              onClick={() => setShowModal(true)}
            >
              View Result
            </button>
          )}
        </div>
      </div>
      <div className="my-8 p-16 pb-0 border rounded-lg">
        <h1 className="text-3xl font-semibold leading-7 text-gray-900 text-center">
          Questions
        </h1>
        {questions && questions.getMCQsByExamID && (
          <MCQs
            examId={examId}
            mcqs={questions.getMCQsByExamID.map((mcq, index) => {
              return {
                ...mcq,
                title: `QS 1: ${mcq.question}`,
              };
            })}
          />
        )}
      </div>
      {role === "teacher" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12 bg-violet-50">
            <div className="p-10 border-b border-gray-900/10 pb-12 border rounded-lg border-gray-300">
              <h1 className="text-3xl font-semibold leading-7 m-12 text-center text-gray-900 ">
                Add Question
              </h1>
              <div className="mt-10 w-full flex flex-col gap-6">
                <div className="w-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Question
                  </label>
                  <div className="mt-2">
                    <textarea
                      rows={3}
                      {...register("question", {
                        required: "Question is required",
                      })}
                      className={classNames(
                        errors.description
                          ? "border-red-400"
                          : "border-gray-300",
                        "block w-full rounded-md border py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      )}
                      defaultValue={""}
                    />
                    {errors.question && (
                      <p className="text-red-700">{errors.question.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between gap-36">
                  <div className="w-full">
                    <label
                      htmlFor="option A"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Option A
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("optionA", {
                          required: "Option is required",
                        })}
                        placeholder=""
                        className={classNames(
                          errors.optionA ? "border-red-400" : "border-gray-300",
                          "w-full px-4 block flex-1 border bg-white rounded-lg bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        )}
                      />
                      {errors.optionA && (
                        <p className="text-red-700">{errors.optionA.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="option B"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Option B
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("optionB", {
                          required: "Option is required",
                        })}
                        placeholder=""
                        className={classNames(
                          errors.title ? "border-red-400" : "border-gray-300",
                          "w-full px-4 block flex-1 border bg-white rounded-lg bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        )}
                      />
                      {errors.optionB && (
                        <p className="text-red-700">{errors.optionB.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-36">
                  <div className="w-full">
                    <label
                      htmlFor="optionC"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Option C
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("optionC", {
                          required: "Option is required",
                        })}
                        placeholder=""
                        className={classNames(
                          errors.optionC ? "border-red-400" : "border-gray-300",
                          "w-full px-4 block flex-1 border bg-white rounded-lg bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        )}
                      />
                      {errors.optionC && (
                        <p className="text-red-700">{errors.optionC.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="option D"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Option D
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("optionD", {
                          required: "Option is required",
                        })}
                        placeholder=""
                        className={classNames(
                          errors.optionD ? "border-red-400" : "border-gray-300",
                          "w-full px-4 block flex-1 border bg-white rounded-lg bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        )}
                      />
                      {errors.optionD && (
                        <p className="text-red-700">{errors.optionD.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="answer"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Correct Answer
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("answer", {
                        required: "Correct answer is required",
                      })}
                      placeholder=""
                      className={classNames(
                        errors.author ? "border-red-400" : "border-gray-300",
                        "w-full px-4 block flex-1 border bg-white rounded-lg bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      )}
                    />
                    {errors.answer && (
                      <p className="text-red-700">{errors.answer.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
