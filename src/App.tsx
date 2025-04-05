import React from 'react';
import { TaskProgressTracker } from './components/TaskProgressTracker';
import { Description } from './components/Description';
function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Progress Tracking System</h1>
          <p className="text-gray-600">Track and visualize the progress of your tasks in real-time</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <TaskProgressTracker
            taskId="task-1"
            title="File Upload"
            variant="bar"
            size="md"
            pollingInterval={300}
          />
          
          <TaskProgressTracker
            taskId="task-2"
            title="Data Processing"
            variant="circle"
            size="lg"
            pollingInterval={300}
          />
        </div>

        <Description />
      </div>
    </div>
  );
}

export default App;