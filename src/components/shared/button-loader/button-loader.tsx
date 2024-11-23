import { Loader2 } from "lucide-react";

export default function ButtonLoader({
  isPending,
  loadingText,
  fallback,
}: {
  isPending: boolean;
  loadingText?: string;
  fallback: string;
}) {
  return (
    <>
      {isPending ? (
        <span className="flex items-center">
          <Loader2 className="animate-spin mr-2" />
          {loadingText}
        </span>
      ) : (
        <span>{fallback}</span>
      )}
    </>
  );
}
