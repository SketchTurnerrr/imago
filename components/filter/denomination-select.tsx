import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function DenominationSelect() {
  return (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Оберіть конфесію' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='Католізм'>Католізм</SelectItem>
          <SelectItem value="Православ'я">Православ&apos;я</SelectItem>
          <SelectItem value='Євангелізм'>Євангелізм</SelectItem>
          <SelectItem value='Баптизм'>Баптизм</SelectItem>
          <SelectItem value="П'ятидесятництво">
            П&apos;ятидесятництво
          </SelectItem>
          <SelectItem value='Неконфесійна'>Неконфесійна</SelectItem>
          <SelectItem value='Інше'>Інше</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
