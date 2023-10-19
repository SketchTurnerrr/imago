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
  const [age, setAge] = useState<number[]>([17, 24]);

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
          <SheetTitle className='font-bold'>Фільтри</SheetTitle>
          <SheetDescription>
            Тут ви можете обрати, які саме профілі ви хочете бачити
          </SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          <div className='flex flex-col gap-4'>
            <Label htmlFor='deno' className='font-semibold'>
              Конфесія
            </Label>
            <DenominationSelect />
          </div>
          <div className='flex flex-col gap-4'>
            <Label htmlFor='max-distance' className='font-semibold'>
              Максимальна дистанція{' '}
              <span className='text-lg text-slate-500'>{maxDist} км</span>
            </Label>
            <DistanceSlider
              value={maxDist}
              onValueChange={(e) => onDistChange(e)}
            />
          </div>
          <div className='flex flex-col gap-4'>
            <Label htmlFor='age-distance' className='font-semibold'>
              Вік{' '}
              <span className='text-lg text-slate-500'>
                {age[0]}-{age[1]}
              </span>
            </Label>
            <AgeSlider onValueChange={(e) => onAgeChange(e)} />
          </div>
        </div>
        <SheetFooter className='mt-4'>
          <SheetClose asChild>
            <Button type='submit'>Зберегти</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}