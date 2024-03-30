import { getApiDocs } from "../../../lib/swagger";
import ReactSwagger from "./reactSwagger";

export default async function Page(){
    const spec = await getApiDocs();
    return <ReactSwagger spec={spec}/>
}