import { cleanEnv, str, port } from "envalid";

export default function validateEnv() {
    cleanEnv(process.env, {
        MONGO_URI: str(),
        PORT: port({
            default: 5000
        }),
        NODE_ENV:str({
            choices:['development','production']
        }),
        JWT_SECRET:str()
    });
}

