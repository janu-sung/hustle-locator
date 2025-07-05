import Link from "next/link";
import Image from "next/image";

// Mock data for a single event
const getEventById = async (id: string) => {
  const events = [
    {
      id: 1,
      title: "NYC Hustle Social",
      date: "June 25, 2025",
      time: "7:00 PM - 11:00 PM",
      location: "Manhattan Dance Studio",
      address: "123 Broadway, New York, NY",
      price: "$15",
      image: "https://placehold.co/1200x600/indigo/white?text=NYC+Hustle",
      organizer: "NYC Hustle Community",
      organizerImage: "https://placehold.co/100x100/gray/white?text=NYC",
      description: "Weekly social dance for Hustle dancers of all levels. Beginner lesson included. Join us for a night of fun, dancing, and community building. All levels welcome, from complete beginners to advanced dancers. The evening starts with a 45-minute beginner lesson, followed by social dancing with our resident DJ spinning the best Hustle tracks.",
      amenities: ["Beginner lesson", "Full bar", "Seating area", "Air conditioning", "Coat check"],
      capacity: 80,
      attending: 45,
      type: "Social Dance",
      level: "All Levels",
      website: "https://nyc-hustle.example.com",
    },
    {
      id: 2,
      title: "LA Hustle Workshop",
      date: "July 2, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "LA Dance Center",
      address: "456 Sunset Blvd, Los Angeles, CA",
      price: "$40",
      image: "https://placehold.co/1200x600/purple/white?text=LA+Workshop",
      organizer: "LA Hustle Collective",
      organizerImage: "https://placehold.co/100x100/gray/white?text=LA",
      description: "Intermediate level workshop focusing on musicality and styling. This workshop is designed for dancers who already know the basics of Hustle and want to improve their musicality and personal styling. The workshop will be taught by renowned Hustle champions who will share their expertise and help you take your dancing to the next level.",
      amenities: ["Water provided", "Video recording allowed", "Practice time included"],
      capacity: 30,
      attending: 18,
      type: "Workshop",
      level: "Intermediate",
      website: "https://la-hustle.example.com",
    },
    {
      id: 3,
      title: "London Hustle Congress",
      date: "July 15-17, 2025",
      time: "All day",
      location: "London Dance Convention Center",
      address: "789 Oxford St, London, UK",
      price: "£120",
      image: "https://placehold.co/1200x600/blue/white?text=London+Congress",
      organizer: "European Hustle Association",
      organizerImage: "https://placehold.co/100x100/gray/white?text=EU",
      description: "Annual congress featuring workshops, competitions, and social dancing with international instructors. Join us for the biggest Hustle event in Europe, featuring top instructors from around the world. The congress includes workshops for all levels, competitions with cash prizes, and nightly social dances with live music and DJs. Don't miss this opportunity to connect with the global Hustle community!",
      amenities: ["Hotel discounts", "Airport shuttle", "Merchandise shop", "Professional photography", "Live streaming"],
      capacity: 300,
      attending: 215,
      type: "Congress",
      level: "All Levels",
      website: "https://london-hustle.example.com",
    },
  ];

  return events.find(event => event.id === parseInt(id)) || events[0];
};

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  // In Next.js App Router, params need to be awaited
  const id = await Promise.resolve(params.id);
  const event = await getEventById(id);

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

      {/* Event Header */}
      <div className="relative h-96 rounded-xl overflow-hidden mb-8">
        <Image
          src={event.image}
          alt={event.title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <p className="text-xl mb-4">{event.date} • {event.time}</p>
            <div className="flex items-center">
              <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-2">
                {event.type}
              </div>
              <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {event.level}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">About This Event</h2>
            <p className="text-gray-700 mb-6 whitespace-pre-line">{event.description}</p>
            
            <h3 className="text-xl font-bold mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {event.amenities.map((amenity, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {amenity}
                </span>
              ))}
            </div>
            
            <h3 className="text-xl font-bold mb-3">Location</h3>
            <p className="text-gray-700 mb-2">{event.location}</p>
            <p className="text-gray-700 mb-6">{event.address}</p>
            
            <div className="h-64 bg-gray-200 rounded-lg mb-6">
              {/* Map would go here in a real implementation */}
              <div className="h-full flex items-center justify-center text-gray-500">
                Map View (Google Maps integration would be here)
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Organizer</h2>
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={event.organizerImage}
                  alt={event.organizer}
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <h3 className="font-bold">{event.organizer}</h3>
                <p className="text-gray-600 text-sm">Event Organizer</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Contact the organizer for any questions about this event.
            </p>
            <a
              href={event.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Visit organizer website →
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Date and Time</h3>
              <p className="text-gray-700">{event.date}</p>
              <p className="text-gray-700 mb-4">{event.time}</p>
              <div className="h-px bg-gray-200 my-4"></div>
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-gray-700">{event.location}</p>
              <p className="text-gray-700">{event.address}</p>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Price</h3>
                <span className="text-2xl font-bold text-indigo-600">{event.price}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {event.capacity - event.attending} spots left out of {event.capacity}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${(event.attending / event.capacity) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <button
              type="button"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 transition mb-3"
            >
              Register Now
            </button>
            
            <button
              type="button"
              className="w-full border border-indigo-600 text-indigo-600 py-3 px-4 rounded-md font-medium hover:bg-indigo-50 transition"
            >
              Save for Later
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Share This Event</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                aria-label="Share on Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500"
                aria-label="Share on Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
                aria-label="Share on WhatsApp"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                aria-label="Share via Email"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
