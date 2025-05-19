import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { DisclosureProps } from "@/hooks/use-disclosure";

type DeleteDialogProps = {
  disclosure: DisclosureProps;
  onCancel: () => void;
  onContinue: () => void;
  isPending: boolean;
};

export const DeleteDialog = ({
  disclosure,
  onCancel,
  onContinue,
  isPending,
}: DeleteDialogProps) => {
  return (
    <AlertDialog open={disclosure.isOpen} onOpenChange={disclosure.onToggle}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onContinue} disabled={isPending}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
