"use client";

import { FC } from "react";
import { useMainContext } from "@/components/provider/main-provider";
import Link from "next/link";
import UserProfile from "./user-profile";
import Image from "next/image";

interface IAdminNavBar {
  pageTitle: string;
}

const AdminNavBar: FC<IAdminNavBar> = ({ pageTitle }) => {
  const { user } = useMainContext();

  return (
    <div className="flex items-center justify-between gap-4 w-full px-4 py-3 bg-white">
      <div className="w-full flex items-center gap-6">
        <div>
          <Link href={"/"}>
            <Image
              priority
              width={80}
              height={80}
              src="/wh_logo.webp"
              alt="Logo"
              className={"w-30 h-15"}
            />
          </Link>

          <p className="font-bold text-lg uppercase">{pageTitle}</p>
        </div>
      </div>

      <UserProfile
        fullName={`${user?.firstName ?? "USER"}`}
        role={"Admin"}
        profileImage={user?.profile}
        initials={`${user?.firstName}.${user?.lastName}`}
      />
    </div>
  );
};

export default AdminNavBar;
