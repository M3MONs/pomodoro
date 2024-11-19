import { useDraggable } from "@dnd-kit/core";
import React from "react";

interface DraggableTaskProps {
  id: string;
}

const DraggableTask: React.FC<DraggableTaskProps> = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    padding: "8px",
    border: "1px solid #ccc",
    marginBottom: "4px",
    backgroundColor: "#fff",
    touchAction: 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="text-black">
      {id}
    </div>
  );
};

export default DraggableTask;
