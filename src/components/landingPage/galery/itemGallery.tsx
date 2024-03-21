"use client"
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from 'react';
interface GalleryItemProps {
    imageUrl: string;
    onClick: () => void;
}
export default function ItemGallery({ imageUrl, onClick }: Readonly<GalleryItemProps>) {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };
    return (
      <div onClick={onClick} className="w-24 h-24 overflow-hidden rounded-lg">
      {loading ? (
        <Skeleton className="h-[92px] w-[92px] rounded-xl"  />
      ) : (
        <Image
          className="rounded-[10px]"
          width={92}
          height={92}
          src={imageUrl}
          alt="Gallery Item"
          onLoad={handleImageLoad}
        />
      )}
    </div>
      );
    }
