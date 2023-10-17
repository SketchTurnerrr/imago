import { cn } from '@/lib/utils';
import { TwoThumbSlider } from '@/components/ui/two-thumb-slider';

type SliderProps = React.ComponentProps<typeof TwoThumbSlider>;

export function AgeSlider({ className, ...props }: SliderProps) {
  return (
    <TwoThumbSlider
      defaultValue={[18, 24]}
      max={100}
      step={1}
      min={0}
      className={cn('w-[100%] ', className)}
      {...props}
    />
  );
}
