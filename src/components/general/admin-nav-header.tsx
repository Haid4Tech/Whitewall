"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface IAdminNavHeader {
  header: string;
}

const AdminNavHeader: FC<IAdminNavHeader> = ({ header }) => {
  const router = useRouter();
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="mx-auto sm:px-6">
        <div className="flex flex-row h-16 items-center gap-5 w-full">
          <Button
            variant="secondary"
            onClick={() => router.back()}
            className="flex items-center gap-2 hover:shadow-md"
          >
            <ArrowLeft size={15} />
            Back
          </Button>
          <p className="m-[4rem] md:m-[8rem] lg:m-[15rem] text-base md:text-xl font-semibold text-gray-900">
            {header}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminNavHeader;
