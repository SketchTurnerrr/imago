"use client";
import { usePathname } from "next/navigation";
import { LikeDialog } from "./like-dialog";

interface IPrompt {
  question: string | null;
  answer: string | null;
  id: string;
  liker: string;
  likee: string;
}

export function Prompt({ question, answer, id, liker, likee }: IPrompt) {
  const pathname = usePathname();

  return (
    <div className="relative space-y-4 rounded-lg bg-secondary/75 px-4 py-16 md:w-[500px]">
      <p className="text-md font-semibold">{question}</p>
      <h2 className="text-3xl font-bold">{answer}</h2>
      {pathname === "/discover" && (
        <LikeDialog
          itemId={id}
          type="prompt"
          liker={liker}
          likee={likee}
          firstName={null}
          src={null}
          question={question}
          answer={answer}
        />
      )}
    </div>
  );
}
