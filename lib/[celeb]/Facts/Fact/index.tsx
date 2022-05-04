import { Typography } from "@mui/material";
import React from "react";
import Link from "~/lib/components/Link";
import { useCelebContext } from "~/lib/components/StaticPropsContextProvider";
import { Fact as TFact } from "~/lib/components/types";
import s from "./styles.module.scss";

export const Fact: React.FC<{ value: TFact }> = ({ value }) => {
  const {
    celeb: { name },
  } = useCelebContext();

  return (
    <div className={s.Fact + " " + "flex flex-col border-b bg-white !p-5"}>
      <div className="mb-5 flex flex-wrap gap-2.5">
        {value.tags.map((t) => {
          return (
            <div
              className="inline-flex rounded-full bg-gray-100 px-3.5 py-2 text-xs text-neutral-500"
              key={t.tag.name}
            >
              # {t.isLowConfidence && "Possibly "}
              {t.tag.name}
            </div>
          );
        })}
      </div>
      <div className={s.body}>
        {(value.type === "quote" && (
          <div className={s.quote}>
            <Typography className={s.context}>
              {value.context}, {name} said
            </Typography>

            <blockquote className="mb-0">
              <Typography>{value.quote}</Typography>
            </blockquote>
          </div>
        )) ||
          (value.type == "fact" && (
            <div className={s.quote}>
              <Typography>{value.content}</Typography>
            </div>
          ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-neutral-500">{value.date}</div>
        <div className="flex gap-2.5 text-sm text-neutral-500">
          <Link
            className="rounded-md bg-gray-100 px-3.5 py-2 text-xs text-neutral-500 no-underline transition active:bg-gray-200"
            href={value.source}
          >
            Source
          </Link>
          <Link
            className="rounded-md bg-gray-100 px-3.5 py-2 text-xs text-neutral-500 no-underline transition active:bg-gray-200"
            href={value.forumLink}
          >
            Forum link
          </Link>
        </div>
      </div>
    </div>
  );
};
