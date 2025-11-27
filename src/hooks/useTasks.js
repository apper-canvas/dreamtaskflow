import { useState, useEffect, useMemo } from "react"
import taskService from "@/services/api/taskService"
import { toast } from "react-toastify"

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Debounced search with useMemo for performance
  const filteredTasks = useMemo(() => {
    if (!searchTerm.trim()) return tasks
    
    const lowercaseSearch = searchTerm.toLowerCase().trim()
    return tasks.filter(task => 
      task.title?.toLowerCase().includes(lowercaseSearch) ||
      task.description?.toLowerCase().includes(lowercaseSearch)
    )
  }, [tasks, searchTerm])
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
setTasks(prev => {
        const updatedTasks = [...prev, newTask]
        return updatedTasks
      })
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
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    refetch: loadTasks
  }
}