import { type } from "os";
import Hackathon from "./hackathon.interface";
import hackathonModel from "./hackathon.model";


class HackathonService {
    private hackathon = hackathonModel;

    /**
     * Upload Hackathons
     */
    public async uploadHackathons(
        data: Hackathon 
    ):Promise<Hackathon | Error >{
        try {
            const newHackathon = this.hackathon.create(data);
            return newHackathon;
        } catch (error) {
            throw new Error("Unable to upload Hackathons");   
        }
    }

    public async getHackathons():Promise<Hackathon[] | Error>{
        try {
            const hackathons = this.hackathon.find({});
            return hackathons;
        } catch (error) {
            throw new Error("Unable To Get Hackathons");
        }
    }
}

export default HackathonService;