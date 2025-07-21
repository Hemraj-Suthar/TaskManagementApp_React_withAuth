import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: {type: Boolean, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
}
);

export const Task = mongoose.model("Task", taskSchema);