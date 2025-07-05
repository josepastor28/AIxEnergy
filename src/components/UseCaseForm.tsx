'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FormData {
  name: string;
  email: string;
  useCaseTitle: string;
  description: string;
  category: string;
  technology: string;
  maturity: string;
  adoption: string;
  tags: string;
  company: string;
  website: string;
}

export default function UseCaseForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    useCaseTitle: '',
    description: '',
    category: '',
    technology: '',
    maturity: '',
    adoption: '',
    tags: '',
    company: '',
    website: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    'Grid Management & Smart Grid',
    'Renewable Energy',
    'Energy Trading & Markets',
    'Energy Storage',
    'Energy Efficiency',
    'Oil & Gas Operations',
    'Nuclear Energy',
    'Energy Analytics & IoT'
  ];

  const technologies = [
    'Machine Learning',
    'Predictive Analytics',
    'Expert Systems',
    'Computer Vision',
    'Natural Language Processing',
    'Robotic Process Automation',
    'Chatbots',
    'Blockchain',
    'Other'
  ];

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : '';
      case 'email':
        if (value.trim() === '') return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'useCaseTitle':
        return value.trim() === '' ? 'Use case title is required' : '';
      case 'description':
        if (value.trim() === '') return 'Description is required';
        if (value.trim().length < 20) return 'Description must be at least 20 characters';
        return '';
      case 'category':
        return value === '' ? 'Category is required' : '';
      case 'technology':
        return value === '' ? 'Technology is required' : '';
      case 'maturity':
        if (value !== '' && (parseFloat(value) < 0 || parseFloat(value) > 100)) 
          return 'Maturity must be between 0 and 100';
        return '';
      case 'adoption':
        if (value !== '' && (parseFloat(value) < 0 || parseFloat(value) > 100)) 
          return 'Adoption must be between 0 and 100';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (name: keyof FormData, value: string) => {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const isFormValid = (): boolean => {
    return formData.name.trim() !== '' && 
           formData.email.trim() !== '' && 
           formData.useCaseTitle.trim() !== '' && 
           formData.description.trim() !== '' && 
           formData.category !== '' && 
           formData.technology !== '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Process tags
      const processedTags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const useCaseData = {
        ...formData,
        tags: processedTags,
        maturity: formData.maturity ? parseFloat(formData.maturity) / 100 : 0.5,
        adoption: formData.adoption ? parseFloat(formData.adoption) / 100 : 0.5,
        id: Date.now(),
        submittedAt: new Date().toISOString()
      };

      console.log('Use case submitted:', useCaseData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting use case:', error);
      setErrors({ name: 'Failed to submit use case. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      useCaseTitle: '',
      description: '',
      category: '',
      technology: '',
      maturity: '',
      adoption: '',
      tags: '',
      company: '',
      website: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-4">Use Case Submitted Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for contributing to the AI Energy Radar. Your use case has been submitted and will be reviewed by our team.
            </p>
            <Button onClick={handleReset}>
              Submit Another Use Case
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Submit Use Case</h1>
        <p className="text-muted-foreground">
          Share your AI energy application with the community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={(e) => handleBlur('name', e.target.value)}
              placeholder="Your name"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={(e) => handleBlur('email', e.target.value)}
              placeholder="your.email@example.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Use Case Title */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="useCaseTitle">Use Case Title *</Label>
            <Input
              id="useCaseTitle"
              name="useCaseTitle"
              value={formData.useCaseTitle}
              onChange={(e) => handleChange('useCaseTitle', e.target.value)}
              onBlur={(e) => handleBlur('useCaseTitle', e.target.value)}
              placeholder="Brief title of your AI energy application"
              className={errors.useCaseTitle ? 'border-red-500' : ''}
            />
            {errors.useCaseTitle && <p className="text-sm text-red-500">{errors.useCaseTitle}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              onBlur={(e) => handleBlur('description', e.target.value)}
              placeholder="Describe your AI energy application in detail..."
              rows={4}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange('category', value)}
            >
              <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
          </div>

          {/* Technology */}
          <div className="space-y-2">
            <Label htmlFor="technology">Technology *</Label>
            <Select
              value={formData.technology}
              onValueChange={(value) => handleChange('technology', value)}
            >
              <SelectTrigger className={errors.technology ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select technology" />
              </SelectTrigger>
              <SelectContent>
                {technologies.map((technology) => (
                  <SelectItem key={technology} value={technology}>
                    {technology}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.technology && <p className="text-sm text-red-500">{errors.technology}</p>}
          </div>

          {/* Maturity */}
          <div className="space-y-2">
            <Label htmlFor="maturity">Maturity Level (%)</Label>
            <Input
              id="maturity"
              name="maturity"
              type="number"
              min="0"
              max="100"
              value={formData.maturity}
              onChange={(e) => handleChange('maturity', e.target.value)}
              onBlur={(e) => handleBlur('maturity', e.target.value)}
              placeholder="0-100"
              className={errors.maturity ? 'border-red-500' : ''}
            />
            {errors.maturity && <p className="text-sm text-red-500">{errors.maturity}</p>}
          </div>

          {/* Adoption */}
          <div className="space-y-2">
            <Label htmlFor="adoption">Adoption Level (%)</Label>
            <Input
              id="adoption"
              name="adoption"
              type="number"
              min="0"
              max="100"
              value={formData.adoption}
              onChange={(e) => handleChange('adoption', e.target.value)}
              onBlur={(e) => handleBlur('adoption', e.target.value)}
              placeholder="0-100"
              className={errors.adoption ? 'border-red-500' : ''}
            />
            {errors.adoption && <p className="text-sm text-red-500">{errors.adoption}</p>}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              placeholder="tag1, tag2, tag3"
            />
            <p className="text-xs text-muted-foreground">Separate tags with commas</p>
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Your company name"
            />
          </div>

          {/* Website */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://example.com"
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-6">
          <Button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Use Case'}
          </Button>
        </div>
      </form>
    </div>
  );
} 