import React, { useState } from 'react';
import {
  BookOpen,
  Video,
  FileText,
  Heart,
  Baby,
  Activity,
  Apple,
  Dumbbell,
  Brain,
  Shield,
  Search,
  Download,
  ExternalLink,
} from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  category: 'article' | 'video' | 'guide' | 'nutrition' | 'exercise' | 'mental-health';
  icon: React.ReactNode;
  link?: string;
  downloadable?: boolean;
}

export const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Resources', icon: <BookOpen size={20} /> },
    { id: 'article', name: 'Articles', icon: <FileText size={20} /> },
    { id: 'video', name: 'Videos', icon: <Video size={20} /> },
    { id: 'guide', name: 'Guides', icon: <BookOpen size={20} /> },
    { id: 'nutrition', name: 'Nutrition', icon: <Apple size={20} /> },
    { id: 'exercise', name: 'Exercise', icon: <Dumbbell size={20} /> },
    { id: 'mental-health', name: 'Mental Health', icon: <Brain size={20} /> },
  ];

  const resources: Resource[] = [
    {
      id: 1,
      title: 'Understanding Pregnancy Trimesters',
      description: 'A comprehensive guide to what happens in each trimester of pregnancy, from conception to birth.',
      category: 'guide',
      icon: <Baby className="text-pink-600" size={32} />,
      downloadable: true,
    },
    {
      id: 2,
      title: 'Nutrition During Pregnancy',
      description: 'Essential vitamins, minerals, and nutrients needed for a healthy pregnancy and baby development.',
      category: 'nutrition',
      icon: <Apple className="text-green-600" size={32} />,
      downloadable: true,
    },
    {
      id: 3,
      title: 'Safe Exercises for Pregnant Women',
      description: 'Learn about safe and beneficial exercises you can do during each stage of pregnancy.',
      category: 'exercise',
      icon: <Dumbbell className="text-blue-600" size={32} />,
    },
    {
      id: 4,
      title: 'Recognizing Warning Signs',
      description: 'Important symptoms and warning signs that require immediate medical attention during pregnancy.',
      category: 'article',
      icon: <Shield className="text-red-600" size={32} />,
      downloadable: true,
    },
    {
      id: 5,
      title: 'Mental Health & Pregnancy',
      description: 'Managing stress, anxiety, and emotional changes during pregnancy. Tips for mental wellness.',
      category: 'mental-health',
      icon: <Brain className="text-purple-600" size={32} />,
    },
    {
      id: 6,
      title: 'Prenatal Yoga Basics',
      description: 'Video tutorial on gentle yoga poses specifically designed for pregnant women.',
      category: 'video',
      icon: <Video className="text-indigo-600" size={32} />,
      link: '#',
    },
    {
      id: 7,
      title: 'Breastfeeding Preparation Guide',
      description: 'Everything you need to know about preparing for breastfeeding before your baby arrives.',
      category: 'guide',
      icon: <Heart className="text-pink-600" size={32} />,
      downloadable: true,
    },
    {
      id: 8,
      title: 'Monitoring Baby Movement',
      description: 'Learn when and how to track your baby\'s movements and what patterns to expect.',
      category: 'article',
      icon: <Activity className="text-orange-600" size={32} />,
    },
    {
      id: 9,
      title: 'Healthy Pregnancy Recipes',
      description: 'Nutritious and delicious meal ideas packed with the vitamins and minerals you need.',
      category: 'nutrition',
      icon: <Apple className="text-green-600" size={32} />,
    },
    {
      id: 10,
      title: 'Birth Plan Template',
      description: 'A downloadable template to help you create your personalized birth plan.',
      category: 'guide',
      icon: <FileText className="text-blue-600" size={32} />,
      downloadable: true,
    },
    {
      id: 11,
      title: 'Breathing Techniques for Labor',
      description: 'Video guide on effective breathing techniques to help manage pain during labor.',
      category: 'video',
      icon: <Video className="text-indigo-600" size={32} />,
      link: '#',
    },
    {
      id: 12,
      title: 'Postpartum Recovery Guide',
      description: 'What to expect after delivery and tips for physical and emotional recovery.',
      category: 'guide',
      icon: <Heart className="text-pink-600" size={32} />,
      downloadable: true,
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      article: 'from-orange-50 to-red-50 border-orange-200',
      video: 'from-indigo-50 to-purple-50 border-indigo-200',
      guide: 'from-blue-50 to-cyan-50 border-blue-200',
      nutrition: 'from-green-50 to-emerald-50 border-green-200',
      exercise: 'from-blue-50 to-sky-50 border-blue-200',
      'mental-health': 'from-purple-50 to-pink-50 border-purple-200',
    };
    return colors[category] || 'from-gray-50 to-gray-100 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Educational Resources</h1>
        <p className="text-gray-600 mt-1">Access helpful guides, articles, and videos for a healthy pregnancy</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Resource Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <BookOpen size={48} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Complete Pregnancy Guide</h2>
            <p className="text-pink-100 mb-4">
              Your comprehensive guide to pregnancy, from conception through postpartum care.
            </p>
            <button className="bg-white text-pink-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2">
              <Download size={20} />
              Download Full Guide
            </button>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center shadow-md">
            <Search className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredResources.map((resource) => (
            <div
              key={resource.id}
              className={`bg-gradient-to-br ${getCategoryColor(resource.category)} rounded-2xl p-6 border-2 hover:shadow-lg transition-all cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="bg-white rounded-xl p-3 shadow-md">
                  {resource.icon}
                </div>
                {resource.downloadable && (
                  <button className="text-gray-600 hover:text-pink-600 transition-colors">
                    <Download size={20} />
                  </button>
                )}
                {resource.link && (
                  <button className="text-gray-600 hover:text-pink-600 transition-colors">
                    <ExternalLink size={20} />
                  </button>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
              <button className="w-full bg-white border-2 border-gray-200 text-gray-800 rounded-xl py-2 font-semibold hover:border-pink-300 hover:bg-pink-50 transition-all">
                {resource.category === 'video' ? 'Watch Now' : 'Read More'}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Quick Tips Section */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Heart className="text-pink-600" size={24} />
          Quick Pregnancy Tips
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 border-2 border-pink-200">
            <h3 className="font-semibold text-gray-800 mb-2">Stay Hydrated</h3>
            <p className="text-sm text-gray-600">Drink 8-10 glasses of water daily to support increased blood volume and amniotic fluid.</p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
            <h3 className="font-semibold text-gray-800 mb-2">Prenatal Vitamins</h3>
            <p className="text-sm text-gray-600">Take daily prenatal vitamins with folic acid, iron, and calcium as prescribed.</p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
            <h3 className="font-semibold text-gray-800 mb-2">Regular Exercise</h3>
            <p className="text-sm text-gray-600">30 minutes of gentle exercise like walking or prenatal yoga helps maintain fitness.</p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
            <h3 className="font-semibold text-gray-800 mb-2">Rest Well</h3>
            <p className="text-sm text-gray-600">Aim for 7-9 hours of sleep and take naps when needed to support your body.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
