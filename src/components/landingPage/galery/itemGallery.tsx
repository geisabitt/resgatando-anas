import Image from "next/image";

interface GalleryItemProps {
    imageUrl: string;
    onClick: () => void;
}
export default function ItemGallery({ imageUrl, onClick }: GalleryItemProps) {
    return (
        <div onClick={onClick}>
          <Image className="rounded-[10px]" width={92} height={92} src={imageUrl} alt="Gallery Item" />
        </div>
      );
    }
