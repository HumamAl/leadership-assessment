"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import type { ScoreDistributionData } from "@/lib/types";

interface Props {
  data: ScoreDistributionData[];
}

// Color cells by score band
function bandColor(range: string): string {
  const lower = parseInt(range.split("–")[0] ?? range.split("-")[0], 10);
  if (lower < 65) return "oklch(0.577 0.245 27.325 / 0.65)";   // destructive tint
  if (lower < 75) return "oklch(0.55 0.15 170 / 0.65)";         // primary tint
  return "oklch(0.627 0.194 149.214 / 0.75)";                   // success tint
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  const count = payload[0]?.value ?? 0;
  return (
    <div className="bg-background border border-border/60 rounded-lg px-3 py-2 text-sm shadow-md">
      <p className="font-medium">{label}</p>
      <p className="text-muted-foreground">
        {count} respondent{count !== 1 ? "s" : ""}
      </p>
    </div>
  );
};

export default function ScoreHistogram({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 4, right: 4, left: -16, bottom: 4 }}
        barCategoryGap="20%"
      >
        <XAxis
          dataKey="range"
          tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
          allowDecimals={false}
          axisLine={false}
          tickLine={false}
          width={28}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(0 0 0 / 0.04)" }} />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell key={entry.range} fill={bandColor(entry.range)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
