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
    options: ColorFridge[]
}

export interface RoundedButtonCategoriesProps {
    href: string;
    icon: string;
    className?: string;
  }

export interface RoundedButtonTooltipCategoriesProps extends RoundedButtonCategoriesProps {
    options: Category[];
}

export interface ColorFridge {
    id: number;
    name: string;
    hexColor: string;
    shadow: string;
}

interface Category {
    id: number;
    name: string;
}

export type themeButton = "dark" | "white";