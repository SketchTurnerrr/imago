import React from "react";
import { Prompt } from "./prompt";
import { Button } from "@/components/ui/button";
import { PromptDialog } from "@/components/prompt-dialog";
import { ChevronRight } from "lucide-react";
import { useGetPrompts } from "@/hooks/usePrompt";

interface PromptManagerProps {
  onComplete: () => void;
  userId: string;
}

export function PromptManager({ onComplete, userId }: PromptManagerProps) {
  const { data: prompts } = useGetPrompts(userId);

  if (!prompts) {
    return null;
  }

  const isComplete = prompts.length === 3;

  return (
    <div className="flex h-full flex-col space-y-4">
      <h1 className="mb-4 mt-20 text-4xl font-bold">Додайте три фрази</h1>
      {prompts.map((prompt) => (
        <Prompt
          likee={prompt.profile_id}
          key={prompt.id}
          id={prompt.id}
          display={false}
          answer={prompt.answer}
          question={prompt.question}
        />
      ))}
      {prompts.length < 3 && <PromptDialog type="create" userId={userId} />}
      <p className="text-sm font-semibold text-gray-400">мінімум 3 фрази.</p>
      <Button
        onClick={onComplete}
        disabled={!isComplete}
        className="self-end"
        style={{ marginTop: "auto" }}
      >
        {isComplete
          ? "Далі"
          : `Додайте ще ${3 - prompts.length}  ${
              prompts.length === 2 ? " фразу" : " фрази"
            }`}

        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
