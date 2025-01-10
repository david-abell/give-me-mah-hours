"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  text: string;
}

function CopyableTextField({ text }: Props) {
  const { toast } = useToast();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "Successfully coppied mah hours.",
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast({
        title: "Failed to copy text",
        description: "Where are mah hours?",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 border rounded-md">
      <span className="flex-1 truncate">{text}</span>
      <Button
        onClick={handleCopy}
        variant="outline"
        className="flex items-center gap-1"
      >
        <Copy size={16} />
        Copy
      </Button>
    </div>
  );
}

export default CopyableTextField;
