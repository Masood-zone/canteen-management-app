import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GoBackButton() {
  const navigate = useNavigate();
  return (
    <div className="mx-5 space-x-2">
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full"
        onClick={() => navigate(-1)}
      >
        <ChevronLeftIcon size={24} />
      </Button>
      <span className="text-base font-normal">Go back</span>
    </div>
  );
}
