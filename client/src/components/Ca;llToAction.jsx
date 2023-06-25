import bgDesktop from '../images/bg-boost-desktop.svg'
import bgMobile from '../images/bg-boost-mobile.svg'

export default function CallToAction() {
    return <section className="cta">
        <picture>
            <source media="(min-width: 768px)" srcSet={bgDesktop} />
            <img src={bgMobile} alt="" />
        </picture>
        <div className="inner flex flex-col justify-center items-center gap-3">
            <h2 className='text-white font-bold text-2xl'>Shorten your link now</h2>
            <button type="button" className="btn-cta rounded-full">Get Started</button>
        </div>
    </section>
}