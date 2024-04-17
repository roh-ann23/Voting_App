import express from 'express'
const router = express.Router();
import {addCandidate,deleteCandidateById,updateCandidateById,postCandidateVote,checkVoteCount,getAllCandidate} from '../controllers/candidateController.js'
import {jwtAuthMiddleware} from '../middlewares/jwt.js'

/**
 * @swagger
 * components:
 *  schemas:
 *    Candidate:
 *      type: object
 *      required:
 *        - name
 *        - party
 *        - age
 *      properties:
 *        name:
 *          type: string
 *          description: The name of the candidate
 *        party:
 *          type: string
 *          description: The party affiliation of the candidate
 *        age:
 *          type: number
 *          description: The age of the candidate
 *        votes:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              user:
 *                type: string
 *                description: The ID of the user who voted for the candidate
 *              votedAt:
 *                type: date
 *                format: date-time
 *                description: The date and time when the vote was cast
 *          description: The list of votes received by the candidate
 *        voteCount:
 *          type: number
 *          description: The total count of votes received by the candidate
 *      example:
 *        name: John Doe
 *        party: ABC Party
 *        age: 40
 *        votes: []
 *        voteCount: 0
 */


//// add a candidate
/**
 * @swagger
 * /candidate:
 *   post:
 *     summary: Add a new candidate
 *     tags: [Candidate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       201:
 *         description: Candidate added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *                 response:
 *                   $ref: '#/components/schemas/Candidate'
 *       403:
 *         description: Forbidden. User does not have admin role.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */
router.post('/',jwtAuthMiddleware,addCandidate)

//// update a candidate
/**
 * @swagger
 * /candidate/:candidateId:
 *   put:
 *     summary: Update candidate by ID
 *     tags: [Candidate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         description: ID of the candidate to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       200:
 *         description: Candidate updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *                 response:
 *                   $ref: '#/components/schemas/Candidate'
 *       403:
 *         description: Forbidden. User does not have admin role.
 *       404:
 *         description: Not found. Candidate with the specified ID does not exist.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */
router.put('/:candidateId',jwtAuthMiddleware,updateCandidateById)


//// delete a candidate
/**
 * @swagger
 * /candidate/:candidateId:
 *   delete:
 *     summary: Delete candidate by ID
 *     tags: [Candidate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         description: ID of the candidate to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Candidate deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *       403:
 *         description: Forbidden. User does not have admin role.
 *       404:
 *         description: Not found. Candidate with the specified ID does not exist.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */
router.delete('/:candidateId',jwtAuthMiddleware,deleteCandidateById)


// To vote
/**
 * @swagger
 * /candidate/vote/:candidateId:
 *   post:
 *     summary: Vote for a candidate
 *     tags: [Candidate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         description: ID of the candidate to vote for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vote recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *       403:
 *         description: Forbidden. User does not have voting privileges.
 *       404:
 *         description: Not found. Candidate with the specified ID does not exist.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

router.post('/vote/:candidateId',jwtAuthMiddleware,postCandidateVote)

//// to check vote count

/**
 * @swagger
 * /candidate/vote/count:
 *   get:
 *     summary: Get the total count of votes for all candidates
 *     tags: [Candidate]
 *     responses:
 *       200:
 *         description: Vote count retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalVotes:
 *                   type: number
 *                   description: Total count of votes for all candidates
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */
router.get('/vote/count',checkVoteCount)


// get all candidates
/**
 * @swagger
 * /candidate/all:
 *   get:
 *     summary: Get all candidates
 *     tags: [Candidate]
 *     responses:
 *       200:
 *         description: Candidates retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Candidate'
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */
router.get('/all',getAllCandidate)

export default router;