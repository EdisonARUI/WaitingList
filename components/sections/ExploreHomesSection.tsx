'use client';

import { Card, CardContent } from '@/components/ui/card';

// TypeScript interface for property data
interface PropertyData {
  location: string;
  description: string;
  icon: string;
  gradient: string;
}

export default function ExploreHomesSection() {
  // Properties data - migrated from data.js
  const propertiesData: PropertyData[] = [
    {
      location: 'Austin, Texas',
      description: 'Modern 3-bedroom townhome in growing tech hub area with excellent schools and amenities.',
      icon: '🏘️',
      gradient: 'from-blue-200 to-blue-300'
    },
    {
      location: 'Denver, Colorado',
      description: 'Charming 2-bedroom condo with mountain views, close to downtown and outdoor recreation.',
      icon: '🏡',
      gradient: 'from-green-200 to-green-300'
    },
    {
      location: 'Raleigh, North Carolina',
      description: 'Spacious 4-bedroom single-family home in family-friendly neighborhood with great schools.',
      icon: '🏠',
      gradient: 'from-purple-200 to-purple-300'
    },
    {
      location: 'Phoenix, Arizona',
      description: 'Contemporary 2-bedroom apartment with resort-style amenities and desert landscape views.',
      icon: '🏢',
      gradient: 'from-yellow-200 to-yellow-300'
    },
    {
      location: 'Nashville, Tennessee',
      description: 'Historic 3-bedroom home renovated with modern amenities in vibrant music district.',
      icon: '🏘️',
      gradient: 'from-indigo-200 to-indigo-300'
    },
    {
      location: 'Tampa, Florida',
      description: 'Beachside 2-bedroom condo with ocean access and year-round sunshine lifestyle.',
      icon: '🏡',
      gradient: 'from-pink-200 to-pink-300'
    }
  ];

  return (
    <section className="explore-homes-section bg-gray-50 min-h-screen flex items-center py-16">
      <div className="container mx-auto px-4">
        <div className="section-header text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Future Homes
          </h2>
          <p className="section-subtitle text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the types of properties that will be available through our shared ownership program
          </p>
        </div>
        
        <div className="properties-grid grid md:grid-cols-3 gap-6 mb-8">
          {propertiesData.map((property, index) => (
            <Card key={index} className="property-card bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className={`property-image bg-gradient-to-br ${property.gradient} h-48 flex items-center justify-center`}>
                <span className="text-4xl">{property.icon}</span>
              </div>
              <CardContent className="property-content p-4">
                <h3 className="property-location text-lg font-semibold text-gray-900 mb-2">
                  {property.location}
                </h3>
                <p className="property-description text-gray-600 text-sm mb-3">
                  {property.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 