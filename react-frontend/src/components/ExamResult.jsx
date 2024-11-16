import { gql, useQuery } from "@apollo/client";
import { List } from "./List";

const EXAM_RESULT = gql`
  query GetExamResultByExamId($examId: String!) {
    getExamResultByExamId(examId: $examId) {
      examId
      examineeId
      examineeName
      rightAnswers
    }
  }
`;

export const ExamResult = ({ examId }) => {
  const { data } = useQuery(EXAM_RESULT, {
    variables: { examId },
  });

  return (
    <div className="mx-12">
      {data && data.getExamResultByExamId && (
        <List
          items={data.getExamResultByExamId.map((examinee) => ({
            title: examinee.examineeName,
            remarks: examinee.rightAnswers.length,
          }))}
        />
      )}
    </div>
  );
};
