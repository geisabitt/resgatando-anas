// import InfoUser from "@/components/InfoUser";

export default function PortalUserDetail({params}:{
    params:{id:string}
}){
    return (
        <div>
          <h1>Detalhes do Usuário</h1>
          <h1>{params.id}</h1>
          {/* <InfoUser id={params.id} /> */}
        </div>
      )
    }