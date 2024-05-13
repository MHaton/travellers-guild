export type PageLink = { title: string; href?: string; pages?: PageLink[] };

export interface SidebarSection {
  title?: string;
  pages?: PageLink[];
}

export type SidebarContent = (SidebarSection | PageLink)[];
