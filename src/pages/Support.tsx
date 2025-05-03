
import Header from '@/components/header';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';

const Support = () => {
  const [issueCategory, setIssueCategory] = useState('');
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="container px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Support</h1>
        
        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
            <TabsTrigger value="faq">FAQs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-2 space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-lg font-semibold mb-4">Submit a Support Ticket</h2>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Issue Category</label>
                        <Select value={issueCategory} onValueChange={setIssueCategory}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="account">Account Management</SelectItem>
                            <SelectItem value="billing">Billing Question</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Subject</label>
                        <Input placeholder="Brief description of your issue" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea 
                          placeholder="Please provide details about your issue..." 
                          className="min-h-[150px]" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Attachments (Optional)</label>
                        <Input type="file" className="cursor-pointer" />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit">Submit Ticket</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-rootina-blue" />
                        <a href="mailto:support@rootina.com" className="text-blue-600 hover:underline">support@rootina.com</a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-rootina-blue" />
                        <a href="tel:+18005551234" className="text-blue-600 hover:underline">(800) 555-1234</a>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-rootina-blue" />
                        <span>Live chat available 9AM-5PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">Support Hours</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>8:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                    <div className="mt-3 text-sm">
                      <p>All times are in Eastern Time (ET)</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="faq">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">How do I reset my password?</h3>
                    <p className="text-gray-600">
                      You can reset your password by clicking on the "Forgot Password" link on the login page. 
                      Follow the instructions sent to your registered email address to create a new password.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">How can I change my notification settings?</h3>
                    <p className="text-gray-600">
                      Go to your profile settings by clicking on your user icon in the top right corner, 
                      then select "Preferences". From there, you can adjust all notification preferences.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Can I access the system on mobile devices?</h3>
                    <p className="text-gray-600">
                      Yes, the Rootina platform is fully responsive and works on smartphones and tablets. 
                      Simply visit the same URL in your mobile browser. 
                      We also have dedicated iOS and Android apps available for download.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">How do I assign tasks to team members?</h3>
                    <p className="text-gray-600">
                      Navigate to the Tasks section, create a new task, and use the assignment dropdown 
                      to select team members. You can assign tasks to individuals or to specific departments.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">What should I do if I notice incorrect information in my schedule?</h3>
                    <p className="text-gray-600">
                      Contact your manager directly or submit a correction request through the 
                      schedule interface by clicking on the specific shift and selecting "Request Correction."
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Didn't find your answer?</h3>
                  <Button onClick={() => document.querySelector('[data-value="contact"]')?.click()}>
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Support;
