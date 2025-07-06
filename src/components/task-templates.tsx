
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TaskTemplate, Department } from '@/types';
import { FileText, Plus, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface TaskTemplatesProps {
  templates: TaskTemplate[];
  selectedDepartment?: Department;
  onCreateFromTemplate: (template: TaskTemplate) => void;
  onCreateTemplate?: () => void;
}

const TaskTemplates = ({
  templates,
  selectedDepartment,
  onCreateFromTemplate,
  onCreateTemplate
}: TaskTemplatesProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  // Filter templates by department
  const filteredTemplates = templates.filter(template => 
    template.isActive && 
    (!selectedDepartment || template.department === selectedDepartment)
  );

  const handleCreateFromTemplate = () => {
    const template = filteredTemplates.find(t => t.id === selectedTemplate);
    if (template) {
      onCreateFromTemplate(template);
      setSelectedTemplate('');
      toast.success(`Task created from template: ${template.name}`);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'Not set';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Task Templates
          </div>
          {onCreateTemplate && (
            <Button variant="outline" size="sm" onClick={onCreateTemplate}>
              <Plus className="h-4 w-4 mr-1" />
              New Template
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No templates available for this department</p>
            {onCreateTemplate && (
              <Button variant="outline" className="mt-2" onClick={onCreateTemplate}>
                Create First Template
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Quick Create Section */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Quick Create from Template</h4>
              <div className="flex gap-2">
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredTemplates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleCreateFromTemplate}
                  disabled={!selectedTemplate}
                >
                  Create Task
                </Button>
              </div>
            </div>

            {/* Templates List */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Available Templates</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredTemplates.map(template => (
                  <div 
                    key={template.id} 
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onCreateFromTemplate(template)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{template.name}</h5>
                        {template.description && (
                          <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                        )}
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Badge 
                          variant="outline" 
                          className={`text-white ${getPriorityColor(template.priority)}`}
                        >
                          {template.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="capitalize">{template.department}</span>
                      {template.shift && template.shiftAction && (
                        <span className="capitalize">
                          {template.shift} {template.shiftAction}
                        </span>
                      )}
                      {template.estimatedDuration && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDuration(template.estimatedDuration)}
                        </div>
                      )}
                    </div>

                    {template.checklistItems && template.checklistItems.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">
                          {template.checklistItems.length} checklist items
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskTemplates;
