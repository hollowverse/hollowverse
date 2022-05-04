import React from "react";
import { useCelebContext } from "~/lib/components/StaticPropsContextProvider";
import { FaChevronDown } from "react-icons/fa";

export const Sources = (p: {
  setShowSources: React.Dispatch<React.SetStateAction<boolean>>;
  showSources: boolean;
}) => {
  const context = useCelebContext();
  const oldContent = context.celeb.oldContent!;

  return (
    <div className="p-5">
      <button
        className={`bg-black ${
          p.showSources && "bg-opacity-10"
        } flex min-w-[275px] items-center justify-center gap-1.5 rounded-lg bg-opacity-5 px-3.5 py-2 transition hover:bg-opacity-10 active:bg-opacity-10`}
        onClick={() => p.setShowSources(!p.showSources)}
      >
        {p.showSources ? "Hide" : "Show"} sources for the editorial{" "}
        <FaChevronDown
          className={
            p.showSources
              ? "-rotate-180 text-sm transition duration-300"
              : "text-sm transition duration-300"
          }
        />
      </button>

      {p.showSources && (
        <ul className="mt-5 flex flex-col gap-2.5 font-medium text-blue-600">
          {oldContent.sources.map(({ sourceTitle, sourceUrl }) => {
            const encoded = encodeURIComponent(sourceUrl);
            return (
              <li key={encoded} id={encoded}>
                <a
                  href={sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="rounded-md p-1 active:bg-black active:bg-opacity-5"
                >
                  {sourceTitle}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
