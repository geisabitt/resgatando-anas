import Image from "next/image";

interface GalleryItemProps {
    imageUrl: string;
    onClick: () => void;
}
export default function ItemGallery({ imageUrl, onClick }: Readonly<GalleryItemProps>) {
    return (
        <div onClick={onClick} className="w-24 h-24 overflow-hidden rounded-lg">
          <Image className="rounded-[10px] w-full h-full object-cover" width={92} height={92} src={imageUrl} alt="Gallery Item" />
        </div>
      );
    }
