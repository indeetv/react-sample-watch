import React, { useContext, useEffect } from "react";
import Navbar from "./Reusable/Navbar";
import ContentTable from "./ContentTable";
import { AppLayoutProps } from "../types/global";
import LoadingSpinner from "./Reusable/Loader";
import PaginationLoader from "./Reusable/PaginationLoader";
import { GlobalContext } from "../store/Global";

interface AppLayoutPropsWithEmit extends AppLayoutProps {
  onButtonClick: (key: string | null, videoKey?: string) => void | undefined;
  footerText?: string | null;
  onShowMoreClicked?: () => void;
}

const AppLayout: React.FC<AppLayoutPropsWithEmit> = ({
  children,
  footerText,
  tableData,
  pageToRedirect,
  queryNameToAdd,
  onButtonClick,
  onShowMoreClicked,
}) => {
  const { isLoading, paginatorLoading } = useContext(GlobalContext);

  useEffect(() => {
    const handleScrollToBottom = () => {
      if (!paginatorLoading) {
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth', 
          });
        }, 300); 
      }
    };

    handleScrollToBottom();
  }, [paginatorLoading]); 

  return (
    <>
      {isLoading && !paginatorLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <header className="w-full">
            <Navbar />
          </header>
          <main className="w-[80%] m-auto mt-3">
            <span className="p-4 font-bold text-lg text-left text-slate-600 inline-block w-full">
              {children}
            </span>
            <ContentTable
              tableData={tableData}
              pageToRedirect={pageToRedirect}
              queryNameToAdd={queryNameToAdd}
              onButtonClick={onButtonClick}
            />
          </main>
          <footer className="flex justify-center">
            {footerText &&
              (paginatorLoading ? (
                <PaginationLoader />
              ) : (
                <button
                  onClick={onShowMoreClicked}
                  className="text-blue-500 text-center p-5 underline underline-offset-2 cursor-pointer"
                >
                  {footerText}
                </button>
              ))}
          </footer>
        </>
      )}
    </>
  );
};

export default AppLayout;