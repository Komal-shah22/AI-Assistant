import jwt from 'jsonwebtoken';

const genToken = (userId) => {
    try{
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {expiresIn: '10d'});
        return token;
    }
    catch(err){
        console.log("Error in generating token", err);
    }
}
export default genToken;