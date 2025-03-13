import * as React from "react"
import { type TooltipProps } from "recharts"

export type ChartConfig = Record<
  string,
  {
    label: string
    color: string
  }
>

type ChartContextValue = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | null>(null)

function ChartProvider({
  config,
  children,
}: {
  config: ChartConfig
  children: React.ReactNode
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      {children}
    </ChartContext.Provider>
  )
}

function useChartContext() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChartContext must be used within a ChartProvider")
  }
  return context
}

interface ChartContainerProps {
  config: ChartConfig
  children: React.ReactNode
  className?: string
}

export function ChartContainer({
  config,
  children,
  className,
}: ChartContainerProps) {
  // Create CSS variables for the colors
  const style = React.useMemo(() => {
    return Object.entries(config).reduce(
      (acc, [key, value]) => {
        acc[`--color-${key}`] = value.color
        return acc
      },
      {} as Record<string, string>
    )
  }, [config])

  return (
    <ChartProvider config={config}>
      <div className={className} style={style}>
        {children}
      </div>
    </ChartProvider>
  )
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    name?: string
    value?: number
    payload?: Record<string, any>
  }>
  label?: string
  formatter?: (value: number, name: string, props: any) => React.ReactNode
  labelFormatter?: (label: string) => React.ReactNode
  indicator?: "line" | "dot"
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
  indicator = "line",
}: ChartTooltipContentProps) {
  const { config } = useChartContext()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        <div className="text-xs font-medium">
          {labelFormatter ? labelFormatter(label as string) : label}
        </div>
        <div className="grid gap-1">
          {payload.map((item) => {
            const dataKey = item.name
            if (!dataKey) return null
            const configItem = config[dataKey]
            if (!configItem) return null

            return (
              <div
                key={dataKey}
                className="flex items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-1">
                  {indicator === "line" ? (
                    <div
                      className="h-0.5 w-3"
                      style={{ backgroundColor: configItem.color }}
                    />
                  ) : (
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: configItem.color }}
                    />
                  )}
                  <span>{configItem.label}</span>
                </div>
                <div className="font-medium">
                  {formatter && item.value !== undefined
                    ? formatter(item.value, dataKey, item)
                    : item.value}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function ChartTooltip(props: TooltipProps<any, any>) {
  return <ChartTooltipContent {...props as any} />
} 