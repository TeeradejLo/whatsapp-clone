import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Pusher from "pusher";
import Messages from "./dbMessages.js";

//app config
const app = express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
    appId: "1222578",
    key: "e641b3a64b9698dc6768",
    secret: "d743e503a651f92751df",
    cluster: "ap1",
    useTLS: true
});

//middlewares
app.use(express.json());
app.use(cors());

//db config
/* MongoDB.com => name: admin, password: QMw1xP0RwzfxClYe */
const connection_url = "mongodb+srv://admin:QMw1xP0RwzfxClYe@cluster0.233ra.mongodb.net/whatsappdb?retryWrites=true&w=majority"
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection; 

db.once("open", () => {
    console.log("db connected");

    const messagesCollection = db.collection("messagecontents");
    const changeStream = messagesCollection.watch();
    changeStream.on("change", (change) => {

        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messagesChannel", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log("Error triggering Pusher");
        }
    });
});

//API routes
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.post("/messages/new", (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

//listen
app.listen(port, () => {console.log(`listening on localhost:${port}`)});