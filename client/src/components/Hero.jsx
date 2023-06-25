import heroImage from '../images/illustration-working.svg'

export default function Main() {
    return <section className="hero">
        <div>
            <div className="site-desc">
                <h1 className="title">Make your URL easy to share</h1>
                <p className="subtitle">Shortening your URL makes it easier to share on social media, email, text messages and more. Try it out below and see for yourself.</p>
            </div>
            <picture className="hero-image">
                <img src={heroImage} alt="" />
            </picture>
        </div>
    </section>
}