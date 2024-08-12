import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type NavigationProps = {
  backTitle?: string;
  backText?: string;
  backLink?: string;
  nextTitle?: string;
  nextText?: string;
  nextLink?: string;
};

const NavigateTo = ({
  backTitle,
  backText,
  backLink,
  nextTitle,
  nextText,
  nextLink,
}: NavigationProps) => {
  return (
    <div className="flex justify-between absolute bottom-4 left-0 px-8 w-full">
      {backLink && (
        <Link
          href={backLink}
          className="flex gap-2 items-center"
          title={backTitle}
        >
          <ArrowBigLeft /> {backText}
        </Link>
      )}
      {nextLink && (
        <Link
          href={nextLink}
          className="flex gap-2 items-center"
          title={nextTitle}
        >
          {nextText} <ArrowBigRight />
        </Link>
      )}
    </div>
  );
};

export default NavigateTo;
