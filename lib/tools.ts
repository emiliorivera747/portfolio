import type { Tool, Project } from "@/payload-types";
import type { ToolItem } from "@/types/tools";

export type ToolsByCategory = {
  frontEnd: ToolItem[];
  backEnd: ToolItem[];
  both: ToolItem[];
};

function emptyToolsByCategory(): ToolsByCategory {
  return { frontEnd: [], backEnd: [], both: [] };
}

export function resolveToolImageUrl(tool: Tool): string {
  if (tool.imageSource === "upload") {
    return typeof tool.image === "object" && tool.image?.url
      ? tool.image.url
      : "";
  }
  return tool.imageUrl ?? "";
}

export function groupToolsByCategory(tools: Tool[]): ToolsByCategory {
  const grouped = emptyToolsByCategory();
  for (const tool of tools) {
    grouped[tool.category].push({
      name: tool.name,
      imageUrl: resolveToolImageUrl(tool),
    });
  }
  return grouped;
}

export function groupToolsByProject(
  tools: Tool[]
): Record<string, ToolsByCategory> {
  const byProject: Record<string, ToolsByCategory> = {};
  for (const tool of tools) {
    const project = tool.project as number | Project;
    const slug = typeof project === "object" ? project.slug : undefined;
    if (!slug) continue;

    if (!byProject[slug]) byProject[slug] = emptyToolsByCategory();
    byProject[slug][tool.category].push({
      name: tool.name,
      imageUrl: resolveToolImageUrl(tool),
    });
  }
  return byProject;
}
