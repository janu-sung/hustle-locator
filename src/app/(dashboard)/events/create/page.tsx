"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [eventType, setEventType] = useState("social");
  const [level, setLevel] = useState("all");
  const [pricingType, setPricingType] = useState("fixed");
  
  // Amenities checkboxes
  const [amenities, setAmenities] = useState({
    beginnerLesson: false,
    bar: false,
    seating: false,
    airConditioning: false,
    coatCheck: false,
    waterProvided: false,
    videoAllowed: false,
    parking: false,
  });
  
  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmenities({
      ...amenities,
      [e.target.name]: e.target.checked,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Collect form data
    const eventData = {
      title,
      description,
      date,
      time: `${startTime} - ${endTime}`,
      location,
      address,
      price: pricingType === "free" ? "Free" : price,
      capacity: parseInt(capacity),
      type: eventType,
      level,
      amenities: Object.entries(amenities)
        .filter(([_, value]) => value)
        .map(([key, _]) => {
          // Convert camelCase to readable format
          return key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
        }),
      pricingType,
    };
    
    console.log("Creating event:", eventData);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Redirect to events page after successful creation
      router.push("/events");
    }, 1000);
    
    // In a real implementation, we would use Supabase to store the event
    // const { data, error } = await supabase
    //   .from('events')
    //   .insert([eventData])
    //   .select();
    
    // if (error) {
    //   console.error("Error creating event:", error);
    //   setLoading(false);
    //   return;
    // }
    
    // router.push(`/events/${data[0].id}`);
  };
  
  return (
    <div className="py-8">
      <div className="mb-8">
        <Link href="/events" className="text-indigo-600 hover:text-indigo-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Events
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-6">Create a New Event</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="e.g., NYC Hustle Social"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Description *
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Describe your event, including what attendees can expect"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                    End Time *
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="social">Social Dance</option>
                    <option value="workshop">Workshop</option>
                    <option value="congress">Congress</option>
                    <option value="competition">Competition</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level *
                  </label>
                  <select
                    id="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Location */}
          <div>
            <h2 className="text-xl font-bold mb-4">Location</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Venue Name *
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="e.g., Manhattan Dance Studio"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Full address including city, state, and zip code"
                />
              </div>
              
              <div className="h-64 bg-gray-200 rounded-lg">
                {/* Map would go here in a real implementation */}
                <div className="h-full flex items-center justify-center text-gray-500">
                  Map View (Google Maps integration would be here)
                </div>
              </div>
            </div>
          </div>
          
          {/* Pricing & Capacity */}
          <div>
            <h2 className="text-xl font-bold mb-4">Pricing & Capacity</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pricing Type *
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      id="fixed"
                      name="pricingType"
                      type="radio"
                      value="fixed"
                      checked={pricingType === "fixed"}
                      onChange={() => setPricingType("fixed")}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="fixed" className="ml-2 block text-sm text-gray-700">
                      Fixed Price
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="sliding"
                      name="pricingType"
                      type="radio"
                      value="sliding"
                      checked={pricingType === "sliding"}
                      onChange={() => setPricingType("sliding")}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="sliding" className="ml-2 block text-sm text-gray-700">
                      Sliding Scale
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="donation"
                      name="pricingType"
                      type="radio"
                      value="donation"
                      checked={pricingType === "donation"}
                      onChange={() => setPricingType("donation")}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="donation" className="ml-2 block text-sm text-gray-700">
                      Donation-based
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="free"
                      name="pricingType"
                      type="radio"
                      value="free"
                      checked={pricingType === "free"}
                      onChange={() => setPricingType("free")}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="free" className="ml-2 block text-sm text-gray-700">
                      Free
                    </label>
                  </div>
                </div>
              </div>
              
              {pricingType !== "free" && (
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    {pricingType === "fixed" ? "Price *" : pricingType === "sliding" ? "Suggested Price *" : "Suggested Donation *"}
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required={pricingType !== "free"}
                      className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="0.00"
                      aria-describedby="price-currency"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm" id="price-currency">
                        USD
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity *
                </label>
                <input
                  type="number"
                  id="capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                  min="1"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Maximum number of attendees"
                />
              </div>
            </div>
          </div>
          
          {/* Amenities */}
          <div>
            <h2 className="text-xl font-bold mb-4">Amenities</h2>
            <p className="text-sm text-gray-500 mb-4">
              Select all amenities that will be available at your event
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="beginnerLesson"
                    name="beginnerLesson"
                    type="checkbox"
                    checked={amenities.beginnerLesson}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="beginnerLesson" className="font-medium text-gray-700">
                    Beginner Lesson
                  </label>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="bar"
                    name="bar"
                    type="checkbox"
                    checked={amenities.bar}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="bar" className="font-medium text-gray-700">
                    Bar / Refreshments
                  </label>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="seating"
                    name="seating"
                    type="checkbox"
                    checked={amenities.seating}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="seating" className="font-medium text-gray-700">
                    Seating Area
                  </label>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="airConditioning"
                    name="airConditioning"
                    type="checkbox"
                    checked={amenities.airConditioning}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="airConditioning" className="font-medium text-gray-700">
                    Air Conditioning
                  </label>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="coatCheck"
                    name="coatCheck"
                    type="checkbox"
                    checked={amenities.coatCheck}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="coatCheck" className="font-medium text-gray-700">
                    Coat Check
                  </label>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="waterProvided"
                    name="waterProvided"
                    type="checkbox"
                    checked={amenities.waterProvided}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="waterProvided" className="font-medium text-gray-700">
                    Water Provided
                  </label>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="videoAllowed"
                    name="videoAllowed"
                    type="checkbox"
                    checked={amenities.videoAllowed}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="videoAllowed" className="font-medium text-gray-700">
                    Video Recording Allowed
                  </label>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="parking"
                    name="parking"
                    type="checkbox"
                    checked={amenities.parking}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="parking" className="font-medium text-gray-700">
                    Parking Available
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image Upload - Placeholder */}
          <div>
            <h2 className="text-xl font-bold mb-4">Event Image</h2>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
