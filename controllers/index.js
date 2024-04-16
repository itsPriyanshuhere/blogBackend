import mongoose from 'mongoose';
import blog from '../model/Scehma.js';

export const getPosts = async(req,res) => {
    
    try{
        const data = await blog.find({});
        res.status(200).json({
            success: true,
            data
        });
    }
    catch(e){
        console.log("Error : ", e);
        res.status(404).json({
            success: false
        })
    }

}

export const sendPosts = async(req,res) => {
    const { address, content, image } = req.body;

    if(!address || !content) {
        res.status(404).json({
            success: false,
            message: "Fields left empty"
        })
    }

    try{
    const newBlog = blog({
        address,
        content,
        image
    });

    await newBlog.save();

    return res.status(201).json({
        success: true,
        message: "Blog created successfully",
        blog: newBlog
    });
}

catch(e){
    return res.status(500).json({
        success: false,
        message: `Some issue in posting ${e}`
    })
}



}

export const postDetails = async(req,res) => {
    const id = req.params.id;

    try{
    const post = await blog.findOne({_id:id});
    res.status(200).json({
        success: true,
        post
    })
    }
    catch(e){
        res.status(500).json({
            success: false
        })
    }

}


export const postComment = async (req, res) => {
    const { username, comment } = req.body;
    const id = req.params.id;

    try {
        const updatedBlog = await blog.findOneAndUpdate(
            { _id: id },
            { $push: { comments: { username, comment } } },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        return res.status(200).json({
            success: true,
            updatedBlog
        });
    } catch (error) {
        console.error("Error posting comment:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};