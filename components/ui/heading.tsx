import { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => (
  <h1 className="text-5xl font-extrabold mt-12">{children}</h1>
);
