import reqRes from '../middlewares/reqRes'
import express from 'express'
import userAuth from '../middlewares/userAuth'
import pollController from '../controller/poll'

class pollRoutes {
    poll

    constructor() {
        this.router = express.Router()
        this.routes()
    }

    //create a poll
    createPoll(req, res) {
        if (req.userId) {
            pollController.addPoll(req)
                .then((result) => {
                    reqRes.responseHandler('Pole Created!', result, res);
                    res.end()
                })
                .catch((err) => {
                    reqRes.httpErrorHandler(err, res);
                    res.end();
                })
        } else {
            reqRes.httpErrorHandler({ code: 422, msg: "Error while creating poll", error: 'Some Poll Created' }, res);
            res.end();
        }
    }

    //get poll list 
    getPollList(req, res) {
        if (req.userId) {
            pollController.getPolls(req)
                .then((result) => {
                    reqRes.responseHandler('Polls fetched', result, res);
                    res.end()
                })
                .catch((err) => {
                    reqRes.httpErrorHandler(err, res);
                    res.end();
                })
        } else {
            reqRes.httpErrorHandler({ code: 422, msg: "Error while getching polls", error: 'Some error' }, res);
            res.end();
        }
    }

    // //get poll details of particular poll 
    // getPollDetails(req, res) {
        
    // }

    // //delete a poll
    // deletePoll(req, res) {
       
    // }

    // //add vote to a poll
    // addVote(req, res) {
        
    // }
    routes() {
        this.router.post('/', userAuth, this.createPoll)
        this.router.get('/list', userAuth, this.getPollList)
        // this.router.get('/:id', userAuth, this.getPollDetails)
        // this.router.delete('/:id', userAuth, this.deletePoll)
        // this.router.post('/vote', userAuth, this.addVote) 
    }
}

export default new pollRoutes().router