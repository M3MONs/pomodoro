import DroppableContainer from "@/components/molecules/DroppableContainer/DroppableContainer";
import ListColumn from "@/components/molecules/ListColumn/ListColumn";
import { Card, CardContent } from "@/components/ui/card";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { useState } from "react";
import { handleDragEnd, initialItems } from "@/components/utils/listUtils";

const ToDoList = () => {
  const [containers, setContainers] = useState<{ [key: string]: { title: string; items: string[] } }>(initialItems);

  return (
    <Card className="w-full" style={{ backgroundColor: "hsl(240deg 10% 3.9% / 70%)" }}>
      <CardContent className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 py-5 h-full">
        <DndContext collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, containers, setContainers)}>
          {Object.keys(containers).map((containerId) => (
            <ListColumn title={containers[containerId].title} key={containerId}>
              <DroppableContainer key={containerId} id={containerId} items={containers[containerId].items} />
            </ListColumn>
          ))}
        </DndContext>
      </CardContent>
    </Card>
  );
};

export default ToDoList;
