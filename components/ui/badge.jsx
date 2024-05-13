export const normalizeSize = (s) =>
  ['xs', 'sm', 'lg'].includes(s) ? s : 'base'

export const normalizeType = (s) => {
  return ['info', 'success', 'error', 'warning', 'secondary'].includes(s)
    ? s
    : 'default'
}

export const sizes = {
  xs: 'text-xs px-[6px] py-[3px]',
  sm: 'text-sm px-2 py-1',
  lg: 'text-lg px-3 py-[5px]',
  base: 'text-base px-2 py-1',
}

export const colors = {
  info: ['text-white bg-cyan-500', 'text-cyan-500 bg-cyan-50'],
  success: ['text-white bg-green-500', 'text-green-500 bg-green-50'],
  warning: ['text-white bg-amber-400', 'text-amber-500 bg-amber-50'],
  error: ['text-white bg-rose-500', 'text-rose-500 bg-rose-50'],
  secondary: ['text-white bg-neutral-500', 'text-neutral-500 bg-neutral-50'],
  default: ['text-white bg-neutral-900', 'text-white-0 bg-neutral-900'],
}

export const Badge = ({ type, variant, size, children }) => {
  const colorClass = colors[normalizeType(type)][variant === 'contrast' ? 1 : 0]
  const sizeClass = sizes[normalizeSize(size)]
  return (
    <div
      className={`${colorClass} ${sizeClass} w-min inline-block rounded-full`}
    >
      {children}
    </div>
  )
}
