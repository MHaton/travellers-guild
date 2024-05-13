import cn from "classnames";
import { ReactNode } from "react";

type NoteType = "info" | "success" | "warning" | "error";

type NoteProps = {
  type: NoteType;
  children: ReactNode;
};

export const getClassname = (type: NoteType) => {
  switch (type) {
    case "info":
      return "bg-primary-50 dark:bg-primary-500/10";
    case "success":
      return "bg-green-50 dark:bg-green-500/10";
    case "warning":
      return "bg-orange-100 dark:bg-orange-500/10";
    case "error":
      return "bg-rose-50 dark:bg-rose-500/10";
  }
};

export const Note = ({ type, children }: NoteProps) => {
  return (
    <div className={cn("note my-8 rounded-md px-4 py-2", getClassname(type))}>
      {children}
    </div>
  );
};
