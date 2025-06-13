"use client";

import { FC, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import AvatarProfile from "@/components/general/avatar-profile";
import { toast } from "sonner";
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
        <p className={"text-sm font-semibold uppercase"}>{fullName}</p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex flex-row gap-1 h-3" variant="outline">
              <p className={"ml-[-10px] text-[10px] font-light text-nowrap"}>
                {role}
              </p>
              <ChevronDown size={15} className={""} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-5">
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogOut}>
              <p className={"text-xs font-semibold"}>{"Log Out"}</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserProfile;
