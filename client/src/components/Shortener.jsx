export default function Shortener() {
    return <div className="shortener rounded-lg">
        <form className="">
            <div className="input-area">
                <input type="url" placeholder="Shorten a link here..." id="input" />
                <p className="warning">Please add a link</p>
            </div>
            <button className="btn-cta" type="button">Shorten it!</button>
        </form>
    </div>
}