import DraggableTask from "@/components/molecules/DraggableTask/DraggableTask";
import DroppableContainer from "@/components/molecules/DroppableContainer/DroppableContainer";
import ListColumn from "@/components/molecules/ListColumn/ListColumn";
import { Card, CardContent } from "@/components/ui/card";
import { addTask, deleteTask, handleDragEnd, initialItems, initialItemsProps, updateTask } from "@/components/utils/listUtils";
import { getItems, storeItems } from "@/components/utils/localStorageUtils";
import { closestCenter, DndContext, MouseSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useEffect, useState } from "react";

const ToDoList = () => {
  const [containers, setContainers] = useState<initialItemsProps>(getItems() || initialItems);

  // Store the initial items in local storage when the component mounts or when the containers change
  useEffect(() => {
    storeItems(containers);
  }, [containers]);

  const handleDndDragEnd = (e: any) => {
    handleDragEnd(e, containers, setContainers);
  };

  const handleTaskDelete = (id: string, container: string) => {
    deleteTask(id, container, setContainers);
  };

  const handleAddTask = (container: string) => {
    addTask(container, setContainers);
  };

  const handleUpdateTask = (value: string, id: string, container: string) => {
    updateTask(value, id, container, setContainers);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 15,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 15,
      },
    })
  );

  return (
    <Card className="w-full select-none" style={{ backgroundColor: "hsl(240deg 10% 3.9% / 70%)" }}>
      <CardContent className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 py-5 h-full">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDndDragEnd} sensors={sensors}>
          {Object.keys(containers).map((container) => (
            // List Column
            <ListColumn title={containers[container].title} key={container} handleAddTask={() => handleAddTask(container)}>
              {/* Droppable Container */}
              <DroppableContainer key={container} id={container} items={containers[container].items}>
                {/* Draggable Tasks */}
                {containers[container].items.map((item) => (
                  <DraggableTask
                    key={item.id}
                    item={item}
                    handleDelete={(id) => handleTaskDelete(id, container)}
                    handleUpdate={(value: string) => {
                      handleUpdateTask(value, item.id, container);
                    }}
                  />
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
