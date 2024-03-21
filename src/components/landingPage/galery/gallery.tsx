import AllGallery from './allGallery';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
const images = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  // Adicione mais URLs de imagem conforme necessário
];

export default function Gallery() {
    return (
        <ScrollArea className="w-[100%] max-h-[280px] py-4 pl-4 rounded-md border overflow-auto">
            <div className="flex flex-row">
            <div className='md:text-center'>
            <h1 className='pl-[102px] md:pl-0 py-2 font-bold'>Retiro 2021</h1>
            <AllGallery images={images} />
            </div>
            <div>
            <h1 className='pl-[102px] py-2 font-bold'>Retiro 2022</h1>
            <AllGallery images={images} />
            </div>
            <div>
            <h1 className='pl-[102px] py-2 font-bold'>Retiro 2023</h1>
            <AllGallery images={images} />
            </div>
            </div>

            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}
