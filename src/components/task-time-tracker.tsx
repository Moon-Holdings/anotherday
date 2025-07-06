
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Task, TaskTimeEntry } from '@/types';
import { Play, Pause, Square, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface TaskTimeTrackerProps {
  task: Task;
  timeEntries: TaskTimeEntry[];
  onStartTimer: (taskId: string) => void;
  onStopTimer: (taskId: string, duration: number, description?: string) => void;
  onAddTimeEntry: (taskId: string, duration: number, description?: string) => void;
}

const TaskTimeTracker = ({
  task,
  timeEntries,
  onStartTimer,
  onStopTimer,
  onAddTimeEntry
}: TaskTimeTrackerProps) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [manualDuration, setManualDuration] = useState('');
  const [manualDescription, setManualDescription] = useState('');

  // Update elapsed time every second when timer is running
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, startTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const handleStartTimer = () => {
    setStartTime(new Date());
    setElapsedTime(0);
    setIsTimerRunning(true);
    onStartTimer(task.id);
    toast.success('Timer started');
  };

  const handleStopTimer = () => {
    if (startTime) {
      const durationMinutes = Math.ceil(elapsedTime / 60);
      onStopTimer(task.id, durationMinutes);
      setIsTimerRunning(false);
      setStartTime(null);
      setElapsedTime(0);
      toast.success(`Timer stopped. Logged ${durationMinutes} minutes`);
    }
  };

  const handleAddManualTime = () => {
    const duration = parseInt(manualDuration);
    if (duration > 0) {
      onAddTimeEntry(task.id, duration, manualDescription);
      setManualDuration('');
      setManualDescription('');
      toast.success(`Added ${duration} minutes to task`);
    }
  };

  // Calculate total time spent
  const totalTimeMinutes = timeEntries
    .filter(entry => entry.taskId === task.id)
    .reduce((total, entry) => total + (entry.duration || 0), 0);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="h-4 w-4" />
          Time Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Timer Display */}
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-mono font-bold mb-2">
            {formatTime(elapsedTime)}
          </div>
          <div className="flex gap-2 justify-center">
            {!isTimerRunning ? (
              <Button onClick={handleStartTimer} className="bg-green-600 hover:bg-green-700">
                <Play className="h-4 w-4 mr-1" />
                Start Timer
              </Button>
            ) : (
              <Button onClick={handleStopTimer} className="bg-red-600 hover:bg-red-700">
                <Square className="h-4 w-4 mr-1" />
                Stop Timer
              </Button>
            )}
          </div>
        </div>

        {/* Time Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 border rounded-lg">
            <div className="text-lg font-semibold">{formatDuration(totalTimeMinutes)}</div>
            <div className="text-sm text-gray-500">Total Time</div>
          </div>
          <div className="text-center p-3 border rounded-lg">
            <div className="text-lg font-semibold">
              {task.estimatedDuration ? formatDuration(task.estimatedDuration) : 'Not set'}
            </div>
            <div className="text-sm text-gray-500">Estimated</div>
          </div>
        </div>

        {/* Manual Time Entry */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Add Time Manually</h4>
          <div className="space-y-2">
            <div>
              <Label htmlFor="manual-duration">Duration (minutes)</Label>
              <Input
                id="manual-duration"
                type="number"
                value={manualDuration}
                onChange={(e) => setManualDuration(e.target.value)}
                placeholder="Enter minutes"
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="manual-description">Description (optional)</Label>
              <Input
                id="manual-description"
                value={manualDescription}
                onChange={(e) => setManualDescription(e.target.value)}
                placeholder="What did you work on?"
              />
            </div>
            <Button 
              onClick={handleAddManualTime} 
              disabled={!manualDuration || parseInt(manualDuration) <= 0}
              className="w-full"
            >
              Add Time Entry
            </Button>
          </div>
        </div>

        {/* Recent Time Entries */}
        {timeEntries.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Recent Time Entries</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {timeEntries
                .filter(entry => entry.taskId === task.id)
                .slice(-5)
                .map(entry => (
                  <div key={entry.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <span>{entry.description || 'Work session'}</span>
                    <Badge variant="outline">{formatDuration(entry.duration || 0)}</Badge>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskTimeTracker;
