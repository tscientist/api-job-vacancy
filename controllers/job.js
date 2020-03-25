const Job = require('../models').Job;

module.exports = {
    create(req, res) {
        if (req.session.admin === 0) {
            res.json({status:"denied"});
            res.redirect('/profile/'+ req.session.userId);
        }
        return Job
            .create({
                position: req.body.designation,
                description: req.body.description,
                companyId: req.session.userId,
                salary: req.body.salary
            })
            .then(job => res.status(201).send(job))
            .catch(err => res.status(400).send(err));
    },

    getAll(req, res) {
        Job.find({})
        .then(jobs => {
            let jobsList = [];

            for (let job of jobs) {
                jobsList.push({id: job._id, name: job.name, released_on: job.released_on});
            }
            return res.json({status: "success", message: "Jobs list found!!!", data: {jobs: jobsList}});
        })
        .catch(err => {
            return err;
        })
    }
}

// create(req, res) {
//     return Job
//         .create({
//             name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password, saltRounds),
//             phoneNumber: req.body.phoneNumber, cpf: req.body.cpf, isAdmin: req.body.isAdmin
//         })
//         .then(job => res.status(201).send(user))
//         .catch(err => res.status(400).send(err));
// },
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
//     create: function(req, res, next) {
//         jobModel.create({ name: req.body.name, released_on: req.body.released_on }, function (err, result) {
//             if (err)
//                 next(err);
//             else
//                 res.json({status: "success", message: "Job added successfully!!!", data: null});
//
//         });
//     },
// }