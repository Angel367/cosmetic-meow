import React, {useState} from "react";

function DevForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, message);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={"name"}>Name</label>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <label htmlFor={"email"}>Email</label>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor={"message"}>Message</label>
            <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <label htmlFor={"agree"}>Agree</label>
            <input type="checkbox"/>
            <p>
                <button className="button blue">Отправить</button>
            </p>
        </form>
    );
}

export default DevForm;