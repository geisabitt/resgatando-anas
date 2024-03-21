import Image from "next/image";
import ButtonRegistro from "./buttonRegistro";
export default function Header() {
    return (
      <>
      <div className="flex flex-col gap-4 items-center md:flex-row md:p-4 mx-auto my-auto">
        <Image
            className="md:fixed md:top-2 md:left-4 md:z-50 md:w-12"
            width={100}
            height={98}
            alt={'Logo Resgatando Anas Você é Terra Fértil'}
            src={'/img/LogoResgatandoAnas.png'}
          />
      <div className="flex flex-row justify-center w-full">
        <div className="overflow-hidden w-[295px] h-[236px] relative">
          <div>
          <Image
            className="absolute w-[295px] h-[236px] top-0 left-0 object-cover"
            width={295}
            height={297}
            alt={'Logo Mulher Lendo'}
            src={'/img/foto-header.png'}
          />
          <div className="absolute w-[252px] h-[64px] top-[90px] left-0 bg-primary" />
          <div className="absolute w-[254px] top-[95px] left-[17px] font-bold text-gray-800 text-[1rem]">
            RETIRO DE <br />
            MULHERES 2023
          </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:w-auto p-4">
        <h3 className="text-right md:text-left font-bold text-[1rem] -mt-6 pr-4">Tema: Descendo do Salto</h3>
        <p className="text-justify">
        Reserve um tempo para si mesma e entre em um espaço de cura e crescimento. Descendo do Salto é mais do que um evento; é um convite para se conectar consigo mesma, elevar sua autoestima e se cercar de apoio. Independentemente de onde você esteja em sua jornada, este retiro foi criado com você em mente.
        </p>
        <ButtonRegistro/>
      </div>
      </div>
      <p className="mx-auto my-auto py-4 md:w-auto p-4 text-justify">
      Junte-se a nós em um retiro transformador, mergulhando em um ambiente acolhedor e enriquecedor, especialmente projetado para mulheres como você. Descendo do Salto é mais do que um evento; é um convite para cuidar da sua saúde emocional, enquanto compartilha experiências valiosas e encontra apoio em uma comunidade acolhedora. Vamos juntas descer do salto e caminhar para uma vida mais plena e autêntica!
      </p>
      </>
    );
}