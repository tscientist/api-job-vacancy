const Job = require('../models').Job;

module.exports = {
    create(req, res) {
        if (req.session.admin === 1) {
            return Job
                .create({
                    position: req.body.designation,
                    description: req.body.description,
                    userId: req.session.userId,
                    salary: req.body.salary
                })
                .then(job => res.status(201).send(job))
                .catch(err => res.status(400).send(err));
        }

        res.json({status:"denied"});
        res.redirect('/profile/'+ req.session.userId);
    },

    getAll(req, res) {
        Job.findAll({})
        .then(jobs => {
            let jobsList = [];

            for (let job of jobs) {
                jobsList.push({id: job._id, name: job.name, released_on: job.released_on});
            }
            return res.json({data: {jobs: jobsList}});
        })
        .catch(err => {
            return err;
        })
    },

    index (req,res) {
        Job.findAll()
            .then((job) => {
                return res.status(200).json(job)
            })
            .catch((error) => {
                return res.status(400).json(error)
        });
    }
}

// module.exports = {
//     getById: function(req, res, next) {
//         console.log(req.body);
//         jobModel.findById(req.params.jobId, function(err, jobInfo){
//             if (err) {
//                 next(err);
//             } else {
//                 res.json({status:"success", message: "Job found!!!", data:{jobs: jobInfo}});
//             }
//         });
//     },
//     updateById: function(req, res, next) {
//         jobModel.findByIdAndUpdate(req.params.jobId,{name:req.body.name}, function(err, jobInfo){
//             if(err)
//                 next(err);
//             else {
//                 res.json({status:"success", message: "Job updated successfully!!!", data:null});
//             }
//         });
//     },
//     deleteById: function(req, res, next) {
//         jobModel.findByIdAndRemove(req.params.jobId, function(err, jobInfo){
//             if(err)
//                 next(err);
//             else {
//                 res.json({status:"success", message: "Job deleted successfully!!!", data:null});
//             }
//         });
//     },

// }