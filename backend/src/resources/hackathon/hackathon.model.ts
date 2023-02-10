import { Schema, model } from "mongoose";
import Hackathon from "./hackathon.interface";

const HackathonSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    prize: {
        type: String,
        default: "Amazing Goodies"
    },
    link: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        required: true,
        default:"Need Confirmation"
    },
    participants: {
        type: String,
        default:"unknown"
    },
    theme: {
        type: String,
        default:"Unknown"
    },
    date: {
        type: String,
        required: true,
    },
},{
    timestamps:true
});


export default model<Hackathon>("Hackathon", HackathonSchema);