import React from "react"

export const Description = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Integration Notes</h2>
          <div className="prose max-w-none">
            <h3 className="text-lg">FastAPI Backend Setup</h3>
            <p>To integrate with a FastAPI backend:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Create a Redis cache to store task progress</li>
              <li>Implement a FastAPI endpoint at <code>/progress/{'{task_id}'}</code> to retrieve progress data</li>
              <li>Ensure your task worker updates progress in Redis when task state changes</li>
            </ol>
            
            <h3 className="text-lg mt-4">Example FastAPI Implementation</h3>
            <pre className="bg-gray-50 p-4 rounded-md overflow-auto text-sm">
              <code>{`
                # FastAPI endpoint example
                @app.get("/progress/{task_id}", response_model=ProgressData)
                async def get_task_progress(task_id: str):
                    # Get progress from Redis
                    progress_data = await redis.get(f"task:progress:{task_id}")
                    
                    if not progress_data:
                        raise HTTPException(status_code=404, detail="Task not found")
                    
                    # Parse the JSON from Redis
                    progress = json.loads(progress_data)
                    
                    return {
                        "taskId": task_id,
                        "percentage": progress.get("percentage", 0),
                        "message": progress.get("message", ""),
                        "status": progress.get("status", "idle"),
                        "timeRemaining": progress.get("time_remaining"),
                        "startTime": progress.get("start_time"),
                        "lastUpdated": progress.get("last_updated")
                    }

                # In your background task
                async def update_progress(task_id: str, percentage: float, message: str = None):
                    await redis.set(
                        f"task:progress:{task_id}",
                        json.dumps({
                            "percentage": percentage,
                            "message": message,
                            "status": "pending" if percentage < 100 else "success",
                            "last_updated": int(time.time() * 1000)
                        })
                    )
              `}</code>
            </pre>
          </div>
        </div>
    );
};