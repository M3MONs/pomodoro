import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { draggableTaskStyle } from "@/components/utils/listUtils";
import { useDraggable } from "@dnd-kit/core";
import React from "react";

interface DraggableTaskProps {
  item: {
    id: string;
    value: string;
  };
  handleDelete?: (id: string) => void;
  handleUpdate?: (value: string) => void;
}

const DraggableTask: React.FC<DraggableTaskProps> = ({ item, handleDelete, handleUpdate }) => {
  const { id, value } = item;
  const [taskText, setTaskText] = React.useState(value);
  const [isHovered, setIsHovered] = React.useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const style = draggableTaskStyle(transform, isDragging);

  const handleEnter = () => setIsHovered(true);

  const handleLeave = () => setIsHovered(false);

  const handleUpdateTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
    handleUpdate && handleUpdate(e.target.value);
  };

  const handleDeleteButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleDelete && handleDelete(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="text-black flex justify-between items-center w-full h-full gap-5" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        {isHovered ? (
          <>
            <Input
              className="h-6 border-none shadow-none text-wrap"
              defaultValue={taskText}
              onChange={handleUpdateTask}
              onKeyDown={handleKeyDown}
              onFocus={(e) => {
                e.target.select();
              }}
            />
            <Button className="float-right w-4 h-6 z-50" size="sm" onClick={handleDeleteButton}>
              X
            </Button>
          </>
        ) : (
          <span className="h-6">{taskText}</span>
        )}
      </div>
    </div>
  );
};

export default DraggableTask;
