"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabase";

export default function ProfilePage() {
  // Mock user data
  const [user, setUser] = useState({
    name: "Jane Dancer",
    email: "jane.dancer@example.com",
    location: "New York, NY",
    bio: "Hustle dancer for 5 years. Love social dancing and traveling to events around the world.",
    experience: "intermediate",
    profileImage: "https://placehold.co/400x400/indigo/white?text=JD",
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      newsletterSubscription: true,
      publicProfile: true,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Mock user's events
  const userEvents = [
    {
      id: 1,
      title: "NYC Hustle Social",
      date: "June 25, 2025",
      role: "Attendee",
      status: "Registered",
    },
    {
      id: 2,
      title: "LA Hustle Workshop",
      date: "July 2, 2025",
      role: "Organizer",
      status: "Published",
    },
    {
      id: 3,
      title: "Chicago Hustle Exchange",
      date: "July 10, 2025",
      role: "Attendee",
      status: "Waitlisted",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        [name]: checked,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real implementation, we would update the user profile in Supabase
      // const { error } = await supabase
      //   .from('profiles')
      //   .update({
      //     name: formData.name,
      //     location: formData.location,
      //     bio: formData.bio,
      //     experience: formData.experience,
      //     preferences: formData.preferences,
      //   })
      //   .eq('id', user.id);
      
      // if (error) throw error;
      
      setUser(formData);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {successMessage && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{successMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Profile Information</h2>
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(user);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="h-20 w-20 rounded-full overflow-hidden mr-6">
                    <Image
                      src={user.profileImage}
                      alt={user.name}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{user.name}</h3>
                    <p className="text-gray-600">{user.location}</p>
                    <p className="text-gray-600">
                      Experience: {user.experience.charAt(0).toUpperCase() + user.experience.slice(1)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">About</h4>
                  <p className="text-gray-700">{user.bio}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Contact Information</h4>
                  <p className="text-gray-700">Email: {user.email}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Notification Preferences</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>
                      Email notifications: {user.preferences.emailNotifications ? "Enabled" : "Disabled"}
                    </li>
                    <li>
                      SMS notifications: {user.preferences.smsNotifications ? "Enabled" : "Disabled"}
                    </li>
                    <li>
                      Newsletter subscription: {user.preferences.newsletterSubscription ? "Subscribed" : "Unsubscribed"}
                    </li>
                    <li>
                      Public profile: {user.preferences.publicProfile ? "Visible to others" : "Private"}
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="h-20 w-20 rounded-full overflow-hidden mr-6">
                    <Image
                      src={formData.profileImage}
                      alt={formData.name}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Change profile picture
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    About
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Dance Experience
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Notification Preferences</h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="emailNotifications"
                          name="emailNotifications"
                          type="checkbox"
                          checked={formData.preferences.emailNotifications}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                          Email notifications
                        </label>
                        <p className="text-gray-500">Receive emails about events, RSVPs, and updates.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="smsNotifications"
                          name="smsNotifications"
                          type="checkbox"
                          checked={formData.preferences.smsNotifications}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="smsNotifications" className="font-medium text-gray-700">
                          SMS notifications
                        </label>
                        <p className="text-gray-500">Receive text messages for important updates.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="newsletterSubscription"
                          name="newsletterSubscription"
                          type="checkbox"
                          checked={formData.preferences.newsletterSubscription}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="newsletterSubscription" className="font-medium text-gray-700">
                          Newsletter subscription
                        </label>
                        <p className="text-gray-500">Receive our monthly newsletter with dance tips and community updates.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="publicProfile"
                          name="publicProfile"
                          type="checkbox"
                          checked={formData.preferences.publicProfile}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="publicProfile" className="font-medium text-gray-700">
                          Public profile
                        </label>
                        <p className="text-gray-500">Allow other dancers to see your profile and connect with you.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Your Events</h2>
            <div className="space-y-4">
              {userEvents.map((event) => (
                <div key={event.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-gray-600 text-sm">{event.date}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600 text-sm">{event.role}</span>
                    <span className={`text-sm font-medium ${
                      event.status === "Registered" ? "text-green-600" :
                      event.status === "Waitlisted" ? "text-yellow-600" :
                      "text-indigo-600"
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a
                href="/events"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View all events →
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Account Settings</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-indigo-600 block py-1"
                >
                  Change Password
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-indigo-600 block py-1"
                >
                  Connected Accounts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-indigo-600 block py-1"
                >
                  Billing Information
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-red-600 hover:text-red-800 block py-1"
                >
                  Delete Account
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
