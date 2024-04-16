import express from 'express'
const router = express.Router();
import {addCandidate,deleteCandidateById,updateCandidateById,postCandidateVote,checkVoteCount,getAllCandidate} from '../controllers/candidateController.js'
import {jwtAuthMiddleware} from '../middlewares/jwt.js'

router.post('/',jwtAuthMiddleware,addCandidate)
router.put('/:candidateId',jwtAuthMiddleware,updateCandidateById)
router.delete('/:candidateId',jwtAuthMiddleware,deleteCandidateById)

router.post('/vote/:candidateId',jwtAuthMiddleware,postCandidateVote)
router.get('/vote/count',checkVoteCount)
router.get('/all',getAllCandidate)

export default router;