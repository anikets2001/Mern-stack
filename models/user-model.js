const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        require:true,
    },
    email: {
        type:String,
        require:true,
    },
    phone: {
        type:String,
        require:true,
    },
    password: {
        type:String,
        require:true,
    },
    isAdmin: {
        type:Boolean,
        default:false,
    },
})

// securing password
userSchema.pre('save', async function(next){
    const user = this;

    if(!user.isModified('password')){
        next()
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error)
    }
})

// define the model or the collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;

