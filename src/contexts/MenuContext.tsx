"use client";

import React, { createContext, useMemo, useState, useEffect } from "react";
import { MenuItem, MenuCategory } from "@/types";

export interface MenuHandlers {
  setCategory: (category: MenuCategory) => void;
  setSearchQuery: (query: string) => void;
}

export interface MenuState {
  menuItems: MenuItem[];
  filteredItems: MenuItem[];
  isLoading: boolean;
  activeCategory: MenuCategory;
  searchQuery: string;
}

export const MenuHandlerContext = createContext<MenuHandlers | undefined>(
  undefined,
);
export const MenuStateContext = createContext<MenuState | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(
    MenuCategory.FOOD,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handlers = useMemo(
    () => ({
      setCategory: setActiveCategory,
      setSearchQuery,
    }),
    [],
  );

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        const res = await fetch("/data/menu.json");
        const data = await res.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter(
      (item) =>
        item.category === activeCategory &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [menuItems, activeCategory, searchQuery]);

  const state = useMemo(
    () => ({
      menuItems,
      filteredItems,
      isLoading,
      activeCategory,
      searchQuery,
    }),
    [menuItems, filteredItems, isLoading, activeCategory, searchQuery],
  );

  return (
    <MenuHandlerContext.Provider value={handlers}>
      <MenuStateContext.Provider value={state}>
        {children}
      </MenuStateContext.Provider>
    </MenuHandlerContext.Provider>
  );
}
