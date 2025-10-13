import React from 'react';
import { Link } from 'react-router-dom';
import { Code, ArrowRight, Shield, Zap, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const CustomDevelopmentPage = () => {
  const features = [
    {
      icon: Code,
      title: 'End-to-end Delivery',
      description: 'From discovery to launch and support, we handle the complete development lifecycle.',
      list: ['Requirements analysis', 'Architecture design', 'Development & QA', 'Deployment support']
    },
    {
      icon: Zap,
      title: 'Agile Development',
      description: 'Iterative approach with regular releases and continuous feedback integration.',
      list: ['2-week sprints', 'Regular demos', 'Flexible planning', 'Continuous delivery']
    },
    {
      icon: Shield,
      title: 'Quality & Security',
      description: 'Comprehensive testing and security measures throughout development.',
      list: ['Automated testing', 'Security audits', 'Code reviews', 'Performance checks']
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Senior developers with deep expertise in modern technologies.',
      list: ['Solution architects', 'Senior developers', 'QA engineers', 'DevOps specialists']
    }
  ];

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover-lift border-0 bg-white p-6">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-xl bg-blue-500 text-white">
            <Code className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-gray-900 mb-1">
              Custom Development
            </CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              End-to-end Software Development
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 mb-6 leading-relaxed">
          End‑to‑end delivery of reliable, scalable applications — from discovery to launch and support.
          We take full ownership of your project to deliver value faster.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white border border-gray-100">
              <CardHeader className="p-6 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {React.createElement(feature.icon, { className: "h-5 w-5 text-primary" })}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-2">
                  {feature.list.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button asChild variant="outline" className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
            <Link to="/contact">
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomDevelopmentPage;
