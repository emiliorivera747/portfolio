import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Media, Testimonial as TestimonialDoc } from "@/payload-types";

type TestimonialItem = TestimonialDoc;

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialItem }) => {
  const photo: Media | null =
    typeof testimonial.photo === "object" ? testimonial.photo : null;

  return (
    <blockquote className="px-6 pt-10 md:px-18 flex md:flex-col flex-col h-auto gap-1 sm:pt-2">
      <h2 className="text-base md:text-xl leading-loose tracking-wider md:mx-52 md:pt-8 md:pb-2 flex rounded font-extralight">
        <p className="text-zinc-700 px-2 flex text-center justify-center items-center leading-loose tracking-wider font-thin ">
          {testimonial.quote}
        </p>
      </h2>

      <div className="flex flex-row justify-center gap-4 items-center sm:h-auto rounded px-6 py-2">
        {photo?.url && (
          <div className="rounded-full w-12 h-12 relative overflow-hidden shrink-0">
            <Image
              src={photo.url}
              alt={photo.alt ?? testimonial.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
        )}

        <footer className="flex items-start text-sm">
          <div className="flex flex-col justify-center items-start py-4">
            {testimonial.linkUrl ? (
              <Link
                href={testimonial.linkUrl}
                className="text-zinc-700 font-bold text-sm hover:underline hover:text-secondary-700"
              >
                {testimonial.name}
              </Link>
            ) : (
              <p className="text-zinc-700 font-bold text-sm">{testimonial.name}</p>
            )}
            {testimonial.title && (
              <p className="text-xs text-zinc-800 text-xs ">
                <i>{testimonial.title}</i>
              </p>
            )}
            {testimonial.linkUrl && testimonial.linkLabel && (
              <Link
                href={testimonial.linkUrl}
                className="text-blue-700 text-xs font-light hover:underline"
                aria-label={testimonial.linkLabel}
              >
                {testimonial.linkLabel}
              </Link>
            )}
          </div>
        </footer>
      </div>
    </blockquote>
  );
};

const Testimonial = ({ testimonials }: { testimonials: TestimonialItem[] }) => {
  if (testimonials.length === 0) return null;

  return (
    <section className="relative min-h-screen w-screen border-t-2 border-b-2 border-primary-100 overflow-y-scroll flex flex-col items-center justify-center gap-10 py-20">
      <div className="flex items-center justify-center text-center">
        <h1 className="text-primary-1000 text-2xl sm:text-3xl pt-10 font-semibold">
          Client Testimonials
        </h1>
      </div>
      <div className="flex flex-col divide-y divide-primary-100 w-full items-center">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
};

export default React.memo(Testimonial);
