import StatusMessage from "@/components/shared/status-message";
import { PageQrCodePix }  from "@/payments/components/qrCodePix";
import ServicePayment from "@/payments/services/paymentServices";

export default async function Page({ params }: Readonly<{ params: { id: any } }>) {

    const id = params.id
    const data = await ServicePayment.getInfoPayment(id)
    if(!data.detail.id){
        return <StatusMessage statusMessageProps={{
            title: "Erro no sistema",
            type: "error",
            message: "Não foi possivel carregar os dados do pagamento ou não encontramos no sistema."
        }}/>
    }

    return(
        <div className="flex flex-col items-center p-4">
            <PageQrCodePix detail={data.detail} />
            </div>
        )
    }