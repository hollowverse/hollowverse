import React from "react";

export const Separator: React.FC<{
  title?: string;
  className?: string;
  minor?: boolean;
}> = (p) => {
  const minor = p.minor || false;

  return (
    <div
      className={
        !minor && "border-y bg-white p-5 font-bold lg:border-0 lg:border-b"
      }
    >
      {p.title}
    </div>
  );
};
