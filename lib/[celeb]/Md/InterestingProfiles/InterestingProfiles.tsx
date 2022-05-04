import { Container } from "@mui/material";
import React from "react";
import { CelebGallery } from "~/lib/components/CelebGallery";
import { Separator } from "~/lib/components/Separator";
import { useCelebContext } from "~/lib/components/StaticPropsContextProvider";
import s from "./styles.module.scss";

export const InterestingProfiles = () => {
  const context = useCelebContext();
  const relatedPeople = context.celeb.oldContent!.relatedPeople;

  return (
    <div className="">
      <div className="border-y bg-white p-5 font-bold lg:rounded-t-md lg:border-0 lg:border-b">
        Other interesting profiles
      </div>

      <div className="mt-5">
        <CelebGallery celebGalleryItems={relatedPeople} />
      </div>
    </div>
  );
};
