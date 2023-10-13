import { uk } from 'date-fns/locale';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import format from 'date-fns/format';

export function TooltipTime({
  created_at,
  side,
}: {
  created_at: string;
  side?: string | undefined;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`${
              side === 'right' ? 'text-gray-50' : 'text-gray-400'
            } self-end text-xs`}
          >
            {format(new Date(created_at), 'hh:mm')}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className=''>
            {format(new Date(created_at), 'PPPP', { locale: uk })}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
