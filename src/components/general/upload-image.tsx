"use client";

import { FC, useRef, useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";

interface IUploadImage {
  onFileSelect: (file: File) => void;
}

const UploadImage: FC<IUploadImage> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate image types
    if (!/image\/(png|jpeg|gif)/.test(file.type)) {
      alert("Only PNG, JPG and GIF files are allowed");
      return;
    }

    setFileName(file?.name);
    setPreviewUrl(URL.createObjectURL(file));
    onFileSelect(file); // pass file to parent
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={"grid md:grid-cols-2 gap-3"}>
      <div className={"grid md:grid-cols-2 gap-2 bg-white rounded-lg p-5"}>
        <div
          onClick={triggerFileInput}
          className={
            "cursor-pointer hover:shadow-md flex flex-col items-center justify-center gap-2 p-2 border-2 border-dashed border-gray-300 rounded-lg"
          }
        >
          <Upload />
          <div>
            {fileName ? (
              <div className="p-2 break-words w-28 truncate">
                <span className="text-xs">{fileName}</span>
              </div>
            ) : (
              <>
                <p className={"text-sm font-bold"}>Upload Files</p>
                <p className={"text-xs"}>PNG, JPG and GIF files are allowed</p>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className={"self-center"}>
          <p className={"text-sm font-bold"}>Profile Picture</p>
          <p className="text-xs">
            Input a profile picture that best represents who you are
          </p>
        </div>
      </div>
      <div className={"relative grid grid-row-4 h-80 md:h-full"}>
        <div className={"rounded-t-lg bg-[#FEE0FF] p-5"} />
        <div className={"bg-[#E1B3E3] p-5"} />
        <div className={"bg-[#C283C5] p-5"} />
        <div className={"rounded-b-lg bg-[#9D639F] p-5"} />
        <div className={"absolute bottom-[20%] left-[30%] md:left-5"}>
          <Image
            src={"/climb.png"}
            alt={"climb illustration"}
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
