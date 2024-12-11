export interface MagnetGroup {
    id:      string;
    name:    string;
    magnets: Magnets;
}

export interface Location {
    id: string;
    address:    string;
    phone:      string;
    store:      Store;
    promotions: Magnets;
    schedules:  ScheduleItems;
    promotions: Promotions
}

export interface MagnetsItem {
    id:       string;
    location: Location;
}

export interface Magnets {
    items: MagnetsItem[];
}

export interface Store {
    avatarImage: string;
    description: string;
    name:        string;
    categories:  Categories;
}

export interface Categories {
    items: CategoriesItem[];
}

export interface CategoriesItem {
    category: Category;
}

export interface Category {
    name: string;
}

export interface Schedule {
    id:          string;
    day:         string;
    openingTime: string;
    closingTime: string;
}
export interface ScheduleItems {
    items: Schedule[]
}

export interface Promotions {
    items: PromotionsItem[];
}

export interface PromotionsItem {
    id:          string;
    title:       string;
    description: string;
    startDate:   string;
    endDate:     string;
    image:       string;
}