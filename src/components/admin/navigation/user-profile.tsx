"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import AvatarProfile from "@/components/general/avatar-profile";
// import { toast } from "sonner";
import { logoutUser } from "@/firebase/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingSpinner from "@/components/ui/loading-spinner";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      router.push("/admin");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Error loging out ", error as string);
    }
  };

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
            <Button className="h-fit flex flex-row gap-1 h-5" variant="ghost">
              <p className={"ml-[-10px] text-[10px] font-light text-nowrap"}>
                {role}
              </p>
              <ChevronDown size={15} className={""} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-5 bg-white">
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogOut}>
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <p className={"text-xs font-semibold"}>{"Log Out"}</p>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserProfile;
