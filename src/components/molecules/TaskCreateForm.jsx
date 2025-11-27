import { useState } from "react"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import Textarea from "@/components/atoms/Textarea"
import FormField from "@/components/molecules/FormField"
import ApperIcon from "@/components/ApperIcon"
import { format } from "date-fns"

const TaskCreateForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "personal",
    priority: "medium",
    dueDate: format(new Date(), "yyyy-MM-dd'T'HH:mm")
  })

  const [errors, setErrors] = useState({})

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
      await onSubmit({
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString()
      })
      
      // Reset form on success
      setFormData({
        title: "",
        description: "",
        category: "personal",
        priority: "medium",
        dueDate: format(new Date(), "yyyy-MM-dd'T'HH:mm")
      })
      setErrors({})
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
          <ApperIcon name="Plus" className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Create New Task</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <FormField label="Description" className="lg:col-span-2">
          <Textarea
            placeholder="Add task details (optional)..."
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="min-h-[100px]"
          />
        </FormField>
      </div>

      <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
        >
          {isSubmitting ? (
            <>
              <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Create Task
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

export default TaskCreateForm