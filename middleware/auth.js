import jwt from 'jsonwebtoken';

const SECRET_KEY = '007078ac9dcd3112f3fa3dd4e5c1a1551a5aa912d7b4d24133fcf6b3164da10719331a4aab56e49c06799c566874ec749e69751bc4204f773e20d672f9c96d91fc3c36303372eeb056d504c3446617f05d2e985085f01afd4d33b0b1335429a4aee84ab64edc662606f255db1df4135043ae0f712329e2fdf0033e6d2b2aa1edb24c83469e67bd7a0de654b465d19a14c566e1139fc654aa7a2b6746e67ef509dd3b0f794220564f9a923d9b85d235051d3f289b95045851e8f2891532006fe0f58c6bd469fb362812dfee364254d8f06aa6e184a0792ab761c91df57f812f8965b7abeabfd3fd655e895f3a629941ff8db2207ceae624ecd807e4e86557cf4c';

// Middleware to authenticate the token 

const authenticatetoken = (req, res, next)=>{
    // Get token from Authorization header (e.g Bearer <token>)

    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    if(!token){
        return res.status(403).json({
            message:'Access Denied'
        })
    }


    try {
        // Verify the token 
        const decoded = jwt.verify(token, SECRET_KEY);

        // Attach user into to request 
        req.user = decoded;

        // Procces to eht next middleware

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
}


export default authenticatetoken;