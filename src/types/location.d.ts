
export interface Location {
    id:       string;
    address:  string;
    phone:    string;
    store:    StoreLocation;
    latitude: number;
    longitud: number;
    zoneID:   string;
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

