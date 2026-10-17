import { cn } from '@/lib/utils'

interface FormLayoutProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function FormLayout({ title, children, className }: FormLayoutProps) {
  return (
    <div className="to-muted/30 bg-linear-to-br min-h-screen from-background via-background py-8 md:py-16">
      <div
        className={cn('mx-auto w-full px-4', 'md:max-w-2xl md:px-0', className)}
      >
        <div
          className={cn(
            'rounded-2xl border bg-card p-6 shadow-lg',
            'md:p-10',
            'dark:border-border/50 dark:shadow-primary/5 dark:shadow-2xl',
          )}
        >
          {/* Header */}
          {title && (
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {title}
              </h1>
              <div className="bg-primary/60 mx-auto mt-4 h-1 w-12 rounded-full" />
            </div>
          )}

          {/* Content */}
          {children}
        </div>

        {/* Footer branding */}
        <p className="text-muted-foreground/60 mt-4 text-center text-xs">
          Powered by Elly Forms
        </p>
      </div>
    </div>
  )
}
