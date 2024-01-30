import Image from "next/image";

export default function Header() {
    return (
        <>
    <div className="flex flex-row justify-center w-full">
      <div className="overflow-hidden w-[400px] h-[450px] relative">
        <div className="h-[342px] top-[70px] absolute w-[368px] left-[16px]">
          <Image
            className="absolute w-[368px] h-[297px] top-0 left-0 object-cover"
            width={368}
            height={297}
            alt={'Logo Mulher Lendo'}
            src={'https://github.com/geisabitt/resgatando-anas/blob/main/public/img/foto-header.png'}
          />
          <div className="absolute w-[318px] h-[81px] top-[195px] left-0 bg-[#ffa621bf]" />
          <div className="absolute w-[284px] top-[203px] left-[17px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[24px] tracking-[0] leading-[normal]">
            RETIRO DE <br />
            MULHERES 2023
          </div>
        </div>
      </div>
    </div>
            {/* <div className="p-4 mx-auto my-auto relative -z-2"><Image width={370} height={295} src={"/img/foto-header.png"} alt={"Imagem mulher lendo"}/><div className="absolute -mt-20 px-10"><div className="bg-primary">Retiro de <span className="block">mulheres 2024</span></div></div></div> */}
        </>
    );
}