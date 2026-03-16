
export interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {
  primaryNavigation?: NavigationItem[];
  secondaryNavigation?: NavigationItem[];
}

export interface NavigationItem {
  label: string;
  path: string;
}

