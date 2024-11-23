import { Button } from "@/components/ui/button";
import { draggableTaskStyle } from "@/components/utils/listUtils";
import { useDraggable } from "@dnd-kit/core";
import React from "react";

interface DraggableTaskProps {
  id: string;
  value: string;
  handleDelete?: (id: string) => void;
}

const DraggableTask: React.FC<DraggableTaskProps> = ({ id, value, handleDelete }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const style = draggableTaskStyle(transform, isDragging);

  const handleEnter = () => setIsHovered(true);

  const handleLeave = () => setIsHovered(false);

  const handleDeleteButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleDelete && handleDelete(id);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="text-black flex justify-between items-center w-full h-full" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <span>{value}</span>
        {isHovered && (
          <Button className="float-right w-4 h-6 z-50" variant="destructive" size="sm" onClick={handleDeleteButton}>
            X
          </Button>
        )}
      </div>
    </div>
  );
};

export default DraggableTask;
