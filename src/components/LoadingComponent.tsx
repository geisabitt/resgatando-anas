import Image from 'next/image';
export default function LoadingComponent(){
    return(
        <div className="absolute z-40 top-0 bottom-0 left-0 right-0 overflow-hidden">
            <div className="flex w-full h-full max-w-[100vw] max-h-[100vh] items-center justify-center overflow-hidden">
                <Image className='object-cover' src={`${process.env.BASE_URL_PRODUCION}/img/BgLoading.jpg`} alt='Imagen de Loading' width={360} height={740} layout="responsive" objectFit="cover"/>
                <div className="absolute z-50">
                    <div className="flex flex-col h-[80vh] items-center justify-between gap-6">
                        <Image className='' src={`/img/LogoResgatandoAnas.png`} alt='Imagen de Loading' width={230} height={215}/>
                        <h2 className="text-white pt-4 text-[1.5rem]">Retiro Descendo do salto</h2>
                            <div>
                            <svg
                            className="w-20 h-20 animate-spin fill-primary" width="95" height="96" viewBox="0 0 95 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32.2564 69.9484C34.062 71.818 35.0509 74.3283 35.0057 76.927C34.9604 79.5257 33.8847 82 32.0151 83.8056C30.1455 85.6112 27.6353 86.6002 25.0365 86.5549C22.4378 86.5097 19.9635 85.4339 18.1579 83.5643C16.3523 81.6948 15.3634 79.1845 15.4086 76.5858C15.4539 73.9871 16.5296 71.5127 18.3992 69.7072C20.2688 67.9016 22.779 66.9126 25.3778 66.9579C27.9765 67.0031 30.4508 68.0789 32.2564 69.9484ZM21.5248 37.6759C23.7817 40.0129 25.0179 43.1507 24.9614 46.3991C24.9048 49.6475 23.5601 52.7404 21.2232 54.9974C18.8862 57.2544 15.7484 58.4906 12.4999 58.434C9.25153 58.3774 6.15864 57.0328 3.90166 54.6958C1.64468 52.3588 0.408501 49.221 0.465066 45.9726C0.521625 42.7242 1.8663 39.6313 4.20326 37.3743C6.54023 35.1173 9.67807 33.8811 12.9265 33.9377C16.1749 33.9943 19.2678 35.3389 21.5248 37.6759ZM59.1737 80.1859C60.9793 82.0555 61.9682 84.5658 61.923 87.1645C61.8777 89.7632 60.802 92.2375 58.9324 94.0431C57.0628 95.8487 54.5526 96.8377 51.9538 96.7924C49.3551 96.7472 46.8808 95.6714 45.0752 93.8018C43.2696 91.9323 42.2807 89.422 42.3259 86.8233C42.3712 84.2246 43.4469 81.7502 45.3165 79.9447C47.1861 78.1391 49.6963 77.1501 52.2951 77.1954C54.8938 77.2406 57.3681 78.3164 59.1737 80.1859ZM81.3342 73.6411C82.6884 75.0433 83.4301 76.926 83.3962 78.875C83.3622 80.8241 82.5554 82.6798 81.1532 84.034C79.7511 85.3882 77.8684 86.1299 75.9193 86.096C73.9703 86.062 72.1145 85.2552 70.7603 83.853C69.4062 82.4509 68.6645 80.5682 68.6984 78.6191C68.7323 76.6701 69.5391 74.8143 70.9413 73.4601C72.3435 72.106 74.2262 71.3642 76.1752 71.3982C78.1243 71.4321 79.98 72.2389 81.3342 73.6411ZM38.5688 5.9494C40.8258 8.28637 42.0619 11.4242 42.0054 14.6726C41.9488 17.921 40.6041 21.0139 38.2672 23.2709C35.9302 25.5279 32.7924 26.764 29.544 26.7075C26.2955 26.6509 23.2027 25.3063 20.9457 22.9693C18.6887 20.6323 17.4525 17.4945 17.5091 14.2461C17.5656 10.9977 18.9103 7.90478 21.2473 5.6478C23.5843 3.39082 26.7221 2.15464 29.9705 2.2112C33.2189 2.26776 36.3118 3.61243 38.5688 5.9494ZM93.397 57.1274C94.2998 58.0621 94.7943 59.3173 94.7716 60.6167C94.749 61.916 94.2111 63.1532 93.2764 64.056C92.3416 64.9588 91.0864 65.4532 89.7871 65.4306C88.4877 65.408 87.2505 64.8701 86.3478 63.9353C85.445 63.0005 84.9505 61.7454 84.9731 60.446C84.9957 59.1467 85.5336 57.9095 86.4684 57.0067C87.4032 56.1039 88.6583 55.6095 89.9577 55.6321C91.257 55.6547 92.4942 56.1926 93.397 57.1274ZM78.4384 4.91094C81.1467 7.7153 82.6302 11.4807 82.5623 15.3788C82.4944 19.2769 80.8808 22.9884 78.0764 25.6967C75.2721 28.4051 71.5067 29.8885 67.6086 29.8206C63.7105 29.7528 59.999 28.1392 57.2907 25.3348C54.5823 22.5304 53.0989 18.765 53.1667 14.867C53.2346 10.9689 54.8482 7.25739 57.6526 4.54902C60.4569 1.84064 64.2223 0.357226 68.1204 0.425099C72.0185 0.492973 75.73 2.10658 78.4384 4.91094ZM93.3943 41.5575C93.8457 42.0249 94.093 42.6525 94.0817 43.3022C94.0703 43.9518 93.8014 44.5704 93.334 45.0218C92.8666 45.4732 92.2391 45.7204 91.5894 45.7091C90.9397 45.6978 90.3211 45.4289 89.8697 44.9615C89.4183 44.4941 89.1711 43.8665 89.1824 43.2168C89.1937 42.5672 89.4626 41.9486 89.93 41.4972C90.3974 41.0458 91.025 40.7986 91.6747 40.8099C92.3244 40.8212 92.9429 41.0901 93.3943 41.5575Z" fill="#E6C6C8"/>
                            </svg>
                            </div>
                        <h2 className="text-white pt-4 text-[1.5rem] animate-pulse">Carregando...</h2>
                        <h2 className="text-white pt-4 text-[1.2rem]">Comunidade Cristã Terra Fértil</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}