
import User from '../models/User.js'
import {generateToken} from '../middlewares/jwt.js'
// import { json } from "body-parser";

export const signUpUser =  async (req,res) => {
    try {
      // store data from req.body in data variable
      const data = req.body;

       // Check if there is already an admin user
       const adminUser = await User.findOne({ role: 'admin' });
       if (data.role === 'admin' && adminUser) {
           return res.status(400).json({ error: 'Admin user already exists' });
       }

       // Validate Aadhar Card Number must have exactly 12 digit
       if (!/^\d{12}$/.test(data.aadharCardNumber)) {
           return res.status(400).json({ error: 'Aadhar Card Number must be exactly 12 digits' });
       }

       // Check if a user with the same Aadhar Card Number already exists
       const existingUser = await User.findOne({ aadharCardNumber: data.aadharCardNumber });
       if (existingUser) {
           return res.status(400).json({ error: 'User with the same Aadhar Card Number already exists' });
       }

      // creating new user
      const newUser = new User(data);
      // save new person in DB
      const response = await newUser.save();
      console.log("Data saved");

      // id and username varun apn payload create krt ahe
      const payload = {
        id:response.id,
      }
      
      console.log(JSON.stringify(payload)); // just to print payload
      const token = generateToken(payload); // paylaod varun apn takon create krt ahe
    //   console.log(token); // to print token on console
      
      res.status(201).json({message: "Successfully SignUp ", response: response,token: token}); 
    } catch (error) {
      console.log(error);
      res.status(500).json({error:'Internal Server Error'})
    }
  };

  // login person

  export const signInUser =  async (req,res) => {
    try {
      const { adharCardNumber,password } = req.body;

      const user = await User.findOne({adharCardNumber:adharCardNumber});

      if(!user || !(await user.comparepassword(password))){
        return res.status(401).json({error:'Invalid username or password'});
      }

      const payload = {
        id: user.id,
      }

      const token = generateToken(payload);
      res.status(200).json({message:'Login successful',token});

    } catch (error) {
      console.log(error);
      res.status(500).json({error:'Internal Server Error'})
    }
  }


   // get profile of person

  export const getProfile = async(req,res)=>{
    try {
      const userData = req.user.userData;
    //   console.log(userData);

    const userId = userData.id;
    // console.log(userId);
    const user = await User.findById(userId);

    // console.log(user);
    res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({error:'Internal Server Error'})
    }
}

/**
  *  PUT / User
  * update User
  */

export const updateUser = async (req,res) =>{
    try {
      // console.log(req.user);
      const userId = req.user.userData.id; // extract id from token
      const{currentPassword,newPassword} = req.body; // Extract current and new password from req.bidy

      
        // Check if currentPassword and newPassword are present in the request body
        if (!currentPassword || !newPassword) {
          return res.status(400).json({ error: 'Both currentPassword and newPassword are required' });
      }

      // Find the user by userId
      const user = await User.findById(userId);
        
      // if password doen nit match return error
      if(!user || !(await user.comparepassword(currentPassword))){
        return res.status(401).json({error:'Invalid username or password'});
      }

     user.password = newPassword;
     await user.save();

      console.log('Data Updated');

      res.status(200).json({message: `${user.name} your password is Updated`} )
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  