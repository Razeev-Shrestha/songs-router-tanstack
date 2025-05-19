import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Icon } from "./icon";

type ModalDialogProps = {
  open: boolean;
  onOpenStateChange: (val: boolean) => void;
  children: ReactNode;
  form: string;
  onCancelTrigger?: () => void;
  isPending: boolean;
  title: string;
  description: string;
};

export const ModalDialog = ({
  open,
  onOpenStateChange,
  children,
  form,
  onCancelTrigger,
  isPending,
  title,
  description,
}: ModalDialogProps) => {
  const router = useRouter();

  const onCancel = () => {
    onCancelTrigger?.();
    router.history.back();
  };

  return (
    <Dialog open={open} modal onOpenChange={onOpenStateChange}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button variant={"outline"} onClick={onCancel}>
            Cancel
          </Button>
          <Button
            form={form}
            disabled={isPending}
            className="flex gap-2 items-center"
          >
            Save{" "}
            {isPending && (
              <Icon icon="loader" className={isPending ? "animate-spin" : ""} />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
