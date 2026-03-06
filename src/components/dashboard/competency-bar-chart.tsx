"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import type { CompetencyChartData } from "@/lib/types";

function CustomTooltip({ active, payload, label }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;
  const score = payload.find((p) => p.dataKey === "averageScore");
  const bench = payload.find((p) => p.dataKey === "benchmark");
  const scoreVal = Number(score?.value ?? 0);
  const benchVal = Number(bench?.value ?? 0);
  const delta = scoreVal - benchVal;

  return (
    <div className="rounded-lg border border-border/60 bg-background p-3 text-sm shadow-sm min-w-[180px]">
      <p className="font-medium mb-2">{label}</p>
      <div className="space-y-1">
        <p className="flex justify-between text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "var(--chart-1)" }} />
            Cohort Avg
          </span>
          <span className="font-mono font-medium text-foreground">{scoreVal.toFixed(1)}%</span>
        </p>
        <p className="flex justify-between text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "var(--chart-4)" }} />
            Benchmark
          </span>
          <span className="font-mono font-medium text-foreground">{benchVal.toFixed(1)}%</span>
        </p>
        <p className={`text-xs font-medium mt-1 ${delta >= 0 ? "text-success" : "text-destructive"}`}>
          {delta >= 0 ? "+" : ""}{delta.toFixed(1)}pp vs benchmark
        </p>
      </div>
    </div>
  );
}

interface Props {
  data: CompetencyChartData[];
}

export function CompetencyBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 48, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.5} horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <YAxis
          type="category"
          dataKey="category"
          width={130}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={(props) => <CustomTooltip {...props} />} cursor={{ fill: "var(--surface-hover)" }} />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: "8px" }}
          formatter={(value) => value === "averageScore" ? "Cohort Avg" : "Benchmark"}
        />
        <Bar dataKey="averageScore" name="averageScore" radius={[0, 4, 4, 0]} maxBarSize={20}>
          {data.map((entry, index) => {
            const aboveBench = entry.averageScore >= entry.benchmark;
            return (
              <Cell
                key={`cell-${index}`}
                fill={aboveBench ? "var(--chart-1)" : "var(--chart-3)"}
                fillOpacity={0.85}
              />
            );
          })}
        </Bar>
        <Bar dataKey="benchmark" name="benchmark" fill="var(--chart-4)" fillOpacity={0.4} radius={[0, 4, 4, 0]} maxBarSize={6} />
      </BarChart>
    </ResponsiveContainer>
  );
}
