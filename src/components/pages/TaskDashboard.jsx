import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useTasks } from "@/hooks/useTasks"
import TaskHeader from "@/components/organisms/TaskHeader"
import TaskCreateForm from "@/components/molecules/TaskCreateForm"
import TaskList from "@/components/organisms/TaskList"
import FilterSidebar from "@/components/molecules/FilterSidebar"
import EditTaskModal from "@/components/organisms/EditTaskModal"
import DeleteConfirmModal from "@/components/organisms/DeleteConfirmModal"
import Loading from "@/components/ui/Loading"
import ErrorView from "@/components/ui/ErrorView"
import { filterTasksByDate } from "@/utils/dateUtils"

const TaskDashboard = () => {
  const { tasks, loading, error, createTask, updateTask, deleteTask, toggleComplete, refetch } = useTasks()
  
  const [currentFilter, setCurrentFilter] = useState({ type: "today", value: null })
  const [editingTask, setEditingTask] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)
const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

// Calculate task counts for sidebar
  const allTasks = tasks
  const taskCounts = useMemo(() => {
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

  const handleCreateTask = async (taskData) => {
    setIsSubmitting(true)
    try {
      await createTask(taskData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
  }

  const handleUpdateTask = async (id, updateData) => {
    try {
      await updateTask(id, updateData)
    } catch (error) {
      console.error("Error updating task:", error)
      throw error
    }
  }

  const handleDeleteTask = (task) => {
    setDeletingTask(task)
  }

  const handleConfirmDelete = async () => {
    if (!deletingTask) return
    
    setIsDeleting(true)
    try {
      await deleteTask(deletingTask.id)
      setDeletingTask(null)
    } catch (error) {
      console.error("Error deleting task:", error)
    } finally {
      setIsDeleting(false)
    }
  }

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false)
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="flex">
          <div className="w-64 bg-white border-r border-gray-200 p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-10 bg-gray-100 rounded-lg"></div>
              ))}
            </div>
          </div>
          <div className="flex-1 p-8">
            <Loading />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="flex">
          <div className="w-64 bg-white border-r border-gray-200 p-6">
            <div className="opacity-50">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                Filters
              </h2>
            </div>
          </div>
          <div className="flex-1 p-8">
            <ErrorView error={error} onRetry={refetch} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50"
    >
      <div className="flex">
        {/* Sidebar */}
        <FilterSidebar
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          taskCounts={taskCounts}
        />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
<TaskHeader 
              tasks={tasks} 
              currentFilter={currentFilter}
              onOpenCreateModal={handleOpenCreateModal}
            />

            {/* Task Creation Modal */}
            <TaskCreateForm 
              isOpen={isCreateModalOpen}
              onClose={handleCloseCreateModal}
              onSubmit={handleCreateTask}
              isSubmitting={isSubmitting}
            />
            {/* Task List */}
<TaskList
              tasks={tasks}
              allTasks={allTasks}
              currentFilter={currentFilter}
              onToggleComplete={toggleComplete}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onCreateTask={scrollToTop}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditTaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleUpdateTask}
        task={editingTask}
      />

      <DeleteConfirmModal
        isOpen={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleConfirmDelete}
        task={deletingTask}
        isDeleting={isDeleting}
      />
    </motion.div>
  )
}

export default TaskDashboard