import { FC } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IAvatarProfile {
  profileImage: string | undefined;
  initials: string;
  classname?: string;
}

const AvatarProfile: FC<IAvatarProfile> = ({
  profileImage,
  initials,
  classname,
}) => {
  return (
    <Avatar
      className={cn("border border-neutral-500 bg-primary-50", classname)}
    >
      <AvatarImage
        className={"object-cover object-center"}
        src={profileImage ?? ""}
        alt="user profile image"
      />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarProfile;
