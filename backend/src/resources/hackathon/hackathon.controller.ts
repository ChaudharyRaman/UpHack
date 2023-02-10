import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import HackathonService from "./hackathon.service";

class HackathonController implements Controller {
    public path = '/hackathons';
    public router= Router();

    private HackathonService = new HackathonService();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes():void {
        this.router.post(
            `${this.path}`,
            this.uploadHackathons
        )
        this.router.get(
            `${this.path}`,
            this.getHackathons
        )
    }

    private uploadHackathons = async(
        req: Request,
        res: Response,
        next:NextFunction
    ): Promise<Response | void>=>{
        try {
            const newHackathon = await this.HackathonService.uploadHackathons(
                req.body
            )
            return res.status(201).json(newHackathon);
        } catch (error: any) {
            next(new HttpException(400,error.message))
        }
    }

    private getHackathons = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void>=>{
        try {
            const hackathons = await this.HackathonService.getHackathons();
            return res.status(201).json(hackathons);
        } catch (error: any) {
            next(new HttpException(400,error.message))
        }
    }
}

export default HackathonController;