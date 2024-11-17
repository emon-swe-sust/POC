import { gql, useQuery } from "@apollo/client";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticate } from "../utils/isAuthenticate";

const GET_USER_BY_ID = gql`
  query GetUserById($id: String!) {
    getUserById(id: $id) {
      username
      fullName
      role
      department
      regNo
      email
    }
  }
`;

const EXAM_RESULT_BY_EXAMINEE_ID = gql`
  query GetExamResultByExamineeId($examineeId: String!) {
    getExamResultByExamineeId(examineeId: $examineeId) {
      examTitle
      rightAnswers
    }
  }
`;

export const Profile = () => {
  const userId = sessionStorage.getItem("userId");
  const { data: userProfile } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: userId,
    },
  });
  const { data: result } = useQuery(EXAM_RESULT_BY_EXAMINEE_ID, {
    variables: {
      examineeId: userId,
    },
  });
  const profile = userProfile?.getUserById;
  const examResult = result?.getExamResultByExamineeId;

  const authentic = isAuthenticate();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authentic) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="m-20 py-10 px-40">
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">
          Profile Information
        </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile?.fullName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Username</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile?.username}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile?.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Role</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile?.role}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Registration no
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile?.regNo}
            </dd>
          </div>
          {profile?.role === "student" && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
              <dt className="text-sm/6 font-medium text-gray-900">
                Exam result
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="max-h-[300px] overflow-y-auto divide-y divide-gray-100 rounded-md border border-gray-200"
                >
                  {examResult ? (
                    examResult.map((result, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6"
                      >
                        <div className="flex w-0 flex-1 items-center">
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">
                              {result.examTitle}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 shrink-0">
                          <p className="font-medium text-indigo-600 hover:text-indigo-500">
                            {result.rightAnswers.length}
                          </p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div>No exam found</div>
                  )}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};
