# Project Brief Update
## July 5, 2025

## Overview of the Hustle Locator Web App

The Hustle Locator Web App is a platform designed to connect Hustle dance enthusiasts with events worldwide. It allows users to discover, create, and manage Hustle dance events, serving as a central hub for the global Hustle dance community.

## Application Architecture

### Frontend

1. **Framework**: Next.js 15.3.4
   - Uses the App Router architecture (introduced in Next.js 13+)
   - Built with TypeScript for type safety
   - Uses React as the underlying UI library

2. **UI Components**:
   - Custom React components organized in a component-based architecture
   - Tailwind CSS for styling
   - Responsive design that works across different device sizes

3. **Routing Structure**:
   - `/` - Homepage with featured events and introduction
   - `/events` - List of all upcoming events with filtering options
   - `/events/[id]` - Dynamic route for individual event details
   - `/events/create` - Form to create new events
   - `/profile` - User profile management
   - `/(auth)/login` and `/(auth)/register` - Authentication pages

4. **Key Components**:
   - `Navbar.tsx` - Main navigation component
   - Various page components for different routes
   - Image components for event thumbnails and banners

5. **File Naming Convention**:
   - Files named `page.tsx` are a Next.js App Router convention
   - In the App Router, each folder represents a route segment
   - The `page.tsx` file within each folder defines the UI for that route
   - This is not a general TypeScript convention but specific to Next.js App Router

### Backend

1. **Database**: Supabase (PostgreSQL-based)
   - Stores event data, user profiles, and authentication information
   - Provides real-time capabilities for live updates

2. **Authentication**:
   - Implemented through Supabase Auth
   - Supports email/password login and potentially social logins

3. **API Layer**:
   - Currently using mock data for development
   - Will eventually connect to Supabase for real data
   - API routes will be implemented for server-side operations

4. **Configuration**:
   - Environment variables stored in `.env.local`
   - Next.js configuration in `next.config.js`

## Frontend-Backend Connection

1. **Data Flow**:
   - Frontend components request data through utility functions
   - These utility functions will eventually connect to Supabase client
   - Currently using mock data for development purposes

2. **Authentication Flow**:
   - Login/Register pages collect user credentials
   - Credentials are validated against Supabase Auth
   - JWT tokens are stored for maintaining sessions

3. **Supabase Integration**:
   - Supabase client initialized in `src/utils/supabase.ts`
   - This client is used throughout the application to interact with the database
   - Environment variables store Supabase URL and API keys

## Issues Encountered and Solutions

### 1. SVG Loading Error

**Issue**: The application was encountering errors when trying to load SVG images.

**Solution**: Updated the Next.js configuration in `next.config.js` to properly handle SVG images:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
```
This configuration allows SVG images to be loaded with appropriate security settings.

### 2. Dynamic Route Parameter Issue

**Issue**: In the event detail page (`/events/[id]/page.tsx`), there was an error with handling the dynamic route parameter:
```
Error: Route "/events/[id]" used `params.id`. `params` should be awaited before using its properties.
```

**Solution**: 
1. Made the component async:
```typescript
export default async function EventDetailPage({ params }: { params: { id: string } }) {
```

2. Made the `getEventById` function async:
```typescript
const getEventById = async (id: string) => {
```

3. Added proper handling of the params.id by awaiting it:
```typescript
const id = await Promise.resolve(params.id);
const event = await getEventById(id);
```

This solution follows Next.js App Router best practices for handling dynamic route parameters.

### 3. Image Component Warnings

**Issue**: Warnings about missing "sizes" prop in Image components:
```
Image with src "..." has "fill" but is missing "sizes" prop. Please add it to improve page performance.
```

**Status**: These are performance warnings, not critical errors. They don't affect functionality but could be addressed in future updates to improve performance.

### 4. Navigation Issues

**Issue**: The "Back to Events" link and navigation in the event detail page weren't working correctly.

**Status**: The links appear to be correctly implemented using Next.js Link components, but might need additional configuration for proper routing within the Next.js App Router structure. This could be addressed in a future update.

## Areas of Concern and Future Improvements

1. **Real Data Integration**:
   - Replace mock data with actual Supabase database queries
   - Implement proper error handling for database operations

2. **Authentication Implementation**:
   - Complete the authentication flow with Supabase
   - Add protected routes for authenticated users only

3. **Performance Optimization**:
   - Address Image component warnings by adding "sizes" prop
   - Implement proper loading states and error boundaries

4. **Navigation Fixes**:
   - Ensure all navigation links work correctly within the App Router structure
   - Implement proper client-side navigation with loading states

5. **Form Validation**:
   - Add comprehensive form validation for event creation
   - Implement error handling for form submissions

6. **Testing**:
   - Add unit tests for components and utility functions
   - Implement end-to-end testing for critical user flows

## Development Environment

- Next.js 15.3.4 with Turbopack
- TypeScript for type safety
- Tailwind CSS for styling
- Development server running on http://localhost:3001
- Environment variables stored in `.env.local`
