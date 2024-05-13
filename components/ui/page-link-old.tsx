import type { ReactNode } from "react"
import ChevronRight from "@components/icons/chevron-right"

export const PageLink = ({ href, children }: { href: string, children: ReactNode }) => {
  return <a href={href} className="flex flex-row p-4 font-medium border border-neutral-200 dark:border-white/20 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-white/10 transition items-center">
    <div className="flex-grow">{ children }</div>
    <ChevronRight className="flex-none text-neutral-600 dark:group-hover:text-white/80 w-5 h-5" />
  </a>
}