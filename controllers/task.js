import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";
import mongoose from "mongoose";
export const newTask = async (req, res, next) => {
    const { title, description } = req.body;

    await Task.create({
        title,
        description,
        user: req.user,
    })

    res.status(201).json({
        success: true,
        message: "Task Created Successfully",
    })
}

export const getMyTask = async (req, res, next) => {
    const userid = req.user._id;

    const tasks = await Task.find({ user: userid });

    res.status(200).json({
        success: true,
        tasks,
    })
}

export const updateTask = async (req, res, next) => {
    try {
        console.log(req.params.id +" update");
        const task = await Task.findById(req.params.id)

        if (!task) return next(new ErrorHandler("Nice", 404));

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated",
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {
    // const task = await Task.findById(req.params.id)

    // if(!task) return next(new Error("Nice"));
    // await task.deleteOne();

    // res.status(200).json({
    //     success:true,
    //     message:"Task Deleted",
    // })

    try {console.log(req.params.id +"delete");
        const task = await Task.findById(req.params.id);

        // if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        //     console.log("ok");
        // }
           
        // if(task){
        //     console.log("ok");
        // }else{
        //     console.log("not ok");
            
        // }
        
        if (!task) return next(new ErrorHandler("Nice", 404));
        const response=await task.deleteOne();
        console.log(task);

        if(response){
            res.status(200).json({
                success: true,
                message: "Task deleted successfully",
            });
        }
       
    } catch (error) {
        console.log(error);
        next(error); // Pass the error to the error-handling middleware
    }
}