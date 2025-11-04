import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CloudUpload, Database, Zap, Shield, TrendingUp, Users } from 'lucide-react';

export function HomePage() {
  const features = [
    {
      icon: CloudUpload,
      title: 'Easy File Upload',
      description: 'Drag and drop CSV, Excel, or JSON files with instant preview'
    },
    {
      icon: Database,
      title: 'Multiple Formats',
      description: 'Convert to JSON, SQL INSERT, SQL CREATE TABLE, CSV, or Excel'
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Transform large datasets in seconds with our optimized engine'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is processed securely and never stored on our servers'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Transformations',
      description: 'Clean, format, and transform your data with powerful tools'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share templates and transformations with your team'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-cyan/10 via-background to-primary-teal/10">
        <div className="container px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6 bg-gradient-to-r from-primary-cyan to-primary-teal bg-clip-text text-transparent">
              Transform Your Data with Ease
            </h1>
            <p className="body-lg text-muted-foreground mb-8">
              Convert CSV, Excel, and JSON files to any format you need. 
              Clean, transform, and export your data in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary-cyan hover:bg-primary-cyan/90">
                <Link to="/transform">Start Transforming</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/docs">View Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Powerful Features</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform and manage your data efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary-cyan/10">
                  <feature.icon className="w-6 h-6 text-primary-cyan" />
                </div>
                <div>
                  <h3 className="heading-sm mb-2">{feature.title}</h3>
                  <p className="body-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-cyan to-primary-teal">
        <div className="container px-4 py-16 text-center">
          <h2 className="heading-lg text-white mb-4">Ready to get started?</h2>
          <p className="body-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust CSV Transformer Studio for their data transformation needs
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/transform">Start Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}