import React from "react";
import { useNavigate } from "react-router-dom";
import { ContentTableProps, Project } from "../types/global";

const ContentTable = <T extends Project>({
  tableData = [],
  pageToRedirect,
  queryNameToAdd,
}: ContentTableProps<T>) => {
  const navigate = useNavigate();

  const headers = tableData?.length > 0 ? Object.keys(tableData[0]) : [];

  const handleNameClick = (name: string) => {
    navigate(
      `/${pageToRedirect}?${queryNameToAdd}=${encodeURIComponent(name)}`
    );
  };

  return (
    <>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {headers?.map((header, index) => (
              <th key={index} className="border border-gray-300 p-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((item, index) => (
            <tr key={index}>
              {headers?.map((header) => (
                <td key={header} className="border border-gray-300 p-2">
                  {header === "poster" || header === "logo"  || header==="header" ? (
                    <img
                      src={item[header]}
                      alt="Poster"
                      className="w-16 object-cover"
                    />
                  ) : header === "name" ? (
                    <button
                      onClick={() => handleNameClick(item.key)}
                      className="text-blue-500 underline"
                    >
                      {item[header]}
                    </button>
                  ) : (
                    item[header]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ContentTable;
