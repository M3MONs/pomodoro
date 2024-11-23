import { initialItemsProps } from "./listUtils";

export const storeItems = (initialItems: initialItemsProps) => {
  localStorage.setItem("initialItems", JSON.stringify(initialItems));
};

export const getItems = (): initialItemsProps | null => {
  const items = localStorage.getItem("initialItems");
  return items ? JSON.parse(items) : null;
};
