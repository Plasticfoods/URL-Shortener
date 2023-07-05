import heroImage from '../images/illustration-working.svg'

export default function Main() {
    return <section className="hero py-6 lg:pt-7">
        <div className='hero-inner grid gap-7 lg:gap-0 grid-cols-1'>
            <picture className="hero-image pl-6 lg:pl-0">
                <img src={heroImage} alt="" />
            </picture>
            <div className="site-desc flex flex-col justify-center gap-6 lg:gap-5">
                <h1 className="title text-4xl text-center ">Make your URL easy to share</h1>
                <p className="subtitle">Shortening your URL makes it easier to share on social media, email, text messages and more. Try it out below and see for yourself.</p>
            </div>
        </div>
    </section>
}