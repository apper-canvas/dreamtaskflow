import { useNavigate } from "react-router-dom"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
            <ApperIcon name="FileQuestion" className="w-12 h-12 text-primary-600" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-xl font-semibold text-gray-900">
              Page Not Found
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Let's get you back to managing your tasks!
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
          >
            <ApperIcon name="Home" className="w-4 h-4 mr-2" />
            Back to Tasks
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => window.history.back()}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center mb-2">
                <ApperIcon name="Plus" className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-xs text-gray-600">Create tasks</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center mb-2">
                <ApperIcon name="CheckCircle2" className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-xs text-gray-600">Track progress</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center mb-2">
                <ApperIcon name="Filter" className="w-6 h-6 text-purple-500" />
              </div>
              <p className="text-xs text-gray-600">Stay organized</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound