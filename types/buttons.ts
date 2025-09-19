export interface PrimaryButtonProps {
  className?: string;
  text?: string;
  actionFunction: () => void;
}

export interface SubmitButtonProps {
  ref?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  className?: string;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  text?: string;
  withLinearGradient?: boolean;
  bgFrom?: string;
  bgTo?: string;
  hoverBgFrom?: string;
  hoverBgTo?: string;
  w?: string;
  px?: string;
  py?: string;
  h?: string;
  rounded?: string;
}

export interface SubmitButtonPropsV2 {
  ref: React.ButtonHTMLAttributes<HTMLButtonElement>;
  className?: string;
  text?: string;
  isLoading?: boolean;
}

export interface BackToProps {
  url?: string;
}
