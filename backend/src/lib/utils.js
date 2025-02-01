import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;

export const generateToken =(userId, res)=>{
    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn:"7d"
    } )

    res.cookie("jwt", token,{
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, //XSS attack
        sameSite: "strict", //CSRF attack
        secure: NODE_ENV !== "developement"
    })
    return token;
}