import { IMessage } from "@/types";
import { cn } from "@/lib/utils";

interface MessageProps {
  message: IMessage;
  isCurrentUser: boolean;
}

export function MessageComponent({ message, isCurrentUser }: MessageProps) {
  return (
    <div
      className={cn(
        "flex w-full gap-2 p-4",
        isCurrentUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <Image className="h-8 w-8">
        <AvatarImage
          src={message.sender_id.photos?.[0]?.url}
          alt={message.sender_id.name}
        />
        <AvatarFallback>
          {message.sender_id.name?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Image>

      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3",
          isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}
