import { ReactNode } from "react";
import Link from "next/link";
import InfoCard from "@/components/cards/InfoCard";

interface ProjectOverviewProps {
  description: ReactNode;
  role: ReactNode;
  responsibility: ReactNode;
  learnMoreLabel: string;
  learnMoreHref: string;
  learnMoreLinkText?: string;
}

export default function ProjectOverview({
  description,
  role,
  responsibility,
  learnMoreLabel,
  learnMoreHref,
  learnMoreLinkText,
}: ProjectOverviewProps) {
  const linkText = learnMoreLinkText ?? `Visit ${learnMoreLabel}`;
  return (
    <div className="w-screen bg-white min-h-screen h-auto flex items-center justify-center">
      <div className="mx-[10%]">
        <div className="h-1/6 w-full flex items-top justify-center pt-10">
          <h1 className="text-4xl text-primary-900 font-bold"> What did I do?</h1>
        </div>
        <div className="h-full w-full bg-white">
          <h1 className="font-extralight p-6 text-primary-800 text-start text-xl leading-loose tracking-wider md:text-xl md:p-16">
            {description}
          </h1>
          <div className="grid gap-4 md:grid-cols-6 w-full p-6">
            <InfoCard title="Role" className="md:col-span-2">
              <p className="font-light text-md text-primary-800">{role}</p>
            </InfoCard>
            <InfoCard
              title="Responsibility"
              className="bg-tertiary-100 md:col-span-4"
            >
              <div className="text-sm md:text-md font-light text-md text-primary-800 leading-loose tracking-wider">
                {responsibility}
              </div>
            </InfoCard>
            <InfoCard
              title={`Learn more about ${learnMoreLabel}`}
              className="md:col-span-6"
            >
              <Link
                href={learnMoreHref}
                className="hover:bg-primary-300 text-md md:text-md leading-loose tracking-wider text-blue-600 border border-primary-400 rounded-[12px] px-2 py-3 flex items-center justify-center text-center"
                aria-label={linkText}
              >
                {linkText}
              </Link>
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  );
}
