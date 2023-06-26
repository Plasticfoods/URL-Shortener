import Shortener from "./Shortener"
import CallToAction from "./CallToAction"

export default function Main() {
    return <main>
        <Shortener />
        <section className="stats pb-11 lg:pb-12">
            <h3 className="title pb-2">Advanced Statistics</h3>
            <p className="subtitle">Track how many clicks your shortened URLs receive and measure their performance.</p>
        </section>
        <CallToAction />
    </main>
}