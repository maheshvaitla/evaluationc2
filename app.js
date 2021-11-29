const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect =()=>{
    return mongoose.connect(" mongodb://127.0.0.1:27017/naukari")
}

const jobsSchema = new mongoose.Schema({
    city:{type:String, required:true},
    skills:{type:String, required:true},
    jobtype:{type:String,required:true},
    noticePeriod:{type:Number,required:true},
    rating:{type:Number,required:true},
    companyName:{type:String,required:true},
    jobVacancies:{type:Number,required:true},

},{
    versionKey:false,
    timestamps:true
})

const jobs = mongoose.model("job",jobsSchema);

app.post("/jobs", async (req,res)=>{
    const newjob = await jobs.create(req.body);
    return res.status(201).send({newjob});
})

app.get("/jobs", async(req,res)=>{
    const newjob = await jobs.find().lean().exec();
    return res.status(200).send({newjob})
})

app.get("/jobs/city", async (req,res)=>{
    const newjob = await jobs.find({$and :[{city:{$eq :"mumbai"}},{skills :{$eq :"sales"}}]}).lean().exec();
    return res.status(200).send(newjob);
})

app.get("/jobs/wfh", async (req,res)=>{
    const newjob = await jobs.find({jobtype :{$eq :"work from home"}}).lean().exec();
    return res.status(200).send(newjob);
})

app.get("/jobs/noticeperiod", async (req,res)=>{
    const newjob = await jobs.find({noticePeriod :{$eq :2}}).lean().exec();
    return res.status(200).send(newjob);
})

app.get("/jobs/rating", async (req,res)=>{
    const newjob = await jobs.find({rating :{$in :[4,4.5, 5]}}).sort({rating :1}).lean().exec();
    return res.status(200).send(newjob);
})

app.get("/jobs/:company", async (req,res)=>{
    const newjob = await jobs.find({jobVacancies:{$gt :10}}).populate("companyName").lean().exec();
    return res.status(200).send(newjob);
})




app.listen(2345, async ()=>{
    await connect();
    console.log("2345 running")
})