import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import Task from './models/Task.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err))

// Rutas
app.get('/', (req, res) => {
    res.send('API ToDo funcionando 🚀')
  })

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find()
  res.json(tasks)
})

app.post('/tasks', async (req, res) => {
  const task = new Task({ text: req.body.text, completed: false })
  await task.save()
  res.status(201).json(task)
})

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
  res.sendStatus(204)
})

app.patch('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    )
    res.json(updatedTask)
  } catch (error) {
    res.status(400).json({ error: 'Error actualizando tarea' })
  }
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
})
