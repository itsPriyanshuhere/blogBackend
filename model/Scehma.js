import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    address: String,
    content: String,
    image: String,
    comments: [
        Object
    ]
})

export default mongoose.model('blog',blogSchema);