import { cn } from "@/lib/utils";

export default function Pill({
  text,
  style,
  textColor,
}: {
  text: string;
  style?: string;
  textColor?: string;
}) {
  return (
    <div className={cn("rounded-full w-fit py-2 px-5 bg-gray-200", style)}>
      <p className={cn("text-sm font-semibold", textColor)}>{text}</p>
    </div>
  );
}
