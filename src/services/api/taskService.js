import mockTasks from "@/services/mockData/tasks.json"

class TaskService {
  constructor() {
    this.storageKey = "taskflow_tasks"
    this.initializeLocalStorage()
  }

  initializeLocalStorage() {
    const existingTasks = localStorage.getItem(this.storageKey)
    if (!existingTasks) {
      localStorage.setItem(this.storageKey, JSON.stringify(mockTasks))
    }
  }

  getStoredTasks() {
    const tasks = localStorage.getItem(this.storageKey)
    return tasks ? JSON.parse(tasks) : []
  }

  saveToStorage(tasks) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks))
  }

  async delay(ms = 200) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getAll() {
    await this.delay()
    const tasks = this.getStoredTasks()
    return [...tasks].sort((a, b) => {
      // Sort by completed status first, then by dueDate, then by priority
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }
      
      const dueDateA = new Date(a.dueDate)
      const dueDateB = new Date(b.dueDate)
      
      if (dueDateA.getTime() !== dueDateB.getTime()) {
        return dueDateA - dueDateB
      }
      
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
  }

  async getById(id) {
    await this.delay()
    const tasks = this.getStoredTasks()
    const task = tasks.find(t => t.Id === parseInt(id) || t.id === id)
    if (!task) {
      throw new Error("Task not found")
    }
    return { ...task }
  }

  async create(taskData) {
    await this.delay()
    const tasks = this.getStoredTasks()
    const maxId = tasks.reduce((max, task) => Math.max(max, task.Id), 0)
    
    const newTask = {
      Id: maxId + 1,
      id: `task-${maxId + 1}`,
      title: taskData.title,
      description: taskData.description || "",
      category: taskData.category || "other",
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate,
      completed: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    tasks.push(newTask)
    this.saveToStorage(tasks)
    return { ...newTask }
  }

  async update(id, updateData) {
    await this.delay()
    const tasks = this.getStoredTasks()
    const index = tasks.findIndex(t => t.Id === parseInt(id) || t.id === id)
    
    if (index === -1) {
      throw new Error("Task not found")
    }

    const updatedTask = {
      ...tasks[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }

    // Handle completion status
    if (updateData.completed === true && !tasks[index].completed) {
      updatedTask.completedAt = new Date().toISOString()
    } else if (updateData.completed === false && tasks[index].completed) {
      updatedTask.completedAt = null
    }

    tasks[index] = updatedTask
    this.saveToStorage(tasks)
    return { ...updatedTask }
  }

  async delete(id) {
    await this.delay()
    const tasks = this.getStoredTasks()
    const filteredTasks = tasks.filter(t => t.Id !== parseInt(id) && t.id !== id)
    
    if (filteredTasks.length === tasks.length) {
      throw new Error("Task not found")
    }
    
    this.saveToStorage(filteredTasks)
    return true
  }

  async toggleComplete(id) {
    const task = await this.getById(id)
    return await this.update(id, { completed: !task.completed })
  }

  generateId() {
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}

export default new TaskService()