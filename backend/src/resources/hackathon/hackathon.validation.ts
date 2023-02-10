import { Document } from "mongoose";

interface Hackathon extends Document {
    name: string;
    prize: string;
    link: string;
    mode: string;
    participants:string;
    theme:string;
    date: string;
}

export default Hackathon;