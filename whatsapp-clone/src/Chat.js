import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";

function Chat({ messages }) {
    const [input, setInput] = useState("");

    useEffect(() => {
        updateScroll();
    }, [messages])

    const handleSendMessage = (e) => {
        e.preventDefault();
        let currTime = new Date();
        let currTimeHours = (currTime.getHours() < 10 ? "0" : "") + currTime.getHours();
        let currTimeMinutes = (currTime.getMinutes() < 10 ? "0" : "") + currTime.getMinutes();        
        axios.post("/messages/new", {
            message: input,
            name: "Bas",
            timestamp: currTimeHours + ":" + currTimeMinutes,  
            received: true
        });
        setInput("");
    };

    function updateScroll() {
        const element = document.getElementById("chatBox");
        element.scrollTop = element.scrollHeight;
    }

    return (
        <div className = "chat">
            {/* Header */}
            <div className="chat__header">
                <Avatar/>

                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>

            {/* Chat Body */}
            <div className="chat__body" id = "chatBox">
                {
                    messages.map((message, index) => (
                        <p key = {`chat__bubble__${index}`} id = {index} className = {`chat__message ${message.received ? "chat__receiver" : ""}`}>           
                            <span className = "chat__name">{message.name}</span>
                            {message.message}
                            <span className = {`chat__timestamp ${message.received ? "chat__left" : "chat__right"}`}>{message.timestamp}</span>
                        </p>
                    ))
                }
            </div>

            {/* Chat Input */}
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input type = "text" 
                            value = {input} 
                            onChange = {(e) => {setInput(e.target.value)}} 
                            placeholder = "enter message..."/>
                    <button type = "submit" onClick = {handleSendMessage}>Send</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat;
