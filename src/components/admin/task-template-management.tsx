
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { TaskTemplate, taskScheduler } from '@/services/task-scheduler';
import { Department, ShiftType, ShiftAction, TaskRecurrence } from '@/types';

const TaskTemplateManagement = () => {
  const [templates, setTemplates] = useState<TaskTemplate[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<TaskTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    setTemplates(taskScheduler.getTemplates());
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    department: '' as Department | '',
    shift: '' as ShiftType | '',
    shiftAction: '' as ShiftAction | '',
    daysOfWeek: [] as number[],
    priority: 'medium' as const,
    estimatedDuration: 30,
    completionMethod: 'checkmark' as const,
    quantityRequired: undefined as number | undefined,
    recurrence: 'repeating' as TaskRecurrence,
    isActive: true
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      department: '' as Department | '',
      shift: '' as ShiftType | '',
      shiftAction: '' as ShiftAction | '',
      daysOfWeek: [],
      priority: 'medium',
      estimatedDuration: 30,
      completionMethod: 'checkmark',
      quantityRequired: undefined,
      recurrence: 'repeating',
      isActive: true
    });
  };

  const handleEdit = (template: TaskTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      description: template.description || '',
      department: template.department,
      shift: template.shift,
      shiftAction: template.shiftAction,
      daysOfWeek: template.daysOfWeek,
      priority: template.priority,
      estimatedDuration: template.estimatedDuration || 30,
      completionMethod: template.completionMethod,
      quantityRequired: template.quantityRequired,
      recurrence: template.recurrence,
      isActive: template.isActive
    });
    setIsCreating(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.department || !formData.shift || !formData.shiftAction) return;

    if (editingTemplate) {
      taskScheduler.updateTemplate(editingTemplate.id, formData);
    } else {
      taskScheduler.addTemplate(formData);
    }

    setTemplates(taskScheduler.getTemplates());
    setIsCreating(false);
    setEditingTemplate(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    taskScheduler.deleteTemplate(id);
    setTemplates(taskScheduler.getTemplates());
  };

  const handleDayToggle = (day: number) => {
    setFormData(prev => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter(d => d !== day)
        : [...prev.daysOfWeek, day]
    }));
  };

  const getDayName = (day: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[day];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Task Templates</h2>
        <Button onClick={() => setIsCreating(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Template</span>
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingTemplate ? 'Edit Template' : 'Create New Template'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Template Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Task template name"
                />
              </div>

              <div>
                <Label>Department</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value as Department }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="floor">Floor</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="bar">Bar</SelectItem>
                    <SelectItem value="takeaway">Takeaway</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Shift</Label>
                <Select value={formData.shift} onValueChange={(value) => setFormData(prev => ({ ...prev, shift: value as ShiftType }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Shift Action</Label>
                <Select value={formData.shiftAction} onValueChange={(value) => setFormData(prev => ({ ...prev, shiftAction: value as ShiftAction }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="opening">Opening</SelectItem>
                    <SelectItem value="closing">Closing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Estimated Duration (minutes)</Label>
                <Input
                  type="number"
                  value={formData.estimatedDuration}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimatedDuration: parseInt(e.target.value) }))}
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Task description"
              />
            </div>

            <div>
              <Label>Days of Week</Label>
              <div className="flex space-x-2 mt-2">
                {[0, 1, 2, 3, 4, 5, 6].map(day => (
                  <Button
                    key={day}
                    type="button"
                    variant={formData.daysOfWeek.includes(day) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleDayToggle(day)}
                  >
                    {getDayName(day)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
              />
              <Label>Active Template</Label>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Template</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsCreating(false);
                  setEditingTemplate(null);
                  resetForm();
                }}
                className="flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {templates.map(template => (
          <Card key={template.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold">{template.name}</h3>
                    <Badge variant={template.isActive ? "default" : "secondary"}>
                      {template.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline">{template.priority}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{template.department} - {template.shift} {template.shiftAction}</span>
                    <span>Days: {template.daysOfWeek.map(d => getDayName(d)).join(', ')}</span>
                    <span>{template.estimatedDuration}min</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(template)}
                    className="flex items-center space-x-1"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(template.id)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaskTemplateManagement;
