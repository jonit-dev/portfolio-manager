import { JSX } from 'react';
import { IHistoricalData } from '../../types';

interface ISparklineProps {
  data: IHistoricalData[];
  width?: number;
  height?: number;
}

function generateSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';

  const first = points[0];
  let path = `M ${first.x},${first.y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const controlX = (current.x + next.x) / 2;

    path += ` C ${controlX},${current.y} ${controlX},${next.y} ${next.x},${next.y}`;
  }

  return path;
}

export function Sparkline({ data, width = 120, height = 32 }: ISparklineProps): JSX.Element {
  if (data.length < 2) return <div className="h-[32px]" />;

  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;

  // Create points for the sparkline
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((d.value - min) / range) * height,
  }));

  // Create path for the gradient fill
  const fillPath = generateSmoothPath(points) + ` L ${width},${height} L 0,${height} Z`;

  // Determine if trend is positive
  const isPositive = data[data.length - 1].value >= data[0].value;
  const colorClass = isPositive ? 'text-green-500' : 'text-red-500';
  const gradientColor = isPositive ? '#22c55e' : '#ef4444';

  // Calculate percentage change
  const percentageChange = (
    ((data[data.length - 1].value - data[0].value) / data[0].value) *
    100
  ).toFixed(1);

  return (
    <div className="flex items-center gap-2">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient
            id={`sparkline-gradient-${isPositive ? 'up' : 'down'}`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop offset="0%" stopColor={gradientColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor={gradientColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={fillPath}
          fill={`url(#sparkline-gradient-${isPositive ? 'up' : 'down'})`}
          className={colorClass}
        />
        <path
          d={generateSmoothPath(points)}
          fill="none"
          strokeWidth="1.5"
          className={`${colorClass} stroke-current`}
        />
      </svg>
      <span className={`text-xs font-medium ${colorClass}`}>
        {isPositive ? '+' : ''}
        {percentageChange}%
      </span>
    </div>
  );
}
