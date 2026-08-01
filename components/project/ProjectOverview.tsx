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
    <div className="w-full bg-white min-h-screen h-auto flex items-center justify-center">
      {/* Keep this gutter identical to the one in ProjectGallery so the page
          has one measure top to bottom. */}
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <div className="w-full flex items-top justify-center pt-10">
          <h1 className="text-2xl md:text-4xl text-primary-1000 font-semibold tracking-tight leading-tight">
            What did I do?
          </h1>
        </div>
        <div className="w-full bg-white">
          {/* Deliberately no horizontal padding of its own: the container
              above already sets the page gutter, so this paragraph's edges
              line up with the card grid below instead of sitting inset from
              it. Vertical padding only. */}
          {/* Lead paragraph, run to the full container width so its edges
              match the card grid below. Size and line spacing move together
              here: smaller type across a 1280px line means more characters
              per line, and a longer line needs *more* space between lines,
              not less, for the eye to find its way back to the left margin.
              Hence text-2xl paired with leading-relaxed. Weight 300 rather
              than 400: at this size a lighter weight reads as an intro
              statement instead of a wall of body copy, and 300 is the
              lightest Nunito Sans actually loads in layout.tsx — font-extralight
              (200) was never available and only ever rendered as a fake. */}
          <div className="font-extralight py-10 md:py-16 w-full text-primary-900 text-start text-lg md:text-2xl leading-relaxed text-pretty">
            {description}
          </div>
          <div className="grid gap-4 md:grid-cols-6 w-full pb-10">
            <InfoCard title="Role" className="md:col-span-2">
              <p className="text-base text-primary-800">{role}</p>
            </InfoCard>
            <InfoCard
              title="Responsibility"
              className="bg-tertiary-100 md:col-span-4"
            >
              <div className="text-base text-primary-800 leading-relaxed">
                {responsibility}
              </div>
            </InfoCard>
            <InfoCard
              title={`Learn more about ${learnMoreLabel}`}
              className="md:col-span-6"
            >
              {/* Secondary gradient, matching the active tool filter buttons
                  in ToolsSection. inline-flex + w-fit so it hugs its label —
                  as a plain block flex child of the column it stretched the
                  full width of the card. */}
              <Link
                href={learnMoreHref}
                className="mt-4 bg-gradient-to-r from-secondary-900 to-secondary-1000 text-white text-base font-medium leading-normal rounded-[12px] px-6 py-3 inline-flex w-fit items-center justify-center text-center transition-opacity duration-200 hover:opacity-90"
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
