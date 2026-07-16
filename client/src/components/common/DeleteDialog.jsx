import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function DeleteDialog({
  trigger,
  title = "Delete Item",
  description = "This action cannot be undone.",
  onConfirm,
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-3xl border-0 shadow-2xl">

        <AlertDialogHeader>

          <AlertDialogTitle className="text-xl font-bold text-slate-800">
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-slate-500 leading-relaxed">
            {description}
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2">

          <AlertDialogCancel className="rounded-xl">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-xl bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}