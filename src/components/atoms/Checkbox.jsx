import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ className, checked, onChange, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        ref={ref}
        {...props}
      />
      <div
        className={cn(
          "w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200 flex items-center justify-center",
          checked
            ? "bg-gradient-to-br from-primary-500 to-primary-600 border-primary-500 shadow-sm"
            : "bg-white border-gray-300 hover:border-primary-400 hover:shadow-sm",
          className
        )}
        onClick={() => onChange?.({ target: { checked: !checked } })}
      >
        {checked && (
          <ApperIcon 
            name="Check" 
            className="w-3 h-3 text-white checkmark-animation" 
          />
        )}
      </div>
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox