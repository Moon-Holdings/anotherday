
import Header from '@/components/header';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="container px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-rootina-blue flex items-center justify-center text-white text-xl">
              B
            </div>
            <div>
              <h2 className="text-xl font-semibold">Brandon</h2>
              <p className="text-gray-500">Manager</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Personal Information</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" defaultValue="Brandon Smith" className="w-full px-3 py-2 border rounded-md" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" defaultValue="brandon@example.com" className="w-full px-3 py-2 border rounded-md" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" defaultValue="(555) 123-4567" className="w-full px-3 py-2 border rounded-md" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input type="text" defaultValue="Restaurant Manager" className="w-full px-3 py-2 border rounded-md" readOnly />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Work Information</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                    <input type="text" defaultValue="EMP-2023-001" className="w-full px-3 py-2 border rounded-md" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <input type="text" defaultValue="Management" className="w-full px-3 py-2 border rounded-md" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input type="text" defaultValue="January 15, 2021" className="w-full px-3 py-2 border rounded-md" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reports To</label>
                    <input type="text" defaultValue="Sarah Johnson, Regional Manager" className="w-full px-3 py-2 border rounded-md" readOnly />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-rootina-blue text-white rounded-md hover:bg-blue-600 transition-colors">
                Request Information Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
