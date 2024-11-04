export type day = "lunes" | "martes" | "miércoles" | "jueves" | "viernes" | "sábado" | "domingo"

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
    href?: string;
}

export interface MagnetRefriProps {
    id: number;
    image: string;
    name: string;
    category: string;
    phone: string;
    description: string;
    address: string;
    schedule: Schedule
}
type Schedule = {
    lunes: string;
    martes: string;
    miércoles: string; 
    jueves: string;
    viernes: string;
    sábado: string;
    domingo: string;
};

export type Open = "now" | "today" | null

export type themeButton = "dark" | "white";


export interface Event {
    id: number;
    name: string;
    description: string;
    image: string;
    day: string;
    hour: string;
    location: string;
}