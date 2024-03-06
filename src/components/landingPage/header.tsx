import Image from "next/image";

export default function Header() {
    return (
      <div className="flex flex-row justify-center w-full">
        <div className="overflow-hidden w-[400px] h-[450px] relative">
          <div className="h-[342px] top-[70px] absolute w-[368px] left-[16px]">
          <Image
            className="absolute w-[368px] h-[297px] top-0 left-0 object-cover"
            width={368}
            height={297}
            alt={'Logo Mulher Lendo'}
            src={'/img/foto-header.png'}
          />
          <div className="absolute w-[318px] h-[81px] top-[195px] left-0 bg-[#E6C6C8]" />
          <div className="absolute w-[284px] top-[203px] left-[17px] [font-family:'Inter-Bold',Helvetica] font-bold text-gray-800 text-[24px] tracking-[0] leading-[normal]">
            RETIRO DE <br />
            MULHERES 2023
          </div>
          </div>
        </div>
      </div>
    );
}