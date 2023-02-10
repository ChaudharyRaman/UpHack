import { Schema,model } from "mongoose";
import User from '../../resources/user/user.interface';
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
},{
    timestamps: true
})

UserSchema.pre<User>('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    next();
});

UserSchema.methods.isValidPassword = async function(password:string): Promise<Error | boolean> {
    try {
        const user = this as User;
        const compare = await bcrypt.compare(password,user.password);
        return compare;
    }
    catch (error : any) {
        throw new Error(error);
    }
}

export default model<User>('User',UserSchema);