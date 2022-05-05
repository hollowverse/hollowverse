import React from "react";

export const Separator: React.FC<{
  title?: string;
  className?: string;
  minor?: boolean;
}> = (p) => {
  const minor = p.minor || false;

  return (
    <>
      {!minor && (
        <>
          <div className="h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400"></div>
          <div className="border-y bg-white p-5 font-bold lg:border-0 lg:border-b lg:border-x">
            {p.title}
          </div>
        </>
      )}
    </>
  );
};
