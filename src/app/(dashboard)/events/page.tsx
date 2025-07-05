import Link from "next/link";
import Image from "next/image";

// Mock data for events
const events = [
  {
    id: 1,
    title: "NYC Hustle Social",
    date: "June 25, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "Manhattan Dance Studio",
    address: "123 Broadway, New York, NY",
    price: "$15",
    image: "https://placehold.co/600x400/indigo/white?text=NYC+Hustle",
    organizer: "NYC Hustle Community",
    description: "Weekly social dance for Hustle dancers of all levels. Beginner lesson included.",
  },
  {
    id: 2,
    title: "LA Hustle Workshop",
    date: "July 2, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "LA Dance Center",
    address: "456 Sunset Blvd, Los Angeles, CA",
    price: "$40",
    image: "https://placehold.co/600x400/purple/white?text=LA+Workshop",
    organizer: "LA Hustle Collective",
    description: "Intermediate level workshop focusing on musicality and styling.",
  },
  {
    id: 3,
    title: "London Hustle Congress",
    date: "July 15-17, 2025",
    time: "All day",
    location: "London Dance Convention Center",
    address: "789 Oxford St, London, UK",
    price: "£120",
    image: "https://placehold.co/600x400/blue/white?text=London+Congress",
    organizer: "European Hustle Association",
    description: "Annual congress featuring workshops, competitions, and social dancing with international instructors.",
  },
  {
    id: 4,
    title: "Paris Hustle Social",
    date: "July 5, 2025",
    time: "8:00 PM - 12:00 AM",
    location: "Studio Parisienne",
    address: "42 Rue de Rivoli, Paris, France",
    price: "€10",
    image: "https://placehold.co/600x400/teal/white?text=Paris+Social",
    organizer: "Paris Hustle Club",
    description: "Monthly social dance with DJ and light refreshments.",
  },
  {
    id: 5,
    title: "Chicago Hustle Exchange",
    date: "July 10, 2025",
    time: "7:00 PM - 10:00 PM",
    location: "Windy City Dance Hall",
    address: "567 Michigan Ave, Chicago, IL",
    price: "$20",
    image: "https://placehold.co/600x400/orange/white?text=Chicago+Exchange",
    organizer: "Chicago Dance Collective",
    description: "Cultural exchange event featuring Hustle and other partner dances.",
  },
  {
    id: 6,
    title: "Miami Hustle on the Beach",
    date: "July 20, 2025",
    time: "6:00 PM - 10:00 PM",
    location: "South Beach Pavilion",
    address: "Ocean Drive, Miami Beach, FL",
    price: "Free",
    image: "https://placehold.co/600x400/pink/white?text=Miami+Beach",
    organizer: "Miami Dance Scene",
    description: "Outdoor Hustle social on the beach with live music.",
  },
];

export default function EventsPage() {
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Upcoming Hustle Events</h1>
        <Link
          href="/events/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Create Event
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              id="location"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Locations</option>
              <option value="new-york">New York</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="london">London</option>
              <option value="paris">Paris</option>
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <select
              id="date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Any Date</option>
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="next-month">Next Month</option>
            </select>
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Event Type
            </label>
            <select
              id="type"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Types</option>
                <option value="classes">Classes</option>
              <option value="social">Social Dance</option>
              <option value="workshop">Workshop</option>
              <option value="congress">Congress</option>
              <option value="competition">Competition</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <select
              id="price"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Any Price</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
              <option value="donation">Donation-based</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 relative">
              <Image
                src={event.image}
                alt={event.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-1">{event.date}</p>
              <p className="text-gray-600 mb-1">{event.time}</p>
              <p className="text-gray-600 mb-4">{event.location}</p>
              <div className="flex justify-between items-center">
                <span className="font-medium">{event.price}</span>
                <Link
                  href={`/events/${event.id}`}
                  className="text-indigo-600 font-medium hover:text-indigo-800"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center">
          <a
            href="#"
            className="px-3 py-1 rounded-md mr-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="px-3 py-1 rounded-md mx-1 border border-indigo-500 bg-indigo-500 text-white"
          >
            1
          </a>
          <a
            href="#"
            className="px-3 py-1 rounded-md mx-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
          >
            2
          </a>
          <a
            href="#"
            className="px-3 py-1 rounded-md mx-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
          >
            3
          </a>
          <span className="px-3 py-1 mx-1 text-gray-500">...</span>
          <a
            href="#"
            className="px-3 py-1 rounded-md mx-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
          >
            8
          </a>
          <a
            href="#"
            className="px-3 py-1 rounded-md ml-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
          >
            Next
          </a>
        </nav>
      </div>
    </div>
  );
}
