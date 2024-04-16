import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the schema for the user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    adharCardNumber:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    } ,
    role: {
        type: String,
        enum : ['voter','admin'],
        default: 'voter'
    },
    isVoted:{
        type: Boolean,
        default: false
    }
    // You can add more fields as needed
});


userSchema.pre('save', async function(next){
    const person = this;
    // hash the passsword only if its modified
    if(!person.isModified('password')) return next();

    try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(person.password, salt);
    this.password = hashedPassword
    } catch (error) {
        return next(error);
    }
    
})

userSchema.methods.comparepassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    } catch (error) {
        throw error ;
    }
    
}



const User = mongoose.model('User',userSchema);
export default User;