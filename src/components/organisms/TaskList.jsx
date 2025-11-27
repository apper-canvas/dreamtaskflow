import { motion, AnimatePresence } from "framer-motion"
import TaskCard from "@/components/molecules/TaskCard"
import Empty from "@/components/ui/Empty"
import { filterTasksByDate } from "@/utils/dateUtils"

const TaskList = ({ 
  tasks, 
  allTasks,
  currentFilter, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  onCreateTask 
}) => {
  // Ensure props are defined with fallback to empty arrays
  const safeTasks = tasks || []
  const safeAllTasks = allTasks || []
  
  // Filter tasks based on current filter
  const getFilteredTasks = () => {
    // Use allTasks for category/date filtering, then apply search on top
    let baseTasks = safeAllTasks
    
    if (currentFilter?.type === "category") {
      baseTasks = safeAllTasks.filter(task => task?.category === currentFilter.value)
    } else if (currentFilter?.type) {
      baseTasks = filterTasksByDate(safeAllTasks, currentFilter.type)
    }
    
    // If tasks prop is already filtered by search, filter the base tasks by search term
    if (safeTasks.length !== safeAllTasks.length) {
      const searchedIds = new Set(safeTasks.map(t => t?.Id || t?.id))
      return baseTasks.filter(task => searchedIds.has(task?.Id || task?.id))
    }
    
    return baseTasks
  }

  const filteredTasks = getFilteredTasks()

  const getEmptyStateContent = () => {
    switch (currentFilter.type) {
      case "today":
        return {
          title: "All caught up for today! 🎉",
          description: "You have no overdue or due today tasks. Great job staying on top of things!",
          icon: "CheckCircle2"
        }
      case "upcoming":
        return {
          title: "No upcoming tasks",
          description: "You don't have any tasks scheduled for the future. Add some to plan ahead!",
          icon: "Calendar"
        }
      case "completed":
        return {
          title: "No completed tasks yet",
          description: "Complete some tasks to see your achievements here. You've got this!",
          icon: "Trophy"
        }
      case "category":
        return {
          title: `No ${currentFilter.value} tasks`,
          description: `You don't have any tasks in the ${currentFilter.value} category. Create one to get started!`,
          icon: "Tag"
        }
      default:
        return {
          title: "No tasks found",
          description: "Create your first task to get started with organizing your day.",
          icon: "CheckCircle2"
        }
    }
  }

  if (filteredTasks.length === 0) {
    const emptyContent = getEmptyStateContent()
    return (
      <Empty
        title={emptyContent.title}
        description={emptyContent.description}
        icon={emptyContent.icon}
        onAction={onCreateTask}
        actionText="Add Task"
      />
    )
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TaskList