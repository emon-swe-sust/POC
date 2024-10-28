import { useNavigate } from "react-router-dom";
import { classNames } from "./Nav";

export const List = ({ items }) => {
  const navigate = useNavigate();
  return (
    <div role="list" className="divide-y divide-gray-300 my-16">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={classNames(
            index % 2 === 0 ? "bg-gray-100" : "bg-white",
            "flex flex-wrap justify-between gap-x-6 p-5 rounded-md hover:bg-blue-100 cursor-pointer"
          )}
          onClick={() => {
            if (!item.options) navigate(`/exam/${item.id}`);
          }}
        >
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-lg font-semibold leading-6 text-gray-900">
                {item.title}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {item.description}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{item.author}</p>
          </div>
          {item.options &&
            item.options.map((option, index) => {
              const letter = String.fromCharCode(65 + index);
              return (
                <div className="w-full pl-16 leading-loose" key={index}>
                  {letter}. {option}
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};
