import React from "react";
import { featureFlags } from "~/lib/components/featureFlags";
import { CelebPageProps } from "~/lib/components/types";
import { AddFactButton } from "~/lib/[celeb]/AddFactButton";
import { Facts } from "~/lib/[celeb]/Facts";
import { Md } from "~/lib/[celeb]/Md/Md";
import { PageHead } from "~/lib/[celeb]/PageHead/PageHead";
import { TagCollection } from "~/lib/[celeb]/TagCollection";
import { TopSection } from "~/lib/[celeb]/TopSection/TopSection";

export const Celeb = (p: CelebPageProps) => {
  return (
    <main className="flex flex-col bg-gray-100">
      <div className="mx-auto max-w-5xl">
        <PageHead />

        <TopSection />

        {p.celeb.tags.regular.length > 0 && (
          <div className="bg-gray-100 py-5 pl-5 lg:mb-5">
            <TagCollection />
          </div>
        )}

        {p.celeb.facts.topics.length > 0 && <Facts />}

        {featureFlags.AddFactButton && (
          <div className="m-5 flex items-center justify-end self-center lg:my-0 lg:mb-5">
            <AddFactButton />
          </div>
        )}

        {p.celeb.oldContent && <Md />}
      </div>{" "}
    </main>
  );
};

export default Celeb;
