import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const FilterSidebar = ({ currentFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { key: "all", label: "All Tasks", icon: "List", count: taskCounts?.all || 0 },
    { key: "today", label: "Today & Overdue", icon: "Calendar", count: taskCounts?.today || 0 },
    { key: "upcoming", label: "Upcoming", icon: "Clock", count: taskCounts?.upcoming || 0 },
    { key: "completed", label: "Completed", icon: "CheckCircle2", count: taskCounts?.completed || 0 },
  ]

  const categories = [
    { key: "work", label: "Work", icon: "Briefcase", count: taskCounts?.work || 0 },
    { key: "personal", label: "Personal", icon: "User", count: taskCounts?.personal || 0 },
    { key: "shopping", label: "Shopping", icon: "ShoppingCart", count: taskCounts?.shopping || 0 },
    { key: "health", label: "Health", icon: "Heart", count: taskCounts?.health || 0 },
    { key: "other", label: "Other", icon: "Tag", count: taskCounts?.other || 0 },
  ]

  const FilterItem = ({ filter, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 group",
        isActive 
          ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-sm border border-primary-200" 
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      )}
    >
      <div className="flex items-center space-x-3">
        <ApperIcon 
          name={filter.icon} 
          className={cn(
            "w-4 h-4 transition-colors duration-200",
            isActive ? "text-primary-600" : "text-gray-400 group-hover:text-gray-600"
          )} 
        />
        <span className="font-medium text-sm">{filter.label}</span>
      </div>
      {filter.count > 0 && (
        <span className={cn(
          "px-2 py-0.5 rounded-full text-xs font-medium transition-colors duration-200",
          isActive 
            ? "bg-primary-100 text-primary-700" 
            : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
        )}>
          {filter.count}
        </span>
      )}
    </button>
  )

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 space-y-6">
      <div>
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
          Filters
        </h2>
        <nav className="space-y-1">
          {filters.map((filter) => (
            <FilterItem
              key={filter.key}
              filter={filter}
              isActive={currentFilter.type === filter.key}
              onClick={() => onFilterChange({ type: filter.key, value: null })}
            />
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
          Categories
        </h3>
        <nav className="space-y-1">
          {categories.map((category) => (
            <FilterItem
              key={category.key}
              filter={category}
              isActive={currentFilter.type === "category" && currentFilter.value === category.key}
              onClick={() => onFilterChange({ type: "category", value: category.key })}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}

export default FilterSidebar