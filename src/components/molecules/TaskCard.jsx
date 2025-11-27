import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "@/components/atoms/Button"
import Checkbox from "@/components/atoms/Checkbox"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { formatDueDate, getDueDateColor, getPriorityColor, getCategoryColor } from "@/utils/dateUtils"
import { cn } from "@/utils/cn"

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete 
}) => {
  const [isCompleting, setIsCompleting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleToggleComplete = async () => {
    if (!task.completed) {
      setIsCompleting(true)
      setShowConfetti(true)
      
      setTimeout(() => {
        setShowConfetti(false)
      }, 600)
    }
    
    try {
      await onToggleComplete(task.id)
    } finally {
      setIsCompleting(false)
    }
  }

  const ConfettiParticle = ({ delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
      animate={{ 
        opacity: [0, 1, 0], 
        scale: [0, 1, 0.5], 
        y: [-20, -60, -100],
        x: [0, Math.random() * 60 - 30, Math.random() * 80 - 40]
      }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: "easeOut" 
      }}
      className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-accent-400 to-accent-600"
      style={{
        left: '50%',
        top: '50%',
        marginLeft: '-4px',
        marginTop: '-4px'
      }}
    />
  )

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm border border-gray-100 task-card-hover relative overflow-hidden",
        task.completed && "opacity-75 bg-gray-50"
      )}
    >
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {[...Array(8)].map((_, i) => (
              <ConfettiParticle key={i} delay={i * 0.05} />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1">
          <div className="relative">
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
              className={cn(
                "transition-all duration-300",
                isCompleting && "scale-110"
              )}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-lg font-semibold text-gray-900 leading-tight",
              task.completed && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <Badge className={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
          <Badge className={getCategoryColor(task.category)}>
            {task.category}
          </Badge>
        </div>
      </div>

      {task.description && (
        <p className={cn(
          "text-gray-600 text-sm leading-relaxed mb-4 ml-8",
          task.completed && "text-gray-400"
        )}>
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between ml-8">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Calendar" className="w-4 h-4 text-gray-400" />
          <Badge className={getDueDateColor(task.dueDate)}>
            {formatDueDate(task.dueDate)}
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(task)}
            className="hover:bg-blue-50 hover:text-blue-600"
          >
            <ApperIcon name="Edit2" className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(task)}
            className="hover:bg-red-50 hover:text-red-600"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard