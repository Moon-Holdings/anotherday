
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TaskComment } from '@/types';
import { MessageSquare, Reply, Send } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface TaskCommentsProps {
  taskId: string;
  comments: TaskComment[];
  currentUserId: string;
  currentUserName: string;
  onAddComment: (taskId: string, content: string, parentId?: string) => void;
}

const TaskComments = ({
  taskId,
  comments,
  currentUserId,
  currentUserName,
  onAddComment
}: TaskCommentsProps) => {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // Filter and organize comments for this task
  const taskComments = comments.filter(comment => comment.taskId === taskId);
  const topLevelComments = taskComments.filter(comment => !comment.parentId);

  const getCommentReplies = (commentId: string) => {
    return taskComments.filter(comment => comment.parentId === commentId);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(taskId, newComment.trim());
      setNewComment('');
      toast.success('Comment added');
    }
  };

  const handleAddReply = (parentId: string) => {
    if (replyContent.trim()) {
      onAddComment(taskId, replyContent.trim(), parentId);
      setReplyContent('');
      setReplyTo(null);
      toast.success('Reply added');
    }
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <MessageSquare className="h-4 w-4" />
          Comments ({taskComments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Comment */}
        <div className="space-y-2">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="min-h-[80px]"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              size="sm"
            >
              <Send className="h-4 w-4 mr-1" />
              Comment
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {topLevelComments.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No comments yet. Be the first to add one!
            </p>
          ) : (
            topLevelComments.map(comment => (
              <div key={comment.id} className="space-y-2">
                {/* Main Comment */}
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {getUserInitials(comment.userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.userName}</span>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                      className="h-6 px-2 text-xs"
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>

                {/* Replies */}
                {getCommentReplies(comment.id).map(reply => (
                  <div key={reply.id} className="ml-8 flex gap-3 p-3 bg-white border rounded-lg">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {getUserInitials(reply.userName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{reply.userName}</span>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm">{reply.content}</p>
                    </div>
                  </div>
                ))}

                {/* Reply Form */}
                {replyTo === comment.id && (
                  <div className="ml-8 space-y-2">
                    <Textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="min-h-[60px]"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setReplyTo(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleAddReply(comment.id)}
                        disabled={!replyContent.trim()}
                        size="sm"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskComments;
