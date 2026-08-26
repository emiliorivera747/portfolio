"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SecondaryHeader from "@/components/titles/SecondaryHeader";
import { initialsFor } from "@/lib/initials";
import type { Media, Testimonial as TestimonialDoc } from "@/payload-types";

type TestimonialItem = TestimonialDoc;

// Each testimonial's initials get their own colour. Assigned by position
// rather than hashing the name: a hash is stable if the list is reordered, but
// two names can collide onto the same colour, and "always different" is the
// point here. Six entries covers the current five with room to spare; beyond
// that it cycles.
const AVATAR_COLORS = [
  "bg-secondary-900",
  "bg-teal-600",
  "bg-rose-500",
  "bg-violet-600",
  "bg-amber-600",
  "bg-cyan-700",
];

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: TestimonialItem;
  index: number;
}) => {
  const photo: Media | null =
    typeof testimonial.photo === "object" ? testimonial.photo : null;

  const cardRef = useRef<HTMLElement>(null);

  // Written straight onto the element as CSS variables rather than held in
  // state: this fires on every pointer move, and re-rendering the card that
  // often would be wasteful when only two custom properties change.
  const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--my", `${event.clientY - bounds.top}px`);
  };

  return (
    // figure/blockquote/figcaption rather than the previous h2-wrapping-a-p,
    // which nested a paragraph inside a heading and gave every quote the
    // semantic weight of a section title.
    <figure
      ref={cardRef}
      onMouseMove={handlePointerMove}
      className="group relative flex w-full md:w-[calc(50%-0.75rem)] flex-col overflow-hidden rounded-[12px] border border-primary-300 bg-primary-100 shadow-sm"
    >
      {/* The yellow blob that follows the pointer. It sits at the bottom of
          the card's stacking order so the frosted pane above can blur it. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(9rem circle at var(--mx, 50%) var(--my, 50%), hsl(45 95% 55% / 0.8), transparent 70%)",
        }}
      />

      {/* Frosted pane. backdrop-blur affects whatever is painted behind this
          element, which is the glow — so the colour reads as diffuse light
          through glass rather than a hard circle. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-white/40 backdrop-blur-2xl"
      />

      <div className="relative flex flex-1 flex-col p-6 sm:p-8">
        <span
          aria-hidden="true"
          className="font-serif text-6xl leading-none text-primary-400"
        >
          &ldquo;
        </span>

        <blockquote className="mt-2 flex-1 text-primary-900 font-light leading-relaxed tracking-wide text-sm sm:text-base">
          {testimonial.quote}
        </blockquote>

        <figcaption className="mt-6 flex flex-row items-center gap-3 border-t border-primary-300 pt-5">
          {/* Always rendered, so a testimonial without a photo still gets an
              avatar rather than the name sliding over to fill the gap. Radix
              swaps in the fallback both when there is no image and when one
              fails to load, so a broken URL degrades to initials too. */}
          <Avatar className="h-11 w-11 shrink-0 border border-primary-300">
            {photo?.url && (
              <AvatarImage
                src={photo.url}
                alt={photo.alt ?? testimonial.name}
                className="object-cover"
              />
            )}
            <AvatarFallback
              className={`${AVATAR_COLORS[index % AVATAR_COLORS.length]} text-white text-sm font-semibold tracking-wide`}
            >
              {initialsFor(testimonial.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex min-w-0 flex-col">
            {testimonial.linkUrl ? (
              <Link
                href={testimonial.linkUrl}
                className="truncate text-sm font-bold text-primary-1000 transition-colors hover:text-secondary-700 hover:underline"
              >
                {testimonial.name}
              </Link>
            ) : (
              <p className="truncate text-sm font-bold text-primary-1000">
                {testimonial.name}
              </p>
            )}

            {testimonial.title && (
              <p className="truncate text-xs text-primary-800 italic">
                {testimonial.title}
              </p>
            )}

            {testimonial.linkUrl && testimonial.linkLabel && (
              <Link
                href={testimonial.linkUrl}
                className="mt-0.5 truncate text-xs font-light text-blue-700 hover:underline"
                aria-label={testimonial.linkLabel}
              >
                {testimonial.linkLabel}
              </Link>
            )}
          </div>
        </figcaption>
      </div>
    </figure>
  );
};

const Testimonial = ({ testimonials }: { testimonials: TestimonialItem[] }) => {
  if (testimonials.length === 0) return null;

  return (
    // White, matching the sections either side of it. The cards are white too,
    // so they're separated from the page by their border and shadow rather
    // than by a background tint — the same treatment the tool cards and the
    // 404 tiles use. The thin top and bottom rules mark where the section
    // starts and ends without a colour change.
    //
    // h-auto with generous padding, not min-h-screen: five stacked quotes made
    // the old section far taller than a viewport, and its overflow-y-scroll
    // put a second scrollbar inside the page.
    <section className="w-full bg-white border-y border-primary-200 pb-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header — same SecondaryHeader and wrapper the tools section uses, so
            every section title on the page shares one type treatment. */}
        <div className="p-10 flex flex-row items-center justify-center pt-20">
          <SecondaryHeader title={"Client Testimonials"} />
        </div>

        {/* Flex-wrap rather than a grid, matching the tools strip. Two effects
            worth having here: a flex line stretches its items to the tallest
            card, so a row still lines up without grid's auto-rows-fr; and
            justify-center centres a row that isn't full — with five quotes the
            last one sits centred under the pair above rather than stranded in
            a left-hand column. */}
        <div className="mt-4 flex flex-wrap justify-center gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Testimonial);
