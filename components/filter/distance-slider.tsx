import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

type SliderProps = React.ComponentProps<typeof Slider>;

export function DistanceSlider({ className, ...props }: SliderProps) {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn('w-[100%] ', className)}
      {...props}
    />
  );
}
