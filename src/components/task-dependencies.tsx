
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Task, TaskDependency } from '@/types';
import { Plus, X, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface TaskDependenciesProps {
  task: Task;
  allTasks: Task[];
  dependencies: TaskDependency[];
  onAddDependency: (prerequisiteTaskId: string) => void;
  onRemoveDependency: (dependencyId: string) => void;
}

const TaskDependencies = ({
  task,
  allTasks,
  dependencies,
  onAddDependency,
  onRemoveDependency
}: TaskDependenciesProps) => {
  const [selectedPrerequisite, setSelectedPrerequisite] = useState('');

  // Get tasks that are prerequisites for this task
  const prerequisiteTasks = dependencies
    .filter(dep => dep.dependentTaskId === task.id)
    .map(dep => allTasks.find(t => t.id === dep.prerequisiteTaskId))
    .filter(Boolean) as Task[];

  // Get available tasks that can be prerequisites (exclude self and existing dependencies)
  const availableTasks = allTasks.filter(t => 
    t.id !== task.id && 
    !prerequisiteTasks.some(prereq => prereq.id === t.id) &&
    t.department === task.department
  );

  const handleAddDependency = () => {
    if (!selectedPrerequisite) return;
    
    onAddDependency(selectedPrerequisite);
    setSelectedPrerequisite('');
    toast.success('Dependency added successfully');
  };

  const handleRemoveDependency = (prerequisiteTaskId: string) => {
    const dependency = dependencies.find(
      dep => dep.dependentTaskId === task.id && dep.prerequisiteTaskId === prerequisiteTaskId
    );
    if (dependency) {
      onRemoveDependency(dependency.id);
      toast.success('Dependency removed');
    }
  };

  // Check if task is blocked by incomplete prerequisites
  const isBlocked = prerequisiteTasks.some(prereq => !prereq.isCompleted);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          Task Dependencies
          {isBlocked && <AlertTriangle className="h-4 w-4 text-orange-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isBlocked && (
          <div className="flex items-center gap-2 p-2 bg-orange-50 border border-orange-200 rounded-md">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-orange-700">
              This task is blocked by incomplete prerequisites
            </span>
          </div>
        )}

        {/* Current Prerequisites */}
        {prerequisiteTasks.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Prerequisites:</h4>
            <div className="space-y-2">
              {prerequisiteTasks.map(prereq => (
                <div key={prereq.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-2">
                    <Badge variant={prereq.isCompleted ? 'default' : 'secondary'}>
                      {prereq.isCompleted ? 'Completed' : 'Pending'}
                    </Badge>
                    <span className="text-sm">{prereq.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveDependency(prereq.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Dependency */}
        {availableTasks.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Add Prerequisite:</h4>
            <div className="flex gap-2">
              <Select value={selectedPrerequisite} onValueChange={setSelectedPrerequisite}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a task that must be completed first" />
                </SelectTrigger>
                <SelectContent>
                  {availableTasks.map(availableTask => (
                    <SelectItem key={availableTask.id} value={availableTask.id}>
                      {availableTask.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddDependency} disabled={!selectedPrerequisite}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {availableTasks.length === 0 && prerequisiteTasks.length === 0 && (
          <p className="text-sm text-gray-500">No dependencies available for this task.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskDependencies;
