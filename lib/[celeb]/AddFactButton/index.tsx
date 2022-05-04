import React from "react";
import { useCelebContext } from "~/lib/components/StaticPropsContextProvider";
import { getContributeLink } from "~/lib/components/getContributeLink";
import { useRouter } from "next/router";
import { FaPencilAlt } from "react-icons/fa";
export const AddFactButton = () => {
  const context = useCelebContext();
  const router = useRouter();
  const { name, slug } = context.celeb;

  return (
    <button
      className="flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 px-3.5 py-2 text-white"
      onClick={() => {
        const hasReadInstructions = JSON.parse(
          localStorage.getItem("hasReadInstructions") || "false"
        );

        router.push(
          hasReadInstructions
            ? getContributeLink(name)
            : { pathname: "/~/contribute", query: { name, slug } }
        );
      }}
    >
      Add a Fact <FaPencilAlt className="text-sm" />
    </button>
  );
};
