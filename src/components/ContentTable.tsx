import React from "react";
import { useNavigate } from "react-router-dom";
import { ContentTableProps, Project } from "../types/global";

interface ContentTablePropsWithEmit<T extends object>
  extends ContentTableProps<T> {
  onButtonClick: (key: string | null, item?: string) => void;
}

const ContentTable = <T extends Project>({
  tableData = [],
  pageToRedirect,
  queryNameToAdd,
  onButtonClick,
}: ContentTablePropsWithEmit<T>) => {
  const navigate = useNavigate();

  const headers = tableData?.length > 0 ? Object.keys(tableData[0]) : [];

  const formatHeader = (header: string): string =>
    header.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const handleNameClick = (key: string | null, item: T): void => {
    const videoKey = item.video_key;
    const _key = key ?? ("" as string);
    if (!_key && videoKey) {
      onButtonClick(null, videoKey);
      return;
    }
    onButtonClick(_key, undefined);
    navigate(
      `/${pageToRedirect}?${queryNameToAdd}=${encodeURIComponent(_key)}`
    );
  };

  // const test = (e) =>{
  //   if(e.target.closest('td')) console.log(e.target.id)
  //     debugger
  //     handleNameClick(e.target.id,e.target.videoKey)
  // }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-blue-700 uppercase bg-gray-100 h-10">
          <tr className="border-b">
            {headers?.map((header, index) => (
              <th key={index} className="p-2">
                {formatHeader(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((item, index) => (
            <tr
              key={index}
              className={`odd:bg-white even:bg-gray-50 h-16 border-b cursor-pointer hover:bg-gray-200`}
              // onClick={test}
            >
              {headers?.map((header) => (
                <td
                  key={header}
                  id={item.key}
                  title={header === "poster" || header === "logo" || header === "header" ? null : item[header]}
                  className="p-2 text-gray-900 font-medium text-center truncate max-w-80"
                >
                  {header === "poster" ||
                  header === "logo" ||
                  header === "header" ? (
                    item[header] ? (
                      <img
                        src={item[header]}
                        alt="Poster"
                        className="w-16 object-cover rounded-md mx-auto"
                      />
                    ) : (
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded capitalize whitespace-nowrap">{`${formatHeader(
                        header
                      )} image not available`}</span>
                    )
                  ) : header === "name" ? (
                    <button
                      onClick={() => handleNameClick(item.key, item)}
                      title={item[header]}
                      className="text-blue-500 underline truncate max-w-80"
                    >
                      {item[header]}
                    </button>
                  ) : (
                    item[header] ?? "Not Present"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;
