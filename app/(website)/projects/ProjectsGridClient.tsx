"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/payload-types";

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

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const isLast = index === total - 1 && total % 2 !== 0;

  return (
    <motion.div
      {...({
        variants: cardVariants,
        className: `group relative overflow-hidden rounded-2xl h-[18rem] cursor-pointer ${
          isLast ? "sm:col-span-2 lg:col-span-1" : ""
        }`,
      } as any)}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full w-full">
        <Image
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          src={project.cardImage}
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

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between gap-4">
            <div className="flex items-end gap-3 flex-1 min-w-0">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-xl leading-snug group-hover:translate-x-1 transition-transform duration-300">
                  {project.title}
                </h3>
                <p className="text-primary-500 text-sm mt-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {project.cardDescription}
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
      </Link>
    </motion.div>
  );
}

export default function ProjectsGridClient({
  projects,
}: {
  projects: Project[];
}) {
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
            Work
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
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
