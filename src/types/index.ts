export enum MenuCategory {
  FOOD = "food",
  DRINK = "drink",
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: MenuCategory;
  image: string;
  description: string;
  calories?: string;
  popular?: boolean;
}

export interface ICartItem extends MenuItem {
  quantity: number;
}
