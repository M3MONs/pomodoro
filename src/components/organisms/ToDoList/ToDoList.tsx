import DraggableTask from "@/components/molecules/DraggableTask/DraggableTask";
import DroppableContainer from "@/components/molecules/DroppableContainer/DroppableContainer";
import ListColumn from "@/components/molecules/ListColumn/ListColumn";
import { Card, CardContent } from "@/components/ui/card";
import { deleteTask, handleDragEnd, initialItems, initialItemsProps } from "@/components/utils/listUtils";
import { closestCenter, DndContext, MouseSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useState } from "react";

const ToDoList = () => {
  const [containers, setContainers] = useState<initialItemsProps>(initialItems);

  const handleDndDragEnd = (e: any) => {
    handleDragEnd(e, containers, setContainers);
  };

  const handleTaskDelete = (id: string, container: string) => {
    deleteTask(id, container, setContainers);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  return (
    <Card className="w-full" style={{ backgroundColor: "hsl(240deg 10% 3.9% / 70%)" }}>
      <CardContent className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 py-5 h-full">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDndDragEnd} sensors={sensors}>
          {Object.keys(containers).map((container) => (
            // List Column
            <ListColumn title={containers[container].title} key={container}>
              {/* Droppable Container */}
              <DroppableContainer key={container} id={container} items={containers[container].items}>
                {/* Draggable Tasks */}
                {containers[container].items.map((item) => (
                  <DraggableTask key={item.id} id={item.id} value={item.value} handleDelete={(id) => handleTaskDelete(id, container)} />
                ))}
              </DroppableContainer>
            </ListColumn>
          ))}
        </DndContext>
      </CardContent>
    </Card>
  );
};

export default ToDoList;
