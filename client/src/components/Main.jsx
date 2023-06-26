import Shortener from "./Shortener"
import CallToAction from "./CallToAction"
import {TiDeleteOutline} from "react-icons/ti"
import List from "./List"

export default function Main() {
    return <main>
        <Shortener />
        <List />
        <div className="flex justify-center">
            <TiDeleteOutline className="btn-cross" /> 
        </div>
        <section className="stats pb-11 lg:pb-12">
            <h3 className="title pb-2">Advanced Statistics</h3>
            <p className="subtitle">Track how many clicks your shortened URLs receive and measure their performance.</p>
        </section>
        <CallToAction />
    </main>
}

