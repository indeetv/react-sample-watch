import React from "react";
import Navbar from "./Navbar";
import ContentTable from "./ContentTable";
import {AppLayoutProps} from "../types/global"


const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  tableData,
  pageToRedirect,
  queryNameToAdd,
}) => {
  return (
    <>
      <header className="w-full">
        <Navbar />
      </header>
      <main className="w-[80%] m-auto mt-3">
        {children}
        <ContentTable
          tableData={tableData}
          pageToRedirect={pageToRedirect}
          queryNameToAdd={queryNameToAdd}
        />
      </main>
      <footer></footer>
    </>
  );
};

export default AppLayout;
