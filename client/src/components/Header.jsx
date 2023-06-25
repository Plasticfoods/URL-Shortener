import logo from '../images/logo.svg'

export default function Header() {
    return <header className="header padding-xy">
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
    </header>
}