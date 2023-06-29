import { useState } from "react"
const base = 'https://littleurl.onrender.com'

export default function Shortener(props) {
    const [input, setInput] = useState("")

    function handleInputChange(e) {
        const { value } = e.target
        setInput(value)
    }

    async function handleClick() {
        if(input === '') return;

        try {
            const response = await fetch(`${base}/api/short-url`, {
                method: 'POST',
                body: JSON.stringify({ fullUrl: input }),
                headers: {
                    "Content-type": "application/json"
                },
            })
    
            const resObject = await response.json();
            if(!response.ok) {
                console.log('response object', resObject)
                alert(resObject.msg)
                setInput("")
                return;
            }
    
            const newItem = {
                fullUrl: input,
                shortUrl: resObject.shortUrl
            }
            props.addLink(newItem)
            setInput("")
        }
        catch(err) {
            console.log(err)
            alert('Server Error')
            setInput("")
        }
    }


    return <div className="shortener rounded-lg">
        <form className="">
            <div className="input-area">
                <input type="url" placeholder="Shorten a link here..." id="input" onChange={handleInputChange} value={input} />
                <p className="warning">Please add a link</p>
            </div>
            <button className="btn-cta" type="button" onClick={handleClick}>Shorten it!</button>
        </form>
    </div>
}