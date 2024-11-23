import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import React from "react";

interface ListColumnProps {
  title: string;
  children?: React.ReactNode;
  handleAddTask?: () => void;
}

const ListColumn: React.FC<ListColumnProps> = ({ title, children, handleAddTask }) => {
  return (
    <Card className="min-h-[400px]">
      <CardTitle className="text-center text-3xl font-bold my-3">{title}</CardTitle>
      <ContextMenu>
        <ContextMenuTrigger>
          <CardContent className="h-full">{children}</CardContent>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleAddTask}>Add</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </Card>
  );
};

export default ListColumn;
