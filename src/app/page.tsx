import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Mock data for featured events
  const featuredEvents = [
    {
      id: 1,
      title: "NYC Hustle Social",
      date: "June 25, 2025",
      location: "Manhattan, NY",
      image: "https://placehold.co/600x400/indigo/white?text=NYC+Hustle",
    },
    {
      id: 2,
      title: "LA Hustle Workshop",
      date: "July 2, 2025",
      location: "Los Angeles, CA",
      image: "https://placehold.co/600x400/purple/white?text=LA+Workshop",
    },
    {
      id: 3,
      title: "London Hustle Congress",
      date: "July 15-17, 2025",
      location: "London, UK",
      image: "https://placehold.co/600x400/blue/white?text=London+Congress",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Connect with the Global Hustle Dance Community
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover, create, and manage Hustle dance events worldwide. Your central hub for all things Hustle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/events" 
              className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium text-lg hover:bg-gray-100 transition"
            >
              Find Events
            </Link>
            <Link 
              href="/register" 
              className="bg-indigo-700 text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-indigo-800 transition"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
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
                  <p className="text-gray-600 mb-4">{event.location}</p>
                  <Link
                    href={`/events/${event.id}`}
                    className="text-indigo-600 font-medium hover:text-indigo-800"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/events"
              className="inline-block border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-indigo-600 hover:text-white transition"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Hustle Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Effortless Discovery</h3>
              <p className="text-gray-600">Find relevant Hustle events within seconds, whether you're at home or traveling.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Simplified Event Management</h3>
              <p className="text-gray-600">Create and manage events with powerful tools for RSVPs, capacity, and payments.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Community Connection</h3>
              <p className="text-gray-600">Connect with dancers, instructors, and organizers from around the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to join the Hustle community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create your profile today and start discovering events, connecting with dancers, and growing the global Hustle community.
          </p>
          <Link
            href="/register"
            className="bg-white text-indigo-600 px-8 py-4 rounded-md font-medium text-lg hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
