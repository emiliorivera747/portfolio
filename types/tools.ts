export interface ToolItem {
  name: string;
  imageUrl: string;
}

export interface CheckWhatDataToShow {
  frontEndData?: boolean;
  backEndData?: boolean;
  bothData?: boolean;
}

export interface ToolsSectionProps {
  bgColor: string;
  frontEndData?: ToolItem[];
  backEndData?: ToolItem[];
  bothData?: ToolItem[];
  checkWhatDataToShow: CheckWhatDataToShow;
}


export interface ToolsProps {
  toolsData: ToolItem[];
}