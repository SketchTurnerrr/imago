'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

const TwoThumbSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className='relative h-1.5 w-full grow overflow-hidden rounded-full bg-accent'>
      <SliderPrimitive.Range className='absolute h-full bg-purple-300' />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className='block h-4 w-4 rounded-full border border-primary/30 bg-background shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' />
    <SliderPrimitive.Thumb className='block h-4 w-4 rounded-full border border-primary/30 bg-background shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' />
  </SliderPrimitive.Root>
));
TwoThumbSlider.displayName = SliderPrimitive.Root.displayName;

export { TwoThumbSlider };
