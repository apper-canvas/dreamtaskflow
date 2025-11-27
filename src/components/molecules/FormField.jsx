import { cn } from "@/utils/cn"

const FormField = ({ 
  label, 
  children, 
  error, 
  required = false, 
  className,
  description 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {description && (
        <p className="text-xs text-gray-500 mt-1">
          {description}
        </p>
      )}
      
      {children}
      
      {error && (
        <p className="text-sm text-red-600 mt-1 flex items-center">
          <span className="mr-1">⚠</span>
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField