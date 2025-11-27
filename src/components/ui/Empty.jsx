import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  title = "No tasks found", 
  description = "Create your first task to get started with organizing your day.",
  onAction,
  actionText = "Add Task",
  icon = "CheckCircle2"
}) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto p-8">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} className="w-12 h-12 text-primary-500" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {onAction && (
          <Button 
            onClick={onAction}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 transform hover:scale-105 transition-all duration-200"
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            {actionText}
          </Button>
        )}

        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center mb-2">
              <ApperIcon name="Calendar" className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-xs text-gray-600">Set due dates</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center mb-2">
              <ApperIcon name="Tag" className="w-6 h-6 text-purple-500" />
            </div>
            <p className="text-xs text-gray-600">Organize by category</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center mb-2">
              <ApperIcon name="Zap" className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-xs text-gray-600">Set priorities</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Empty