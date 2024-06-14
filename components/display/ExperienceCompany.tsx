import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "../../hooks/tailwind";

const ExperienceCompany = ({
  company,
  period,
  position,
  paragraph,
  cover,
  className,
}: {
  company: string;
  period: string;
  position: string;
  paragraph: ReactNode;
  cover?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-lg outline outline-1 outline-gray-200 transition-all",
        "hover:outline-2xl shadow-sm hover:shadow-2xl hover:shadow-gray-50 hover:outline-gray-100",
        className,
      )}
    >
      {cover && (
        <div
          className={
            "relative flex h-[210px] w-full items-center justify-center sm:h-[300px] md:h-[400px]"
          }
        >
          <Image
            width={1000}
            height={1000}
            src={cover}
            alt={`${company} cover`}
            className={"h-full w-auto object-cover"}
          />
        </div>
      )}
      <div className="flex flex-col px-5 py-4">
        <h3 className={"text-xl font-medium"}>{company}</h3>
        <div
          className={
            "flex w-full flex-col-reverse justify-between gap-1 md:flex-row"
          }
        >
          <p className={"opacity-50"}>{position}</p>
          <span>{period}</span>
        </div>
        <p className={"my-2"}>{paragraph}</p>
      </div>
    </div>
  );
};

export default ExperienceCompany;
