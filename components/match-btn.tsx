import { useRef, useState } from "react";
import { Button } from "./ui/button";
import MatchIcon from "@/public/hand-waving.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import Image from "next/image";
import { Textarea } from "./ui/textarea";

export function MatchBtn({ like }: { like: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  if (!like) return null;

  const gender = like.sender.gender === "male" ? "вподобав" : "вподобала";
  const type = like.photo ? "фото" : "відповідь";
  const conjunction = like.photo ? "ваше " : "вашу ";

  const receiverId = like.sender.id!;
  console.log("receiverId :", receiverId);
  const likeId = like.id;
  console.log("likeId :", like);

  const handleMatch = async () => {
    const comment = commentRef.current?.value || ""; // Get the value from the ref
    try {
      setIsOpen(false);
      // Here you could navigate to the new conversation if you want
      // router.push(`/conversations/${conversationId}`);
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <>
      <Button
        className="h-14 w-14 rounded-full"
        size="icon"
        onClick={() => setIsOpen(true)}
      >
        <MatchIcon />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[340px] rounded-md lg:max-w-lg">
          <DialogHeader>
            <DialogTitle>{like?.sender.name}</DialogTitle>
            <DialogDescription>
              Цей користувач {gender} {conjunction}
              {type}. Хочете створити метч?
            </DialogDescription>
          </DialogHeader>

          {like?.sender.profilePicture && (
            <div className="relative h-80">
              <Image
                priority
                src={like.sender.profilePicture}
                alt={like.sender.name || "alt"}
                layout="fill"
                className="aspect-square rounded-lg object-cover"
              />
            </div>
          )}

          <Textarea
            placeholder="Залишити коментар (необов'язково)"
            ref={commentRef}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Скасувати
            </Button>
            <Button onClick={handleMatch}>Познайомитися</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
