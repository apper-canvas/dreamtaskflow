import { format, isToday, isTomorrow, isYesterday, isPast, isFuture, startOfDay, endOfDay, parseISO } from "date-fns"

export const formatDueDate = (dateString) => {
  const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString)
  
  if (isToday(date)) {
    return "Today"
  }
  
  if (isTomorrow(date)) {
    return "Tomorrow"
  }
  
  if (isYesterday(date)) {
    return "Yesterday"
  }
  
  // If within this week, show day name
  const now = new Date()
  const diffInDays = Math.abs((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffInDays <= 7) {
    return format(date, "EEEE") // Monday, Tuesday, etc.
  }
  
  return format(date, "MMM d") // Jan 15
}

export const getDueDateStatus = (dateString) => {
  const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString)
  const today = startOfDay(new Date())
  const taskDate = startOfDay(date)
  
  if (taskDate.getTime() < today.getTime()) {
    return "overdue"
  }
  
  if (isToday(date)) {
    return "today"
  }
  
  return "future"
}

export const getDueDateColor = (dateString) => {
  const status = getDueDateStatus(dateString)
  
  switch (status) {
    case "overdue":
      return "bg-red-50 text-red-700 border-red-200"
    case "today":
      return "bg-orange-50 text-orange-700 border-orange-200"
    default:
      return "bg-gray-50 text-gray-600 border-gray-200"
  }
}

export const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700 border-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case "low":
      return "bg-green-100 text-green-700 border-green-200"
    default:
      return "bg-gray-100 text-gray-600 border-gray-200"
  }
}

export const getCategoryColor = (category) => {
  switch (category) {
    case "work":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "personal":
      return "bg-purple-100 text-purple-700 border-purple-200"
    case "shopping":
      return "bg-green-100 text-green-700 border-green-200"
    case "health":
      return "bg-pink-100 text-pink-700 border-pink-200"
    default:
      return "bg-gray-100 text-gray-600 border-gray-200"
  }
}

export const isOverdue = (dateString) => {
  return getDueDateStatus(dateString) === "overdue"
}

export const isDueToday = (dateString) => {
  return getDueDateStatus(dateString) === "today"
}

export const filterTasksByDate = (tasks, filterType) => {
  // Handle undefined/null tasks parameter
  if (!tasks) return []
  
  const today = startOfDay(new Date())
  
  switch (filterType) {
    case "today":
      return tasks.filter(task => {
        if (task.completed) return false
        const taskDate = startOfDay(parseISO(task.dueDate))
        return taskDate.getTime() <= today.getTime()
      })
    case "upcoming":
      return tasks.filter(task => {
        if (task.completed) return false
        const taskDate = startOfDay(parseISO(task.dueDate))
        return taskDate.getTime() > today.getTime()
      })
    case "overdue":
      return tasks.filter(task => {
        if (task.completed) return false
        return isOverdue(task.dueDate)
      })
    case "completed":
      return tasks.filter(task => task.completed)
    default:
      return tasks
  }
}