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
        <ScrollArea id='galeria' className="w-[100%] max-h-[290px] py-4 pl-4 overflow-auto">
            <div className="flex gap-2 flex-row">
            <div>
              <div className='flex flex-col justify-center pl-[70px]'>
                <div className="flex gap-2 ">
                {/* <FaArrowRight className="mt-2 transform rotate-180"/> */}
                <div className="mx-6 text-center">
                <h6 className='font-bold'>Galeria 2021</h6>
                <p>Raízes curadas</p>
                </div>
                <FaArrowRight className="mt-2" />
                </div>
              </div>
            <AllGallery images={images2021} />
            </div>
            <div>
            <div className='flex flex-col justify-center pl-[70px]'>
                <div className="flex gap-2 ">
                <FaArrowRight className="mt-2 transform rotate-180"/>
                <div className="text-center">
                <h6 className='font-bold'>Galeria 2022</h6>
                <p>Floresça</p>
                </div>
                {/* <FaArrowRight className="mt-2" /> */}
                </div>
              </div>
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
