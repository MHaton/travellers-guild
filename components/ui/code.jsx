import { useEffect, useState, useRef } from 'react'
import cn from 'classnames'
import Prism from 'prismjs@1.29.0'
import copy from 'copy-to-clipboard@3.3.3'
import { Copy } from '@components/icons/copy'

export const Code = ({ children, 'data-language': language }) => {
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current, false)
  }, [children])

  useEffect(() => {
    if (copied) {
      copy(ref.current.innerText)
      const to = setTimeout(setCopied, 1000, false)
      return () => clearTimeout(to)
    }
  }, [copied])

  const lines =
    typeof children === 'string' ? children.split('\n').filter(Boolean) : []

  return (
    <div className="relative" aria-live="polite">
      <pre key={children} ref={ref} className={`language-${language}`}>
        {children}
      </pre>
      <div className={cn(
          "absolute top-0 bottom-0 right-0 pr-4", {
            "flex items-center": lines.length === 1,
            "pt-4": lines.length > 1,
          })}>
        <button
          className="rounded flex items-center bg-neutral-900 dark:bg-neutral-800 text-neutral-500"
          onClick={() => setCopied(true)}
        >
          <Copy
            icon={copied ? 'copied' : 'copy'}
            className="w-4 h-4"
            />
        </button>
      </div>
    </div>
  )
}
