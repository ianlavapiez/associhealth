"use client";

import { useEffect } from "react";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

export default function Page() {
  // Set dynamic page title
  useEffect(() => {
    document.title = "Home - Associhealth Dentistry";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-svh bg-background">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Hello World</h1>
        <Button size="sm">Button</Button>
        <Input />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
