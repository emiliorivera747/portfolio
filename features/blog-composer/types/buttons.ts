export interface SelectContentButtonProps {
  path: string;
  strokeWidth?: number;
  className?: String;
  ref?: React.Ref<HTMLDivElement>;
}

export interface SelectContentWithToolTipButtonProps {
  label: string;
  type: "image" | "doc";
  path: string;
  addContent: (type: "image" | "doc") => void;
}
