import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn('grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-white', className)}>
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M12 4 5 20h3.2l1.3-3.2h5l1.3 3.2H19L12 4Zm0 6.2 1.7 4.2h-3.4L12 10.2Z"
        />
      </svg>
    </span>
  )
}
