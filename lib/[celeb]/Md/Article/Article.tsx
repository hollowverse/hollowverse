import { Button } from "@mui/material";
import React from "react";
import { Separator } from "~/lib/components/Separator";
import { useCelebContext } from "~/lib/components/StaticPropsContextProvider";
import s from "./styles.module.scss";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";

export const Article = (p: {
  setShowSources: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const context = useCelebContext();
  const oldContent = context.celeb.oldContent!;

  return (
    <article
      className={s.Article}
      onClick={(e) => {
        if ((e.target as Element).classList.contains("source-citation")) {
          p.setShowSources(true);
        }
      }}
    >
      {oldContent.summaries && (
        <div className="">
          <Separator title="Summary" />
          <div className="mb-5 border-b bg-white p-5 lg:border-x">
            <p>{oldContent.summaries.religion}</p>
            <p>{oldContent.summaries.politicalViews}</p>
          </div>
        </div>
      )}

      <div className={s.contributePromo}>
        <Separator title="Hi! 👋 Do you think a lot about politics and religion? 🧠" />
        <div
          className={
            s.contributePromoContent +
            " " +
            "mb-5 border-b bg-white p-5 lg:border-x"
          }
        >
          <div className={s.contributePromoText}>
            <p>
              Receive a $25 Amazon® gift card by becoming a top contributor on
              Hollowverse!
            </p>
          </div>

          <div className={s.contributePromoButtonContainer}>
            <Link
              aria-label="Learn about the steps required to start contributing to Hollowverse"
              href={{
                pathname: "/~/contribute",
                query: {
                  name: context.celeb.name,
                  slug: context.celeb.slug,
                },
              }}
              passHref
            >
              <Button
                aria-label="Learn about the steps required to start contributing to Hollowverse"
                endIcon={<LoginIcon />}
              >
                Learn how
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Separator title="Editorial" />
      <div
        className="break-normal border-b bg-white p-5 leading-relaxed lg:border-x"
        dangerouslySetInnerHTML={{ __html: oldContent.article }}
      />
    </article>
  );
};
