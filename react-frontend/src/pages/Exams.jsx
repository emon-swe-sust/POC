import { useForm } from "react-hook-form";
import { classNames } from "../components/Nav";
import { gql, useMutation, useQuery } from "@apollo/client";
import { List } from "../components/List";
import { isAuthenticate } from "../utils/isAuthenticate";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";

const ADD_EXAM = gql`
  mutation AddExam(
    $title: String!
    $description: String!
    $author: String!
    $authorId: String!
  ) {
    addExam(
      title: $title
      description: $description
      author: $author
      authorId: $authorId
    ) {
      id
      title
      description
      author
      authorId
    }
  }
`;

const GET_EXAMS = gql`
  query {
    getAllExams {
      id
      title
      description
      author
      authorId
    }
  }
`;

const GET_EXAMS_BY_AUTHOR_ID = gql`
  query GetExamsByAuthorId($authorId: String!) {
    getExamsByAuthorId(authorId: $authorId) {
      id
      title
      description
      author
      authorId
    }
  }
`;

export const Exams = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [addExam] = useMutation(ADD_EXAM);
  const userId = sessionStorage.getItem("userId");
  const role = sessionStorage.getItem("role");
  const { data: exams, refetch } = useQuery(
    role === "teacher" ? GET_EXAMS_BY_AUTHOR_ID : GET_EXAMS,
    {
      variables: {
        authorId: userId,
      },
    }
  );
  const isTeacher = sessionStorage.getItem("role") === "teacher";
  const [showModal, setShowModal] = useState(false);

  const authentic = isAuthenticate();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authentic) {
      navigate("/login");
    }
  });

  const onSubmit = async (value) => {
    try {
      await addExam({
        variables: {
          title: value.title,
          description: value.description,
          author: sessionStorage.getItem("username"),
          authorId: sessionStorage.getItem("userId"),
        },
      });
      setShowModal(true);

      reset();
      refetch();
    } catch (err) {
      console.error("Error adding Exam:", err);
    }
  };

  const mapExamData = (exam) => ({
    id: exam.id,
    title: exam.title,
    subTitle: exam.description,
    info: exam.author,
  });

  const examList =
    role === "student"
      ? exams?.getAllExams?.map(mapExamData)
      : exams?.getExamsByAuthorId?.map(mapExamData);

  return (
    <div className="my-14 mx-28">
      <Modal
        open={showModal}
        setOpen={setShowModal}
        info={{
          title: "Congratulations!",
          details: `Exam Added`,
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
      {isTeacher && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12 bg-blue-50">
            <div className="p-10 border-b border-gray-900/10 pb-12 border rounded-lg border-gray-300">
              <h1 className="text-3xl font-semibold leading-7 text-gray-900 ">
                Create Exam
              </h1>

              <div className="mt-10 w-full flex flex-col gap-6">
                <div className="flex justify-between gap-36">
                  <div className="w-full">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Title
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("title", { required: "Name is required" })}
                        placeholder="Object Oriented Programming"
                        className={classNames(
                          errors.title ? "border-red-400" : "border-gray-300",
                          "w-full px-4 block flex-1 border bg-white rounded-lg bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        )}
                      />
                      {errors.title && (
                        <p className="text-red-700">{errors.title.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      rows={3}
                      {...register("description", {
                        required: "Description is required",
                      })}
                      className={classNames(
                        errors.description
                          ? "border-red-400"
                          : "border-gray-300",
                        "block w-full rounded-md border py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      )}
                      defaultValue={""}
                    />
                    {errors.description && (
                      <p className="text-red-700">
                        {errors.description.message}
                      </p>
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
      <h1 className="text-3xl font-semibold leading-7 text-gray-900 text-center m-16">
        Exam List
      </h1>
      {exams && (exams.getAllExams || exams.getExamsByAuthorId) && (
        <List
          items={examList}
          buttons={[
            {
              label: role === "student" ? "Participate" : "View",
              onClick: (examId) => {},
              bgColor: "#4338ca",
            },
          ]}
        />
      )}
    </div>
  );
};
