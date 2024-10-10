export interface SideBarButton {
    href?: string;
    icon: string;
    size?: number;
    alt?: string;
}

export interface RoundedButtonProps {
    href: string;
    icon: string;
    theme?: themeButton;
    className?: string;
  }

export interface RoundedButtonTooltipProps extends RoundedButtonProps {
    options: colorFridge[] 
}

export interface colorFridge {
    id: number;
    name: string;
    hexColor: string;
    shadow: string;
}


export type themeButton = "dark" | "white";