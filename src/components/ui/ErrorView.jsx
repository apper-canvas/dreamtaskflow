import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const ErrorView = ({ error, onRetry }) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto p-8">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertTriangle" className="w-10 h-10 text-red-600" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            Something went wrong
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {error || "We encountered an error while loading your tasks. Please try again."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={onRetry} className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
            Refresh Page
          </Button>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            If this problem persists, your tasks are safely stored locally and will be restored when the issue is resolved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ErrorView