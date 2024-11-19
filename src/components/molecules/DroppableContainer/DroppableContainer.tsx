import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import React from "react";
import DraggableTask from "../DraggableTask/DraggableTask";

interface DroppableContainerProps {
  id: string;
  items: string[];
}

const DroppableContainer: React.FC<DroppableContainerProps> = ({ id, items }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="h-full">
      <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <DraggableTask key={item} id={item} />
        ))}
      </SortableContext>
    </div>
  );
};

export default DroppableContainer;
