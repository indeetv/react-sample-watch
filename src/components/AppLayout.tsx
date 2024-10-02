import React from "react";
import Navbar from "./Navbar";
import ContentTable from "./ContentTable";

export default function AppLayout({ children, tableData }) {
  return (
    <>
      <header className="w-full">
        <Navbar></Navbar>
      </header>
      <main className="w-[80%] m-auto mt-3">
        {children}
        <ContentTable tableData={tableData}></ContentTable>
      </main>
      <footer></footer>
    </>
  );
}
