import logo from '../images/logo.svg'

export default function Header() {
    return <header className="header">
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
    </header>
}