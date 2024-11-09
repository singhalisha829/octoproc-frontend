import React from "react";

const DashboardPage = () => {
  return (
    <div className="px-8 pt-10 ">
      <header className="grid gap-2 mt-10">
        <h2 className="font-semibold text-white leading-4 text-2xl">
          Available Stocks
        </h2>
        <p className="text-white text-lg leading-8">
          Database for all Available Stocks
        </p>
      </header>

      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center justify-center gap-4"></div>
      </div>
    </div>
  );
};

export default DashboardPage;
