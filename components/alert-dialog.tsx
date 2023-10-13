import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface IAlert {
  triggerName: string;
  alertTitle: string;
  alertDescription: string;
  participantId: string;
  conversationId: string;
}

export function AlertDialogDots({
  triggerName,
  alertTitle,
  alertDescription,
  participantId,
  conversationId,
}: IAlert) {
  const endConversation = async () => {
    const supabase = createClientComponentClient<Database>();

    await supabase
      .from('conversation_participants')
      .delete()
      .match({ conversation_id: conversationId, profile_id: participantId });
    // console.log('participantId :', participantId);
    // console.log('conversationId :', conversationId);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='' variant='ghost'>
          {triggerName}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='place-items-center max-w-xs'>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex gap-4 flex-row items-center'>
          <AlertDialogCancel className='mt-0'>Закрити</AlertDialogCancel>
          <AlertDialogAction onClick={endConversation}>
            Підтвердити
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
