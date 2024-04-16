import Candidate from "../models/candidate.js";
import User from "../models/User.js";
import { jwtAuthMiddleware } from "../middlewares/jwt.js";


// checking user has admin role or not
const checkAdminRole = async (userId) => {
  try {
    const user = await User.findById(userId);
    if(user.role === 'admin') {
      return true;
    }
  } catch (error) {
    return false;
  }
};

// post request to add a candidate
export const addCandidate = async (req, res) => {
  try {
    // checking user has admin role or not ny passing this id in function
    if (! await checkAdminRole(req.user.userData.id))
    // console.log(req.user.userData.id);
      return res.status(403).json({ message: "User does not have admin role" });

    // store data from req.body in data variable
    const data = req.body;
    // creating new candidate
    const newcandidate = new Candidate(data);
    // save new candidate in DB
    const response = await newcandidate.save();

    console.log("Data saved");

    res
      .status(201)
      .json({ message: "Candidate Added Successfully ", response: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 *  PUT / Candidate
 * update Candidate
 */

export const updateCandidateById = async (req, res) => {
  try {
    if (!checkAdminRole(req.user.userData.id))
      return res.status(403).json({ message: "User doen not have admin role" });

    const candidateId = req.params.candidateId;
    const updatedCandidateData = req.body;

    const updatedCandidate = await Person.findByIdAndUpdate(candidateId,updatedCandidateData,{
        new: true,
        runValidators: true,
      }
    );
    if (!updatedCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    console.log("Data Updated");

    res.status(200).json(updatedCandidate);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


/**
  *  DELETE / Candidate
  * /Candidate/:id
  */

export const deleteCandidateById = async (req,res) =>{
    try {

    if (!checkAdminRole(req.user.userData.id))
      return res.status(403).json({ message: "User doen not have admin role" });

      const candidateId = req.params.candidateId;
      
      const deleteCandidate = await Person.findByIdAndDelete(candidateId);

      if(!deleteCandidate){
        return res.status(404).json({error:'person not found'})
      }
      console.log('Candidate Deleted Succefully');

      res.status(200).json({Mesage:'Person Delete SuccessFully'},deleteCandidate)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
  *  POST / Vote Candidate
  * / vote/Candidate/:id
  */

export const postCandidateVote = async (req,res)=>{

  try {
    const candidateId = req.params.candidateId; // extract candidate id from params
    const userId = req.user.userData.id; // extract user id from token

    const candidate = await Candidate.findById(candidateId);
    if(!candidate){
      return res.status(404).json({error:'candidate not found'})
    }

    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({error:'user not found'})
    }
    if(user.isVoted){
      return res.status(400).json({error:'You are already voted'})
    }
    if(user.role === 'admin'){
      return res.status(400).json({error:'You are not allowed to vote'})
    }


    // update the candidate document with record the vote
    candidate.votes.push({user:userId});
    candidate.voteCount++;
    await candidate.save();

    // update the user document with the vote status
    user.isVoted = true;
    await user.save();

    res.status(200).json({message:' Your Vote done successfully'})

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

  /**
  *  GET / Vote Count of Candidate
  * / vote/count
  */

  export const checkVoteCount = async (req,res) => {

    try {
      // find all candidate and sort them by theire vote count in descending order
      const candidate = await Candidate.find().sort({voteCount:'desc'})

      const voteRecord = candidate.map((data)=>{
        return{
          party: data.party,
          count: data.voteCount
        }
      })

      
      return res.status(200).json({voteRecord});

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  
   /**
  *  GET / list all Candidates
  * /all
  */

   export const getAllCandidate = async (req,res) => {
    try {
      const candidate = await Candidate.find();

      const candidatesPresent = candidate.map((data)=>{
        return{
          id: data._id,
          name: data.name,
          party: data.party,
  
        }
      })
      return res.status(200).json({candidatesPresent});

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
   
   }