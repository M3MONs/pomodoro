import { v4 as uuidv4 } from "uuid";
export interface initialItemsProps {
  [key: string]: { title: string; items: itemsProps[] };
}

export interface itemsProps {
  id: string;
  value: string;
}

export const initialItems = {
  toDoContainer: {
    title: "To Do",
    items: [
      { id: "1", value: "Item 1" },
      { id: "2", value: "Item 2" },
    ],
  },
  inProgressContainer: {
    title: "In Progress",
    items: [
      { id: "3", value: "Item 3" },
      { id: "4", value: "Item 4" },
    ],
  },
  doneContainer: {
    title: "Done",
    items: [
      { id: "5", value: "Item 5" },
      { id: "6", value: "Item 6" },
    ],
  },
};

export function handleDragEnd(
  event: any,
  containers: { [key: string]: { title: string; items: { id: string; value: string }[] } },
  setContainers: React.Dispatch<React.SetStateAction<{ [key: string]: { title: string; items: { id: string; value: string }[] } }>>
) {
  const { active, over } = event;

  // If there is no active item or the active item is the same as the item being dragged over, return
  if (!over || active.id === over.id) {
    return;
  }

  // Find the container that the active item is in
  const fromContainer = Object.keys(containers).find((key) => containers[key].items.some((item) => item.id === active.id));
  const toContainer = Object.keys(containers).includes(over.id) ? over.id : null;

  // If the active item is in a container and the container it is being dragged over is different
  if (fromContainer && toContainer && fromContainer !== toContainer) {
    setContainers((prev) => {
      const sourceItems = Array.from(prev[fromContainer].items);
      const targetItems = Array.from(prev[toContainer].items);

      // Find the index of the active item in the source container
      const itemIndex = sourceItems.findIndex((item) => item.id === active.id);
      if (itemIndex > -1) {
        const [movedItem] = sourceItems.splice(itemIndex, 1);
        targetItems.push(movedItem);
      }

      // Update the state with the new items
      return {
        ...prev,
        [fromContainer]: {
          ...prev[fromContainer],
          items: sourceItems,
        },
        [toContainer]: {
          ...prev[toContainer],
          items: targetItems,
        },
      };
    });
  }
}

export const deleteTask = (id: string, container: string, setContainers: React.Dispatch<React.SetStateAction<initialItemsProps>>) => {
  setContainers((prev) => {
    // Find the index of the item in the container
    const sourceItems = Array.from(prev[container].items);
    const itemIndex = sourceItems.findIndex((item) => item.id === id);
    // If the item is found, remove it from the container
    if (itemIndex > -1) {
      sourceItems.splice(itemIndex, 1);
    }
    // Update the state with the new items
    return {
      ...prev,
      [container]: {
        ...prev[container],
        items: sourceItems,
      },
    };
  });
};

export const addTask = (container: string, setContainers: React.Dispatch<React.SetStateAction<initialItemsProps>>) => {
  setContainers((prev) => {
    const sourceItems = Array.from(prev[container].items);
    const newId = uuidv4();
    sourceItems.push({ id: newId, value: `New Task` });
    return {
      ...prev,
      [container]: {
        ...prev[container],
        items: sourceItems,
      },
    };
  });
};

export const draggableTaskStyle = (transform: { x: number; y: number } | null, isDragging: boolean) => ({
  transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  opacity: isDragging ? 0.5 : 1,
  padding: "8px",
  border: "1px solid #ccc",
  marginBottom: "4px",
  backgroundColor: "#fff",
  touchAction: "none",
});
