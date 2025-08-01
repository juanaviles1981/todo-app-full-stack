import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
})

const Task = mongoose.model('Task', taskSchema)

export default Task
