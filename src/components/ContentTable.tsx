import React from "react";

interface ContentTableProps<T extends object> {
  tableData?: Array<T>; // Make tableData optional and constrain T to object
}

const ContentTable = <T extends object>({ tableData = [] }: ContentTableProps<T>) => {

  const headers = tableData?.length > 0 ? Object.keys(tableData[0]) : [];

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
              {headers.map((header) => (
                <td key={header} className="border border-gray-300 p-2">
                  {item[header]}
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
