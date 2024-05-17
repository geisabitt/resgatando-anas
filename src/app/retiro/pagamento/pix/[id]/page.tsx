import { PageQrCodePix }  from "@/payments/components/qrCodePix";
import ServicePayment from "@/payments/services/paymentServices";

export default async function Page({ params }: Readonly<{ params: { id: any } }>) {
    const id = params.id
    const data = await ServicePayment.getInfoPayment(id)
    if (data) console.log(data);

    return(
        <div className="flex flex-col items-center p-4">
            <PageQrCodePix detail={data.detail} />
            </div>
        )
    }