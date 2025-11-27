const Loading = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
        <div className="h-10 w-32 bg-gradient-to-r from-primary-200 to-primary-300 rounded-lg"></div>
      </div>

      {/* Task creation form skeleton */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg"></div>
          </div>
          <div className="lg:col-span-2 space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg"></div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <div className="h-10 w-28 bg-gradient-to-r from-primary-200 to-primary-300 rounded-lg"></div>
        </div>
      </div>

      {/* Task cards skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="h-6 w-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-6 w-16 bg-gradient-to-r from-red-200 to-red-300 rounded-full"></div>
                <div className="h-6 w-20 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-6 w-24 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full"></div>
              <div className="flex space-x-2">
                <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading