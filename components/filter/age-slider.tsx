import { cn } from '@/lib/utils';
import { TwoThumbSlider } from '@/components/ui/two-thumb-slider';

type SliderProps = React.ComponentProps<typeof TwoThumbSlider>;

export function AgeSlider({ className, ...props }: SliderProps) {
  return (
    <TwoThumbSlider
      defaultValue={[17, 24]}
      min={17}
      max={50}
      minStepsBetweenThumbs={1}
      step={1}
      className={cn('w-[100%] ', className)}
      {...props}
    />
  );
}
