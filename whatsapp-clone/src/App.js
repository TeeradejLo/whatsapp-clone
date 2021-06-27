import React, { useState, useEffect } from "react";
import "./App.css";
import Pusher from "pusher-js";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Carousel from "./Carousel";
import axios from "./axios";

function App() {

  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync")
      .then(response => {
        setMessages(response.data);
      });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('e641b3a64b9698dc6768', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe("messagesChannel");
    channel.bind("inserted", function(data) {
      setMessages([...messages, data]);
    });

    return () => {
      pusher.unsubscribe("messagesChannel");
    }
  }, [messages]);

  console.log(messages);

  return (
    
    <div className="app">
        <button onClick = {() => {setOpen((open) => (!open))}}>Switch</button>

        {
          open ? (
            <div className="app__body">
              <Sidebar />
              <Chat messages = {messages}/>
            </div>
          ) : (
            <Carousel/>
          )
        } 
    </div>
  );
}

export default App;
