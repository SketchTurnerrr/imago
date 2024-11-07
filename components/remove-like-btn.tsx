import { X } from "lucide-react";
import { Button } from "./ui/button";

export function RemoveLikeBtn({
  currentUserId,
  itemId,
}: {
  currentUserId: string;
  itemId: string;
}) {
  const handleRemoveLike = () => {};

  return (
    <Button
      onClick={handleRemoveLike}
      className="h-14 w-14 rounded-full"
      size="icon"
    >
      <X className="h-8 w-8" />
    </Button>
  );
}
