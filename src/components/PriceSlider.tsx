import * as Slider from "@radix-ui/react-slider";

interface PriceSliderProps {
  minPrice: number;
  maxPrice: number;
  onChange: (v: number[]) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({
  minPrice,
  maxPrice,
  onChange,
}) => {
  return (
    <Slider.Root
      min={0}
      max={10000000}
      step={50000}
      value={[minPrice, maxPrice]}
      onValueChange={(v) => onChange(v as number[])}
      className="relative flex items-center w-full h-5 -mt-2"
    >
      <Slider.Track className="relative h-1 w-full bg-neutral-200 rounded-full">
        <Slider.Range className="absolute h-full bg-neutral-900 rounded-full" />
      </Slider.Track>

      <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-neutral-900 rounded-full" />
      <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-neutral-900 rounded-full" />
    </Slider.Root>
  );
};

export default PriceSlider;
