import { useState, useEffect } from "react"
import taskService from "@/services/api/taskService"
import { toast } from "react-toastify"

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadTasks = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await taskService.getAll()
      setTasks(data)
    } catch (err) {
      setError(err.message || "Failed to load tasks")
      toast.error("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (taskData) => {
    try {
      setError("")
      const newTask = await taskService.create(taskData)
      setTasks(prev => [...prev, newTask])
      toast.success("Task created successfully!")
      return newTask
    } catch (err) {
      const errorMessage = err.message || "Failed to create task"
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    }
  }

  const updateTask = async (id, updateData) => {
    try {
      setError("")
      const updatedTask = await taskService.update(id, updateData)
      setTasks(prev => prev.map(task => 
        (task.Id === parseInt(id) || task.id === id) ? updatedTask : task
      ))
      toast.success("Task updated successfully!")
      return updatedTask
    } catch (err) {
      const errorMessage = err.message || "Failed to update task"
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    }
  }

  const deleteTask = async (id) => {
    try {
      setError("")
      await taskService.delete(id)
      setTasks(prev => prev.filter(task => 
        task.Id !== parseInt(id) && task.id !== id
      ))
      toast.success("Task deleted successfully!")
    } catch (err) {
      const errorMessage = err.message || "Failed to delete task"
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    }
  }

  const toggleComplete = async (id) => {
    try {
      setError("")
      const updatedTask = await taskService.toggleComplete(id)
      setTasks(prev => prev.map(task => 
        (task.Id === parseInt(id) || task.id === id) ? updatedTask : task
      ))
      
      if (updatedTask.completed) {
        toast.success("Task completed! 🎉")
      } else {
        toast.success("Task reopened")
      }
      
      return updatedTask
    } catch (err) {
      const errorMessage = err.message || "Failed to update task"
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    refetch: loadTasks
  }
}