"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Trellis Money",
    category: "FinTech",
    description:
      "Financial platform helping families build wealth and access financial tools.",
    href: "https://www.trellismoney.com/",
    image:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1782445441/TrellisMoneyDashboard_ccvlyj.png",
    internal: false,
  },
  {
    id: 2,
    title: "Casa Chirilagua",
    category: "Web Application",
    description:
      "Internal management platform for a non-profit in Alexandria, VA.",
    href: "/casa-chirilagua",
    image:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1747625338/Screenshot_2025-05-18_at_8.23.36_PM_sqxg9w.png",
    internal: true,
  },
  {
    id: 3,
    title: "Cipotes Sonriendo Foundation",
    category: "Non-Profit",
    description: "Website for the Cipotes Sonriendo Foundation.",
    href: "https://www.cipotessonriendofoundation.org/",
    image:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1782442242/Screenshot_2026-06-25_at_7.50.20_PM_v5djhd.png",
    internal: false,
  },
  {
    id: 4,
    title: "Portfolio Website",
    category: "Portfolio",
    description:
      "Personal portfolio showcasing projects, skills, and experience.",
    href: "/my-portfolio",
    image:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1753932226/Screenshot_2025-07-30_at_8.22.13_PM_eu24ir.png",
    internal: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const ExternalIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const isLast = index === projects.length - 1 && projects.length % 2 !== 0;

  const cardInner = (
    <>
      <Image
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        src={project.image}
      />

      {/* Permanent gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      {/* Hover tint */}
      <div className="absolute inset-0 bg-secondary-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Category badge */}
      <div className="absolute top-5 left-5">
        <span className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase bg-white/80 backdrop-blur-sm text-primary-900 px-3 py-1.5 rounded-full border border-white/40">
          {project.category}
        </span>
      </div>

      {/* External link icon */}
      {!project.internal && (
        <div className="absolute top-5 right-5">
          <ExternalIcon className="h-4 w-4 text-primary-400" />
        </div>
      )}

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-end justify-between gap-4">
          <div className="flex items-end gap-3 flex-1 min-w-0">
            {/* Title + description */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-xl leading-snug group-hover:translate-x-1 transition-transform duration-300">
                {project.title}
              </h3>
              <p className="text-primary-500 text-sm mt-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {project.description}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
              <ArrowIcon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      {...({
        variants: cardVariants,
        className: `group relative overflow-hidden rounded-2xl h-[18rem] cursor-pointer ${
          isLast ? "sm:col-span-2 lg:col-span-1" : ""
        }`,
      } as any)}
    >
      {project.internal ? (
        <Link href={project.href} className="block h-full w-full">
          {cardInner}
        </Link>
      ) : (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full w-full"
        >
          {cardInner}
        </a>
      )}
    </motion.div>
  );
}

export default function Project() {
  return (
    <section className="min-h-screen w-screen bg-white overflow-auto">
      <div className="w-full pt-36 pb-24 px-[8%]">
        {/* Header */}
        <motion.div
          {...({
            initial: { opacity: 0, y: -24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            className: "mb-20",
          } as any)}
        >
          <h1 className="text-5xl sm:text-7xl font-bold text-primary-1000 mt-3 mb-5 tracking-tight">
            Projects
          </h1>
          <p className="text-primary-700 text-base sm:text-lg max-w-lg leading-relaxed font-light">
            A collection of work spanning web applications, design systems, and
            community initiatives.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          {...({
            variants: containerVariants,
            initial: "hidden",
            animate: "visible",
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
          } as any)}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
