import { Cross1Icon } from '@radix-ui/react-icons';
import { Button } from './ui/button';

export function SkipProfileBtn({ profileId }: { profileId: string }) {
  return (
    <Button
      variant='outline'
      size='icon'
      className='rounded-full w-12 h-12 fixed bottom-4 bg-white'
    >
      <Cross1Icon className='w-6 h-6' />
    </Button>
  );
}
