export interface MenuItem {
  id?: number;
  label: string;
  url: string;
  content?: SubMenuItem[];
}

export interface SubMenuItem {
  id?: number;
  label: string;
  url: string;
}

export interface NavbarProps {
  menuItems: MenuItem[];
}
