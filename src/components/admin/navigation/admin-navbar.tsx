import { FC } from "react";
import UserProfile from "./user-profile";
import Image from "next/image";

interface IAdminNavBar {
  pageTitle: string;
}

const AdminNavBar: FC<IAdminNavBar> = ({ pageTitle }) => {
  const firstInitials = "Angie";
  const lastInitials = "Angie";

  return (
    <div className="flex items-center justify-between gap-4 w-full px-4 py-3 bg-white">
      <div className="w-full flex items-center gap-6">
        <div>
          <Image
            priority
            width={80}
            height={80}
            src="/wh_logo.webp"
            alt="Logo"
            className={"w-30 h-15"}
          />

          <p className="font-bold text-lg uppercase">{pageTitle}</p>
        </div>
      </div>

      <UserProfile
        fullName={"USERNAME"}
        role={"Admin"}
        profileImage={undefined}
        initials={`${firstInitials}.${lastInitials}`}
      />
    </div>
  );
};

export default AdminNavBar;
