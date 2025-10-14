import React, { createContext, useState, ReactNode } from 'react';

type MenuItem = {
  id: string;
  name: string;
  price: number;
  course: string;
};

type MenuContextType = {
  menuItems: MenuItem[];
  addItem: (name: string, price: number, course: string) => void;
  removeItem: (id: string) => void;
};

export const MenuContext = createContext<MenuContextType>({
  menuItems: [],
  addItem: () => {},
  removeItem: () => {},
});

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addItem = (name: string, price: number, course: string) => {
    setMenuItems(prev => [...prev, { id: Date.now().toString(), name, price, course }]);
  };

  const removeItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addItem, removeItem }}>
      {children}
    </MenuContext.Provider>
  );
};
