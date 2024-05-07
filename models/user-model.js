const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// securing password with bcryptjs
userSchema.pre('save', async function(next){
    const user = this;
    console.log(this);

    if(!user.isModified('password')){
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error)
    }
})

// What is JWT? (JSON WEB TOKEN)
/*--- 
    JSON web token is an open standard (RFC 7519) tht defines a compact and self-contained
    way for securely transmitting information between parties as JSON object.

    JWT'S are often used for authentication and authorization in web applications.
    Authentication - Verifying the identity of a user or client.
    Authorization - Determining what actions a user or client is allowed to perform 
---*/

/*---
    Components of a JWT
    Header: - Contains metadata about the token, such as the type of token and signing algorithm being used,
    Payload: - Contains claims or statements about an entity (typically, the user) and additional data.
    Common claims include userID, username, and expiration time.
    Signature: - To verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changes along the way, signature is included.

---*/

/*--- Tokens, such as JWTs are typically not stored in the database along with other user details. Instead
they are issued bu the server during the authentication process and then stored on the client-side(e.g, in cookies or local storage) for later use.
---*/

//JSON web token
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        // this key will expire in 365 days change it before
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '365d'
            }
        )
    } catch (error) {
        console.error(error)
    }
}

// define the model or the collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;

