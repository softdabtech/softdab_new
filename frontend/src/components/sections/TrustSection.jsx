import React from 'react';

const TrustSection = () => {
  const stats = [
    { number: '5+', label: 'Years Experience' },
    { number: '100+', label: 'Projects Delivered' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '50+', label: 'Happy Clients' }
  ];

  const technologies = [
    { 
      name: 'C++', 
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg' 
    },
    { 
      name: 'C#', 
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg' 
    },
    { 
      name: 'JavaScript', 
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg' 
    },
    { 
      name: 'Node.js', 
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg' 
    },
    { 
      name: 'Python', 
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' 
    },
    { 
      name: 'IoT', 
      icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/raspberrypi.svg' 
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="border-t border-gray-200 pt-12">
          <div className="text-center mb-8">
            <p className="text-gray-600 font-medium mb-6">Tools & Platforms we work with</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center w-16 h-16 group"
                title={tech.name}
              >
                <img 
                  src={tech.icon}
                  alt={tech.name}
                  className="w-12 h-12 object-contain filter grayscale opacity-60 group-hover:opacity-100 group-hover:filter-none transition-all duration-300"
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">We select the stack based on your product goals.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;