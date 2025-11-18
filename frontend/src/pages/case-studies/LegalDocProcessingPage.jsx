import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Brain, Search, CheckSquare } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const LegalDocProcessingPage = () => {
  useEffect(() => {
    document.title = 'AI-Powered Legal Document Processing Case Study | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Discover how we built an AI-powered solution for extracting and analyzing legal documents, improving efficiency and accuracy in legal document processing.';
    }
  }, []);

  const technologies = ['AI', 'NLP', 'Python', 'FastAPI'];
  const deliverables = [
    'Document classification system',
    'Text extraction engine',
    'Named entity recognition',
    'Automated summary generation',
    'Integration API'
  ];
  const outcomes = [
    '90% reduction in document processing time',
    'Improved accuracy in data extraction',
    'Automated compliance checking',
    'Standardized document analysis',
    'Reduced manual review requirements'
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/case-studies" className="hover:text-primary">Case Studies</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Legal Document Processing</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/case-studies">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Automated Legal Document Processing</h1>
            <p className="text-xl text-gray-600 mb-6">
              AI-powered solution for extracting and analyzing legal documents.
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>

          {/* Project Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We developed an advanced AI-powered platform that automates the processing and analysis of legal documents. 
                The system uses natural language processing and machine learning to extract key information, identify entities, 
                and generate summaries from various types of legal documents.
              </p>
            </CardContent>
          </Card>

          {/* Challenges & Solutions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Challenges & Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Complex Document Structure</h3>
                  <p className="text-gray-600">
                    Implemented advanced NLP algorithms to accurately parse and understand various 
                    document formats and legal terminology.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Accuracy Requirements</h3>
                  <p className="text-gray-600">
                    Developed a hybrid approach combining rule-based systems with machine learning 
                    models to ensure high accuracy in data extraction.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Scale and Performance</h3>
                  <p className="text-gray-600">
                    Built a scalable architecture capable of processing thousands of documents 
                    simultaneously while maintaining fast response times.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deliverables */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Key Deliverables</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Outcomes */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Business Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center px-4">
            <h2 className="text-2xl font-bold mb-4">Ready to Automate Your Document Processing?</h2>
            <p className="text-gray-600 mb-6">
              Let's discuss how we can help you implement AI-powered document processing for your organization.
            </p>
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto text-base px-6 py-3">
                Start Your AI Project
                <ArrowLeft className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDocProcessingPage;