export const initialItems = {
  toDoContainer: {
    title: "To Do",
    items: ["Item 1", "Item 2", "Item 3", "Item 8", "Item 9"],
  },
  inProgressContainer: {
    title: "In Progress",
    items: ["Item 4", "Item 5"],
  },
  doneContainer: {
    title: "Done",
    items: ["Item 6", "Item 7"],
  },
};

export function handleDragEnd(
  event: any,
  containers: { [key: string]: { title: string; items: string[] } },
  setContainers: React.Dispatch<React.SetStateAction<{ [key: string]: { title: string; items: string[] } }>>
) {
  const { active, over } = event;

  if (!over || active.id === over.id) {
    return;
  }

  const fromContainer = Object.keys(containers).find((key) => containers[key].items.includes(active.id));
  const toContainer = Object.keys(containers).includes(over.id) ? over.id : null;

  if (fromContainer && toContainer && fromContainer !== toContainer) {
    setContainers((prev) => {
      const sourceItems = Array.from(prev[fromContainer].items);
      const targetItems = Array.from(prev[toContainer].items);

      const itemIndex = sourceItems.indexOf(active.id);
      if (itemIndex > -1) {
        sourceItems.splice(itemIndex, 1);
        targetItems.push(active.id);
      }

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
