"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import type { MonthlyCompletionData } from "@/lib/types";

function CustomTooltip({ active, payload, label }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-background p-3 text-sm shadow-sm">
      <p className="font-medium mb-1.5">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-muted-foreground flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: String(entry.color) }}
          />
          {entry.name === "completions" ? "Completions" : "Avg Score"}:{" "}
          <span className="font-mono font-medium text-foreground">
            {entry.name === "averageScore"
              ? `${Number(entry.value).toFixed(1)}%`
              : entry.value}
          </span>
        </p>
      ))}
    </div>
  );
}

interface Props {
  data: MonthlyCompletionData[];
  showScore: boolean;
}

export function CompletionsChart({ data, showScore }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 4, right: 12, bottom: 0, left: -8 }}>
        <defs>
          <linearGradient id="fillCompletions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.25} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.22} />
            <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.6} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="completions"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={28}
        />
        {showScore && (
          <YAxis
            yAxisId="score"
            orientation="right"
            domain={[60, 80]}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            width={32}
            tickFormatter={(v) => `${v}%`}
          />
        )}
        <Tooltip content={(props) => <CustomTooltip {...props} />} />
        <Area
          yAxisId="completions"
          type="monotone"
          dataKey="completions"
          name="completions"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fill="url(#fillCompletions)"
          dot={{ r: 3, fill: "var(--chart-1)", strokeWidth: 0 }}
          activeDot={{ r: 5, fill: "var(--chart-1)" }}
        />
        {showScore && (
          <Area
            yAxisId="score"
            type="monotone"
            dataKey="averageScore"
            name="averageScore"
            stroke="var(--chart-2)"
            strokeWidth={2}
            strokeDasharray="5 3"
            fill="url(#fillScore)"
            dot={false}
            activeDot={{ r: 4, fill: "var(--chart-2)" }}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
