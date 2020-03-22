const jobModel = require('../models/jobs');

module.exports = {
    getById: function(req, res, next) {
        console.log(req.body);
        jobModel.findById(req.params.jobId, function(err, jobInfo){
            if (err) {
                next(err);
            } else {
                res.json({status:"success", message: "Job found!!!", data:{jobs: jobInfo}});
            }
        });
    },
    getAll: function(req, res, next) {
        let jobsList = [];
        jobModel.find({}, function(err, jobs){
            if (err){
                next(err);
            } else{
                for (let job of jobs) {
                    jobsList.push({id: job._id, name: job.name, released_on: job.released_on});
                }
                res.json({status:"success", message: "Jobs list found!!!", data:{jobs: jobsList}});

            }
        });
    },
    updateById: function(req, res, next) {
        jobModel.findByIdAndUpdate(req.params.jobId,{name:req.body.name}, function(err, jobInfo){
            if(err)
                next(err);
            else {
                res.json({status:"success", message: "Job updated successfully!!!", data:null});
            }
        });
    },
    deleteById: function(req, res, next) {
        jobModel.findByIdAndRemove(req.params.jobId, function(err, jobInfo){
            if(err)
                next(err);
            else {
                res.json({status:"success", message: "Job deleted successfully!!!", data:null});
            }
        });
    },
    create: function(req, res, next) {
        jobModel.create({ name: req.body.name, released_on: req.body.released_on }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "Job added successfully!!!", data: null});

        });
    },
}