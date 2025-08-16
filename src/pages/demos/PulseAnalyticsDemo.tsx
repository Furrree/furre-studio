import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Users, DollarSign, Activity, Filter, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useState, useEffect } from "react";

const PulseAnalyticsDemo = () => {
  const navigate = useNavigate();
  const [realtimeData, setRealtimeData] = useState(0);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const chartData = [
    { name: 'Jan', users: 4000, revenue: 2400, sessions: 3200 },
    { name: 'Feb', users: 3000, revenue: 1398, sessions: 2800 },
    { name: 'Mar', users: 2000, revenue: 9800, sessions: 3100 },
    { name: 'Apr', users: 2780, revenue: 3908, sessions: 3400 },
    { name: 'May', users: 1890, revenue: 4800, sessions: 2900 },
    { name: 'Jun', users: 2390, revenue: 3800, sessions: 3200 },
  ];

  const pieData = [
    { name: 'Desktop', value: 45, color: '#8B5CF6' },
    { name: 'Mobile', value: 35, color: '#06B6D4' },
    { name: 'Tablet', value: 20, color: '#10B981' },
  ];

  const stats = [
    { 
      title: "Total Users", 
      value: "24,853", 
      change: "+12.5%", 
      icon: Users,
      trend: "up"
    },
    { 
      title: "Revenue", 
      value: "$48,329", 
      change: "+8.2%", 
      icon: DollarSign,
      trend: "up"
    },
    { 
      title: "Conversion Rate", 
      value: "3.24%", 
      change: "-0.5%", 
      icon: TrendingUp,
      trend: "down"
    },
    { 
      title: "Active Sessions", 
      value: `${1247 + realtimeData}`, 
      change: "Live", 
      icon: Activity,
      trend: "live"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-dark-surface/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/projects/pulse-analytics')}
                className="hover:bg-dark-surface"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Project
              </Button>
              
              <motion.h1 
                className="text-2xl font-bold font-display gradient-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Pulse Analytics
              </motion.h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold font-display text-foreground mb-2">
            Dashboard Overview
          </h2>
          <p className="text-muted-foreground">
            Real-time insights and analytics for your business performance
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-dark-surface border-border hover:border-neon-purple/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-gradient-primary/10 rounded-lg">
                      <stat.icon className="h-6 w-6 text-neon-purple" />
                    </div>
                    <div className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-500' : 
                      stat.trend === 'down' ? 'text-red-500' : 
                      'text-neon-purple'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.title}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-dark-surface border-border">
              <CardHeader>
                <CardTitle className="text-foreground">User Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#8B5CF6" 
                      fill="url(#gradient)" 
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-dark-surface border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="revenue" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Device Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-dark-surface border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Real-time Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="bg-dark-surface border-border h-full">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-neon-purple" />
                  Real-time Activity Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {[
                    { time: "2m ago", action: "New user registration", location: "New York" },
                    { time: "3m ago", action: "Purchase completed", amount: "$299" },
                    { time: "5m ago", action: "Email campaign opened", rate: "68%" },
                    { time: "7m ago", action: "Page view spike detected", page: "/products" },
                    { time: "10m ago", action: "API rate limit reached", service: "Analytics" },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-background rounded-lg"
                    >
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {activity.action}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {activity.location || activity.amount || activity.rate || activity.page || activity.service}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {activity.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PulseAnalyticsDemo;