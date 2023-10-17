import FilterIcon from '@/public/filter.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { DenominationSelect } from './denomination-select';
import { DistanceSlider } from './distance-slider';
import { useState } from 'react';
import { AgeSlider } from './age-slider';

export function Filter() {
  const [maxDist, setMaxDist] = useState<number[]>([50]);
  const [age, setAge] = useState<number[]>([15, 21]);

  const onDistChange = (dist: number[]) => {
    setMaxDist([dist[0]]);
  };

  const onAgeChange = (age: number[]) => {
    setAge([age[0], age[1]]);
  };

  console.log('maxDist :', maxDist);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost'>
          <FilterIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Фільтри</SheetTitle>
          <SheetDescription>
            Тут ви можете обрати, які саме профілі ви хочете бачити
          </SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          <div className='flex flex-col gap-4'>
            <Label htmlFor='deno' className='font-bold'>
              Конфесія
            </Label>
            <DenominationSelect />
          </div>
          <div className='flex flex-col gap-4'>
            <Label htmlFor='max-distance' className='font-bold'>
              Максимальна дистанція{' '}
              <span className='text-lg text-slate-500'>{maxDist} км</span>
            </Label>
            <DistanceSlider
              value={maxDist}
              onValueChange={(e) => onDistChange(e)}
            />
          </div>
          <div className='flex flex-col gap-4'>
            <Label htmlFor='age-distance' className='font-bold'>
              Вік{' '}
              <span className='text-lg text-slate-500'>
                {age[0]}-{age[1]}
              </span>
            </Label>
            <AgeSlider
              defaultValue={[17, 25]}
              min={17}
              max={50}
              onValueChange={(e) => onAgeChange(e)}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit'>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
