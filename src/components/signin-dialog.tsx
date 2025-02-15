import { LogInIcon } from "lucide-react";

import { SignInForm } from "@/components/signin-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SignInDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <span className="hidden md:block">fazer login</span>
          <LogInIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>fazer login</DialogTitle>
          <DialogDescription>
            Entre com a sua conta para ver os seus resultados.
          </DialogDescription>
        </DialogHeader>

        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}
