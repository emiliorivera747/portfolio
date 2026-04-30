import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectButtonProps {
  href: string;
  label: string;
  className?: string;
}

const ProjectButton = ({ href, label, className }: ProjectButtonProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "h-[3.5rem] px-[4rem] rounded-[12px] font-semibold text-primary-900 border-primary-300 hover:bg-primary-100 transition delay-150 duration-300 ease-in-out",
        className
      )}
      style={{
        boxShadow:
          "rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px",
      }}
    >
      <Link href={href} aria-label={label}>
        {label}
      </Link>
    </Button>
  );
};

export default ProjectButton;
