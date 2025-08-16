import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AuroraBoutiqueDemo = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const products = [
    {
      id: 1,
      name: "Aurora Silk Dress",
      price: 299,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "Midnight Velvet Blazer",
      price: 459,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: "Crystal Pendant Necklace",
      price: 189,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=600&fit=crop",
      rating: 5.0,
      reviews: 67
    },
    {
      id: 4,
      name: "Ethereal Maxi Skirt",
      price: 225,
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d28?w=400&h=600&fit=crop",
      rating: 4.7,
      reviews: 156
    }
  ];

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-dark-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/projects/aurora-boutique')}
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
              Aurora Boutique
            </motion.h1>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-neon-purple text-xs p-0 flex items-center justify-center">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-dark-surface/30 to-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold font-display text-foreground mb-6">
              Luxury <span className="gradient-text">Fashion</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover our exclusive collection of premium fashion pieces designed for the modern connoisseur.
            </p>
            <Button className="bg-gradient-primary hover:shadow-neon text-primary-foreground px-8 py-3">
              Shop Collection
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold font-display text-foreground mb-4">
              Featured Collection
            </h3>
            <p className="text-muted-foreground">Handpicked pieces for the discerning fashionista</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="bg-dark-surface border-border hover:border-neon-purple/30 transition-all duration-300 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-primary hover:shadow-neon text-primary-foreground"
                        onClick={addToCart}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h4 className="font-bold text-foreground mb-2 group-hover:gradient-text transition-all duration-300">
                      {product.name}
                    </h4>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold gradient-text">
                        ${product.price}
                      </span>
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dark-surface/30">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-display text-foreground mb-4">
              Join Our Exclusive Club
            </h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Get early access to new collections and enjoy member-only benefits
            </p>
            <Button className="bg-gradient-primary hover:shadow-neon text-primary-foreground px-8 py-3">
              Become a Member
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AuroraBoutiqueDemo;