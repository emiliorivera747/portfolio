import { ReactNode } from "react";
import Link from "next/link";
import InfoCard from "@/components/cards/InfoCard";
import { PROJECT_CONTAINER } from "@/components/project/layout";

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
    <div className="w-full bg-white min-h-screen h-auto flex items-center justify-center">
      <div className={PROJECT_CONTAINER}>
        <div className="w-full flex items-top justify-center pt-10">
          <h1 className="text-4xl text-primary-900 font-bold">What did I do?</h1>
        </div>
        <div className="w-full bg-white">
          {/* Deliberately no horizontal padding of its own: the container
              above already sets the page gutter, so this paragraph's edges
              line up with the card grid below instead of sitting inset from
              it. Vertical padding only. */}
          <div className="font-extralight py-10 md:py-16 text-primary-800 text-start text-xl leading-loose tracking-wider">
            {description}
          </div>
          <div className="grid gap-4 md:grid-cols-6 w-full pb-10">
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
              {/* inline-flex + w-fit so the button hugs its label — as a plain
                  block flex child of the column it stretched the full width
                  of the card. */}
              <Link
                href={learnMoreHref}
                className="hover:bg-primary-300 text-md leading-loose tracking-wider text-blue-600 border border-primary-400 rounded-[12px] px-6 py-2 inline-flex w-fit items-center justify-center text-center"
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
