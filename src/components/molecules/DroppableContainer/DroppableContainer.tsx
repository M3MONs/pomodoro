import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import React from "react";
import { itemsProps } from "@/components/utils/listUtils";

interface DroppableContainerProps {
  children?: React.ReactNode;
  id: string;
  items: itemsProps[];
}

const DroppableContainer: React.FC<DroppableContainerProps> = ({ id, items, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="h-full">
      <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </div>
  );
};

export default DroppableContainer;
