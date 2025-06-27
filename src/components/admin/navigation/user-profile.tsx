"use client";

import { FC } from "react";
import { ChevronDown } from "lucide-react";
import AvatarProfile from "@/components/general/avatar-profile";
// import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IUserProfile {
  fullName: string;
  role: string;
  profileImage?: string;
  initials?: string;
}

const UserProfile: FC<IUserProfile> = ({
  fullName,
  role,
  profileImage,
  initials,
}) => {
  const handleLogOut = () => {};
  return (
    <div className={"flex flex-row items-center w-fit gap-2 pr-3"}>
      <AvatarProfile
        classname={"w-10 h-10"}
        profileImage={profileImage}
        initials={initials ?? "S.A"}
      />
      <div className={"flex flex-col"}>
        <span className={"text-sm font-semibold uppercase"}>{fullName}</span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex flex-row gap-1 h-3" variant="ghost">
              <span className={"ml-[-10px] text-[10px] font-light text-nowrap"}>
                {role}
              </span>
              <ChevronDown size={15} className={""} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-5">
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogOut}>
              <span className={"text-xs font-semibold"}>{"Log Out"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserProfile;
