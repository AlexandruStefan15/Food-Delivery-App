
export interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {
  primaryNavigation?: NavigationItem[];
}

export interface NavigationItem {
  label: string;
  path: string;
}

