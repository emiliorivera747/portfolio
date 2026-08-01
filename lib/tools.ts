import type { Project } from "@/payload-types";
import type { ToolItem } from "@/types/tools";
import { resolveImageUrl } from "@/lib/images";

export type ToolsByCategory = {
  frontEnd: ToolItem[];
  backEnd: ToolItem[];
  both: ToolItem[];
};

type ProjectToolEntry = NonNullable<Project["frontEndTools"]>[number];

function emptyToolsByCategory(): ToolsByCategory {
  return { frontEnd: [], backEnd: [], both: [] };
}

export function resolveToolImageUrl(tool: ProjectToolEntry): string {
  return resolveImageUrl(tool);
}

function toToolItems(entries: ProjectToolEntry[] | null | undefined): ToolItem[] {
  return (entries ?? []).map((tool) => ({
    name: tool.name,
    imageUrl: resolveToolImageUrl(tool),
  }));
}

export function getProjectTools(project: Project): ToolsByCategory {
  return {
    frontEnd: toToolItems(project.frontEndTools),
    backEnd: toToolItems(project.backEndTools),
    both: toToolItems(project.bothTools),
  };
}

export function groupToolsByProject(
  projects: Project[]
): Record<string, ToolsByCategory> {
  const byProject: Record<string, ToolsByCategory> = {};
  for (const project of projects) {
    byProject[project.slug] = getProjectTools(project);
  }
  return byProject;
}
