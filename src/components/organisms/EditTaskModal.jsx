import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import Textarea from "@/components/atoms/Textarea"
import FormField from "@/components/molecules/FormField"
import ApperIcon from "@/components/ApperIcon"
import { format } from "date-fns"

const EditTaskModal = ({ isOpen, onClose, onSave, task, isSaving = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "personal",
    priority: "medium",
    dueDate: ""
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (task) {
      const dueDate = new Date(task.dueDate)
      setFormData({
        title: task.title || "",
        description: task.description || "",
        category: task.category || "personal",
        priority: task.priority || "medium",
        dueDate: format(dueDate, "yyyy-MM-dd'T'HH:mm")
      })
    }
  }, [task])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required"
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await onSave(task.id, {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString()
      })
      onClose()
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen || !task) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
          className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <ApperIcon name="Edit2" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Edit Task</h2>
                <p className="text-sm text-gray-500">Update your task details</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Task Title" required error={errors.title}>
                <Input
                  type="text"
                  placeholder="Enter task title..."
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className={errors.title ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""}
                />
              </FormField>

              <FormField label="Due Date" required error={errors.dueDate}>
                <Input
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                  className={errors.dueDate ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""}
                />
              </FormField>

              <FormField label="Category">
                <Select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                >
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="shopping">Shopping</option>
                  <option value="health">Health</option>
                  <option value="other">Other</option>
                </Select>
              </FormField>

              <FormField label="Priority">
                <Select
                  value={formData.priority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </Select>
              </FormField>
            </div>

            <FormField label="Description">
              <Textarea
                placeholder="Add task details (optional)..."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="min-h-[100px]"
              />
            </FormField>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
              <Button 
                type="button"
                variant="outline" 
                onClick={onClose}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSaving}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
              >
                {isSaving ? (
                  <>
                    <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default EditTaskModal