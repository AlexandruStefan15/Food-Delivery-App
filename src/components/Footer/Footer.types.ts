
export interface FooterProps extends React.ComponentProps<"footer"> {
  navigation?: NavigationItem[];
}

export interface LinkListProps {
  title: string;
  links: NavLinkItem[];
}

export interface NavigationItem {
  title: string;
  links: NavLinkItem[];
}

export interface NavLinkItem {
  label: string;
  path: string;
}