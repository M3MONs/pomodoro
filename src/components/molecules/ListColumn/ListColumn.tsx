import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";
import React from "react";

interface ListColumnProps {
  title: string;
  children?: React.ReactNode;
}

const ListColumn: React.FC<ListColumnProps> = ({ title, children }) => {
  return (
    <Card className="min-h-[400px]">
      <CardTitle className="text-center text-3xl font-bold my-3">{title}</CardTitle>
      <ContextMenu>
        <ContextMenuTrigger>
          <CardContent className="h-full">{children}</CardContent>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Add</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </Card>
  );
};

export default ListColumn;
