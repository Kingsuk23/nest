type PriceHistogramDataType = {
  active: boolean;
  price: number;
  home: number;
};

interface PriceHistogramProps {
  data: PriceHistogramDataType[];
}

const PriceHistogram: React.FC<PriceHistogramProps> = ({ data }) => {
  const max = () => Math.max(...data.map((d) => d.home));

  const height = 100;
  const barWidth = 70 / data.length;

  return (
    <svg
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      className="w-full h-25"
    >
      {data.map((d, i) => {
        const barHeight = (d.home / max()) * height;
        const x = i * barWidth;
        const y = height - barHeight;
        const w = barWidth - 1;
        const r = 2;

        return (
          <path
            key={i}
            d={`M${x},${height} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${height} Z`}
            fill={d.active ? "#101423" : "#dce0ef"}
          />
        );
      })}
    </svg>
  );
};

export default PriceHistogram;
