import * as React from "react"
import PaymentActions from "../actions/paymentActions"
export function ButtonPix() {
    return (
        <form className="w-full" action={PaymentActions.createPaymentPix}>
            <button type='submit' className="w-full py-4 rounded text-[1.125rem] text-center text-white font-bold bg-blue700">Comprar na promoção</button>
        </form>
    )
}
