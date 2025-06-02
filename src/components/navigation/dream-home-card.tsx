import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";

export const DreamHome = () => {
  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-3 items-center justify-between bg-gray-600">
      <div className={"col-span-2 flex flex-col gap-3"}>
        <p className="text-5xl font-bold text-white">
          Looking for a dream home?
        </p>
        <p>We can help you realize your dream of a new home</p>
      </div>
      <div>
        <Button className="flex flex-row gap-4 items-center">
          <p>Explore Properties</p>
          <MoveRight />
        </Button>
      </div>
    </div>
  );
};
