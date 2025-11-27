import { useMemo } from "react"
import ApperIcon from "@/components/ApperIcon"
import Badge from "@/components/atoms/Badge"
import Input from "@/components/atoms/Input"
import { filterTasksByDate } from "@/utils/dateUtils"

const TaskHeader = ({ tasks, currentFilter, searchTerm, onSearchChange }) => {
  const taskCounts = useMemo(() => {
    const allTasks = tasks.filter(task => !task.completed)
    const completedTasks = tasks.filter(task => task.completed)
    const todayTasks = filterTasksByDate(tasks, "today")
    const upcomingTasks = filterTasksByDate(tasks, "upcoming")
    
    const categoryTasks = {
      work: tasks.filter(task => task.category === "work" && !task.completed),
      personal: tasks.filter(task => task.category === "personal" && !task.completed),
      shopping: tasks.filter(task => task.category === "shopping" && !task.completed),
      health: tasks.filter(task => task.category === "health" && !task.completed),
      other: tasks.filter(task => task.category === "other" && !task.completed),
    }

    return {
      all: allTasks.length,
      today: todayTasks.length,
      upcoming: upcomingTasks.length,
      completed: completedTasks.length,
      ...Object.fromEntries(Object.entries(categoryTasks).map(([key, tasks]) => [key, tasks.length]))
    }
  }, [tasks])

  const getHeaderInfo = () => {
    switch (currentFilter.type) {
      case "all":
        return {
          title: "All Tasks",
          subtitle: `${taskCounts.all} active tasks`,
          icon: "List",
          gradient: "from-gray-600 to-gray-800"
        }
      case "today":
        return {
          title: "Today & Overdue",
          subtitle: `${taskCounts.today} tasks need attention`,
          icon: "Calendar",
          gradient: "from-orange-500 to-red-600"
        }
      case "upcoming":
        return {
          title: "Upcoming Tasks",
          subtitle: `${taskCounts.upcoming} future tasks`,
          icon: "Clock",
          gradient: "from-blue-500 to-indigo-600"
        }
      case "completed":
        return {
          title: "Completed Tasks",
          subtitle: `${taskCounts.completed} tasks completed`,
          icon: "CheckCircle2",
          gradient: "from-green-500 to-emerald-600"
        }
      case "category":
        const categoryName = currentFilter.value.charAt(0).toUpperCase() + currentFilter.value.slice(1)
        return {
          title: `${categoryName} Tasks`,
          subtitle: `${taskCounts[currentFilter.value]} ${currentFilter.value} tasks`,
          icon: getCategoryIcon(currentFilter.value),
          gradient: getCategoryGradient(currentFilter.value)
        }
      default:
        return {
          title: "Tasks",
          subtitle: "Organize your day",
          icon: "CheckCircle2",
          gradient: "from-primary-500 to-primary-600"
        }
    }
  }

  const getCategoryIcon = (category) => {
    const icons = {
      work: "Briefcase",
      personal: "User", 
      shopping: "ShoppingCart",
      health: "Heart",
      other: "Tag"
    }
    return icons[category] || "Tag"
  }

  const getCategoryGradient = (category) => {
    const gradients = {
      work: "from-blue-500 to-blue-600",
      personal: "from-purple-500 to-purple-600",
      shopping: "from-green-500 to-green-600", 
      health: "from-pink-500 to-pink-600",
      other: "from-gray-500 to-gray-600"
    }
    return gradients[category] || "from-gray-500 to-gray-600"
  }

  const headerInfo = getHeaderInfo()

  return (
<div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${headerInfo.gradient} flex items-center justify-center shadow-lg`}>
          <ApperIcon name={headerInfo.icon} className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {headerInfo.title}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {headerInfo.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <ApperIcon name="Search" className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 w-64 h-9 text-sm bg-white border-gray-200 focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="primary" className="px-3 py-1 text-sm">
            <ApperIcon name="CheckCircle2" className="w-4 h-4 mr-1" />
            {taskCounts.completed} completed
          </Badge>
          <Badge variant="default" className="px-3 py-1 text-sm">
            <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
            {taskCounts.all} active
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default TaskHeader