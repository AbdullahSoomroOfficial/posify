import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function BackButton() {
  const navigate = useNavigate();
  return (
    <Button variant="outline" onClick={() => navigate(-1)}>
      Back
    </Button>
  );
}
