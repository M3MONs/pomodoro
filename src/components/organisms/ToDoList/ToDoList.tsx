import DroppableContainer from "@/components/molecules/DroppableContainer/DroppableContainer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { useState } from "react";

const initialItems = {
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

const ToDoList = () => {
  const [containers, setContainers] = useState<{ [key: string]: { title: string; items: string[] } }>(initialItems);

  function handleDragEnd(event: any) {
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

  return (
    <Card className="w-full" style={{ backgroundColor: "hsl(240deg 10% 3.9% / 70%)" }}>
      <CardContent className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 py-5 h-full">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          {Object.keys(containers).map((containerId) => (
            <Card className="min-h-[400px]" key={containerId}>
              <CardTitle className="text-center text-3xl font-bold my-3">{containers[containerId].title}</CardTitle>
              <ContextMenu>
                <ContextMenuTrigger>
                  <CardContent className="h-full">
                    <DroppableContainer key={containerId} id={containerId} items={containers[containerId].items} />
                  </CardContent>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>Add</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </Card>
          ))}
        </DndContext>
      </CardContent>
    </Card>
  );
};

export default ToDoList;
