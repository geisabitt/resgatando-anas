import { getApiDocs } from "../../../lib/swagger";
import ReactSwagger from "./reactSwagger";

export default async function IndexPage(){
    const spec = await getApiDocs();
    return (
        <section className="">
            <ReactSwagger spec={spec}/>
        </section>
    )
}