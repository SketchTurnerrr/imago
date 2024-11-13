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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface IAlert {
  triggerName: string;
  alertTitle: string;
  alertDescription: string;
  conversationId: string;
  matchId: string;
}

export function AlertDialogDots({
  triggerName,
  alertTitle,
  alertDescription,
  conversationId,
  matchId,
}: IAlert) {
  const supabase = createClient();
  const router = useRouter();
  const endConversation = async () => {
    await supabase.from("conversations").delete().match({ id: conversationId });
    await supabase.from("matches").delete().eq("id", matchId);
    // console.log('participantId :', participantId);
    router.replace("/discover");
    // console.log('conversationId :', conversationId);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="px-2" variant="ghost">
          {triggerName}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xs place-items-center">
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center gap-4">
          <AlertDialogCancel className="mt-0">Скасувати</AlertDialogCancel>
          <AlertDialogAction onClick={endConversation}>
            Підтвердити
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
