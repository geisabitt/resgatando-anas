import AllGallery from './allGallery';
import { FaArrowRight } from "react-icons/fa";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const baseUrl = process.env.BASE_URL;
const images2021 = [
  `${baseUrl}/img/retiro2021/retiro2021-0001.jpg`,
  `${baseUrl}/img/retiro2021/retiro2021-0002.jpg`,
  `${baseUrl}/img/retiro2021/retiro2021-0003.jpg`,
  `${baseUrl}/img/retiro2021/retiro2021-0004.jpg`,
  `${baseUrl}/img/retiro2021/retiro2021-0005.jpg`,
  `${baseUrl}/img/retiro2021/retiro2021-0006.jpg`,
  `${baseUrl}/img/retiro2021/retiro2021-0007.jpg`,
  `${baseUrl}/img/retiro2021/retiro2021-0008.jpg`,
  `${baseUrl}/img/retiro2021/retiro2021-0009.jpg`,
  `${baseUrl}/img/retiro2021/retiro2021-0010.jpg`,
  `${baseUrl}/img/retiro2021/retiro2021-0011.jpg`,
  `${baseUrl}/img/retiro2021/retiro2021-0012.jpg`,
];
const images2022 = [
  `${baseUrl}/img/retiro2022/retiro2022-0001.jpg`,
  `${baseUrl}/img/retiro2022/retiro2022-0002.jpg`,
  `${baseUrl}/img/retiro2022/retiro2022-0003.jpg`,
  `${baseUrl}/img/retiro2022/retiro2022-0004.jpg`,
  `${baseUrl}/img/retiro2022/retiro2022-0005.jpg`,
  `${baseUrl}/img/retiro2022/retiro2022-0006.jpg`,
  `${baseUrl}/img/retiro2022/retiro2022-0007.jpg`,
  `${baseUrl}/img/retiro2022/retiro2022-0008.jpg`,
  `${baseUrl}/img/retiro2022/retiro2022-0009.jpg`,
  `${baseUrl}/img/retiro2022/retiro2022-0010.jpg`,
  `${baseUrl}/img/retiro2022/retiro2022-0011.jpg`,
  `${baseUrl}/img/retiro2022/retiro2022-0012.jpg`,
];
export default function Gallery() {
    return (
        <ScrollArea id='galeria' className="w-[100%] max-h-[290px] py-4 pl-4 rounded-md border overflow-auto">
            <div className="flex gap-2 flex-row">
            <div>
            <h3 className='flex items-center gap-2 pl-[102px] font-bold'>Galeria 2021 <FaArrowRight /></h3>
            <h4 className='pl-[102px]'>Raízes curadas</h4>
            <AllGallery images={images2021} />
            </div>
            <div>
            <h3 className='flex items-center gap-2 pl-[102px] font-bold'>Galeria 2022 {/*<FaArrowRight />*/}</h3>
            <h4 className='pl-[106px]'>Frutifique</h4>
            <AllGallery images={images2022} />
            </div>
            {/* <div>
            <h1 className='pl-[102px] py-2 font-bold'>Retiro 2023</h1>
            <AllGallery images={images} />
            </div> */}
            </div>

            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}
