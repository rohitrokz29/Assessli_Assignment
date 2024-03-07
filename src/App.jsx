import React, { useRef, useState } from "react";
import CallImage from "./assets/call.webp";
import "./App.css";

function App() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const messageRef = useRef(null);
  const [status, setStatus] = useState({ error: false, message: "" });
  const handleSendMessage = (e) => {
    e.preventDefault();
    const Name = nameRef.current.value;
    const Email = emailRef.current.value;
    const Phone = phoneRef.current.value;
    const Message = messageRef.current.value;
    if (!Name || !Email || !Phone || !Message) {
      setStatus({error:true,message:"Enter Valid Details!"});
      return;
    }
    setStatus("");
    fetch(`https://sheetdb.io/api/v1/${process.env.API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [{ Name, Email, Phone, Message }],
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.created === 1) {
          setStatus({error:false,message:"Your Message has been Recorded"});
          nameRef.current.value = "";
          emailRef.current.value = "";
          phoneRef.current.value = "";
          messageRef.current.value = "";
        } else {
            setStatus({error:true,message:"Message Not Sent"});
        }
      })
      .catch((err) => {
            setStatus({error:true,message:"Message Not Sent"});
      });
  };
  return (
    <>
      <main className="main-block">
        <div className="">
          <h2> Contact Us and let us know what you think.</h2>
          <img className="image" src={CallImage} />
        </div>
        <form className="contact" onSubmit={handleSendMessage}>
          <span className="heading">Send Us A Message</span>
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            ref={nameRef}
          />
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            ref={emailRef}
          />
          <input
            className="form-control"
            type="phone"
            placeholder="Phone"
            ref={phoneRef}
          />
          <textarea
            className="form-control"
            placeholder="Message"
            ref={messageRef}
          />
          <button className="button" type="submit">
            Send Message
          </button>
          <div
            className="status"
            style={{
              visibility: !status.message ? "hidden" : "",
              backgroundColor: status.error ? "#ff000039" : "#33fc0663",
            }}
          >
            {status.message}
            <i className="fa-solid fa-xmark" onClick={() => setStatus({...status,message:""})} />
          </div>
        </form>
      </main>
      <div className="other-ways">
        <Card
          heading={"Address"}
          content={"123 Main Road Town City"}
          icon_name="fa-solid fa-location-dot"
        />
        <Card
          heading={"Call Us"}
          content={"555-123-4567"}
          icon_name="fa-solid fa-phone"
        />
        <Card
          heading={"Mail Us"}
          content={"dummyemail@example.com"}
          icon_name="fa-solid fa-envelope"
        />
      </div>
    </>
  );
}

const Card = ({ heading, content, icon_name }) => {
  return (
    <div className="card" key={heading}>
      <i className={icon_name} />
      <div className="info">
        <span className="heading">{heading}</span>
        <br />
        <span className="content">{content}</span>
      </div>
    </div>
  );
};
export default App;
