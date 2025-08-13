import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface PromptInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function PromptInput({ onSend, disabled }: PromptInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 p-4 border-t">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        className="min-h-[60px] resize-none"
        disabled={disabled}
      />
      <Button
        onClick={handleSend}
        disabled={!input.trim() || disabled}
        size="icon"
        className="h-[60px] w-12 shrink-0"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
