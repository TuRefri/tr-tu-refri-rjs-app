
export interface Location {
    id:       string;
    address:  string;
    phone:    string;
    store:    StoreLocation;
    latitude: number;
    longitud: number;
    zoneID:   string;
    promotions: Promotions
}

export interface StoreLocation {
    name:        string;
    avatarImage: string;
    description: string;
    categories:  Categories;
}

export interface Categories {
    items: CategoryItem[];
}

export interface CategoryItem {
    id:         string;
    categoryId: string;
    category:   Category;
}

export interface Category {
    name: string;
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