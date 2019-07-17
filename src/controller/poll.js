import pollModel from '../models/poll'
import voteModel from '../models/vote'
import cred from '../config/const'

class pollController {

    constructor() { }

    //get pollist 
    getPolls(data) {
        let userId = data.userId
        return new Promise((resolve, reject) => {
            pollModel.find({})
                .then((polls) => {
                    resolve(polls)
                })
                .catch((err) => {
                    reject({ code: 500, msg: "Error while getting polls", error: err })
                })
        })
    }

    // add poll 
    addPoll(data){
        let userId = data.userId
        console.log(userId)
        data = data.body
        data.userId = userId
        return new Promise((resolve, reject) => {
            pollModel.findOne({
                "title": data.title
            })
            .then((poll) => {
                if(poll){
                    reject({ code: 500, msg: "Poll already exist", error: poll })
                } else {
                    let polModel = new pollModel(data)
                    return polModel.save()
                }
            })
            .then((isSaved) => {
                if(isSaved){
                    console.log("isSaved",isSaved)
                    return pollModel.find({})
                }
            })
            .then((polls) => {
		if(polls) {
		    resolve(polls)
		}
            })
            .catch((err) => {
                reject({ code: 500, msg: "Error while Saving poll", error: err })
            })
        })
    }
}


export default new pollController()
