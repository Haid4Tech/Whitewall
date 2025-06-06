import { INavItems, Property, BlogPost } from "./types";

export const NavItems: Array<INavItems> = [
  {
    id: 1,
    label: "Home",
    url: "/",
  },
  {
    id: 2,
    label: "About Us",
    url: "/about-us",
  },
  {
    id: 3,
    label: "Properties",
    url: "/properties",
  },
  {
    id: 4,
    label: "Blog",
    url: "/blog",
  },
];

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: 2500000,
    priceType: "for sale",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    type: "villa",
    image:
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    featured: true,
    description:
      "Stunning modern villa featuring open-plan living, premium finishes, and breathtaking city views. Located in one of the most prestigious neighborhoods with easy access to entertainment and shopping districts.",
    amenities: [
      "Swimming Pool",
      "Garage",
      "Garden",
      "Security System",
      "Air Conditioning",
      "Fireplace",
    ],
  },
  {
    id: "2",
    title: "Downtown Penthouse",
    location: "Manhattan, NY",
    price: 8500,
    priceType: "per month",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    type: "apartment",
    image:
      "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=800&h=600&fit=crop",
    featured: false,
    description:
      "Luxurious penthouse apartment in the heart of Manhattan with panoramic city views, modern amenities, and premium finishes throughout. Perfect for urban professionals.",
    amenities: [
      "City Views",
      "Gym",
      "Concierge",
      "Rooftop Terrace",
      "Parking",
      "Pet Friendly",
    ],
  },
  {
    id: "3",
    title: "Suburban Family Home",
    location: "Austin, TX",
    price: 750000,
    priceType: "for sale",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    type: "house",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    featured: true,
    description:
      "Spacious family home in a quiet suburban neighborhood with excellent schools nearby. Features a large backyard, modern kitchen, and plenty of room for a growing family.",
    amenities: [
      "Large Backyard",
      "2-Car Garage",
      "Updated Kitchen",
      "Master Suite",
      "Home Office",
      "Basement",
    ],
  },
  {
    id: "4",
    title: "Beachfront Condo",
    location: "Miami Beach, FL",
    price: 4200,
    priceType: "per month",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    type: "condo",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    featured: false,
    description:
      "Beautiful beachfront condominium with direct ocean access and stunning sunset views. Fully furnished with modern amenities and resort-style facilities.",
    amenities: [
      "Ocean View",
      "Beach Access",
      "Pool",
      "Fitness Center",
      "Spa",
      "Valet Parking",
    ],
  },
  {
    id: "5",
    title: "Mountain Retreat",
    location: "Aspen, CO",
    price: 1800000,
    priceType: "for sale",
    bedrooms: 6,
    bathrooms: 5,
    sqft: 5500,
    type: "house",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
    featured: true,
    description:
      "Magnificent mountain retreat offering privacy and luxury in the Colorado Rockies. Perfect for those seeking a peaceful escape with world-class skiing nearby.",
    amenities: [
      "Mountain Views",
      "Ski Access",
      "Hot Tub",
      "Fireplace",
      "Wine Cellar",
      "Guest House",
    ],
  },
  {
    id: "6",
    title: "Urban Loft",
    location: "Portland, OR",
    price: 3200,
    priceType: "per month",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 1200,
    type: "apartment",
    image:
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
    featured: false,
    description:
      "Stylish industrial loft in the trendy Pearl District with exposed brick walls, high ceilings, and modern amenities. Walking distance to restaurants and galleries.",
    amenities: [
      "Exposed Brick",
      "High Ceilings",
      "In-Unit Laundry",
      "Walk-in Closet",
      "Hardwood Floors",
      "Bike Storage",
    ],
  },
  {
    id: "7",
    title: "Countryside Estate",
    location: "Napa Valley, CA",
    price: 3200000,
    priceType: "for sale",
    bedrooms: 7,
    bathrooms: 6,
    sqft: 8200,
    type: "villa",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    featured: true,
    description:
      "Exquisite countryside estate nestled in the heart of wine country. Features vineyard views, luxury amenities, and entertaining spaces perfect for hosting.",
    amenities: [
      "Vineyard Views",
      "Wine Cellar",
      "Pool & Spa",
      "Guest Wing",
      "Chef's Kitchen",
      "Tennis Court",
    ],
  },
  {
    id: "8",
    title: "City Center Apartment",
    location: "Chicago, IL",
    price: 2800,
    priceType: "per month",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1400,
    type: "apartment",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
    featured: false,
    description:
      "Modern apartment in the heart of downtown Chicago with easy access to public transportation, shopping, and dining. Features updated amenities and city views.",
    amenities: [
      "City Views",
      "Updated Kitchen",
      "In-Unit Laundry",
      "Doorman",
      "Fitness Center",
      "Storage Unit",
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "first-time-homebuyer-guide-2024",
    title: "The Ultimate First-Time Homebuyer's Guide for 2024",
    excerpt:
      "Everything you need to know about buying your first home in today's market, from pre-approval to closing day.",
    content: `
      <h2>Getting Started with Your Home Purchase</h2>
      <p>Buying your first home is one of the most significant financial decisions you'll ever make. In today's competitive market, being prepared is more important than ever.</p>
      
      <h3>Step 1: Check Your Credit Score</h3>
      <p>Your credit score plays a crucial role in determining your mortgage rate and loan approval. Aim for a score of 620 or higher for conventional loans, though some programs accept lower scores.</p>
      
      <h3>Step 2: Save for a Down Payment</h3>
      <p>While 20% down is ideal to avoid PMI, many programs offer options with as little as 3% down. FHA loans require just 3.5% down for qualified buyers.</p>
      
      <h3>Step 3: Get Pre-Approved</h3>
      <p>Pre-approval gives you a clear budget and shows sellers you're a serious buyer. This step involves submitting financial documents to your lender.</p>
      
      <h3>Step 4: Find the Right Real Estate Agent</h3>
      <p>A knowledgeable agent can guide you through the process, help you find properties, and negotiate on your behalf.</p>
      
      <h3>Step 5: Start House Hunting</h3>
      <p>Make a list of must-haves versus nice-to-haves. Consider location, schools, commute times, and future resale value.</p>
    `,
    author: "Sarah Johnson",
    publishDate: "2024-01-15",
    readTime: "8 min read",
    category: "Buying Guide",
    image:
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    tags: ["First Time Buyer", "Mortgage", "Home Buying", "Real Estate Tips"],
  },
  {
    id: "2",
    slug: "market-trends-spring-2024",
    title:
      "Spring 2024 Real Estate Market Trends: What Buyers and Sellers Need to Know",
    excerpt:
      "An in-depth analysis of current market conditions, inventory levels, and pricing trends shaping the spring buying season.",
    content: `
      <h2>Market Overview</h2>
      <p>The spring 2024 real estate market is showing signs of stabilization after years of unprecedented volatility. Here's what the data tells us.</p>
      
      <h3>Inventory Levels</h3>
      <p>Housing inventory has increased by 15% compared to last spring, giving buyers more options and reducing the intensity of bidding wars.</p>
      
      <h3>Price Trends</h3>
      <p>Home prices have moderated, with year-over-year appreciation slowing to 4-6% in most markets, down from the double-digit gains of recent years.</p>
      
      <h3>Interest Rate Impact</h3>
      <p>With mortgage rates stabilizing around 6.5-7%, buyer demand has adjusted to the new normal, creating a more balanced market.</p>
      
      <h3>Regional Variations</h3>
      <p>Markets vary significantly by region. Coastal areas are seeing slower appreciation, while more affordable inland markets continue to show strength.</p>
      
      <h3>Outlook for Buyers</h3>
      <p>This spring presents opportunities for buyers who have been waiting. More inventory and less competition mean better negotiating power.</p>
    `,
    author: "Michael Chen",
    publishDate: "2024-03-10",
    readTime: "6 min read",
    category: "Market Analysis",
    image:
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
    tags: [
      "Market Trends",
      "Spring Market",
      "Real Estate Analysis",
      "2024 Forecast",
    ],
  },
  {
    id: "3",
    slug: "staging-your-home-for-quick-sale",
    title: "Home Staging Secrets: How to Sell Your Property Faster",
    excerpt:
      "Professional staging tips that can help your home sell faster and for top dollar in any market condition.",
    content: `
      <h2>The Power of First Impressions</h2>
      <p>Studies show that staged homes sell 73% faster than non-staged homes and often for 5-15% more money. Here's how to stage like a pro.</p>
      
      <h3>Declutter and Depersonalize</h3>
      <p>Remove personal items, family photos, and excess furniture. Buyers need to envision themselves living in the space.</p>
      
      <h3>Focus on Key Rooms</h3>
      <p>Prioritize staging the living room, kitchen, and master bedroom. These rooms have the biggest impact on buyer perception.</p>
      
      <h3>Maximize Natural Light</h3>
      <p>Open all curtains and blinds, clean windows, and add mirrors to reflect light. Bright spaces feel larger and more welcoming.</p>
      
      <h3>Create Focal Points</h3>
      <p>Arrange furniture to highlight your home's best features, such as a fireplace, large windows, or architectural details.</p>
      
      <h3>Use Neutral Colors</h3>
      <p>Stick to neutral paint colors and décor that appeal to the broadest range of buyers.</p>
      
      <h3>Add Fresh Touches</h3>
      <p>Fresh flowers, new towels, and subtle scents can make your home feel move-in ready.</p>
    `,
    author: "Emma Rodriguez",
    publishDate: "2024-02-28",
    readTime: "5 min read",
    category: "Selling Tips",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    tags: [
      "Home Staging",
      "Selling Tips",
      "Interior Design",
      "Real Estate Marketing",
    ],
  },
  {
    id: "4",
    slug: "investment-property-guide",
    title: "Building Wealth Through Real Estate Investment: A Beginner's Guide",
    excerpt:
      "Learn the fundamentals of real estate investing, from analyzing deals to managing rental properties.",
    content: `
      <h2>Why Real Estate Investment?</h2>
      <p>Real estate has historically been one of the most reliable ways to build long-term wealth, offering both passive income and appreciation potential.</p>
      
      <h3>Types of Investment Properties</h3>
      <p>Consider single-family rentals, multi-family properties, or commercial real estate based on your budget and experience level.</p>
      
      <h3>The 1% Rule</h3>
      <p>A general guideline is that monthly rent should equal at least 1% of the purchase price. This helps ensure positive cash flow.</p>
      
      <h3>Location Factors</h3>
      <p>Look for properties in areas with job growth, good schools, low crime rates, and planned infrastructure improvements.</p>
      
      <h3>Financing Options</h3>
      <p>Investment property loans typically require 20-25% down and have higher interest rates than primary residence mortgages.</p>
      
      <h3>Property Management</h3>
      <p>Decide whether to self-manage or hire a property management company. Factor management costs into your investment calculations.</p>
      
      <h3>Tax Benefits</h3>
      <p>Real estate investors can take advantage of depreciation, mortgage interest deductions, and other tax benefits.</p>
    `,
    author: "David Kim",
    publishDate: "2024-01-20",
    readTime: "10 min read",
    category: "Investment",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
    tags: [
      "Real Estate Investment",
      "Rental Property",
      "Passive Income",
      "Wealth Building",
    ],
  },
  {
    id: "5",
    slug: "luxury-market-insights",
    title:
      "Luxury Real Estate Market: Trends and Opportunities in High-End Properties",
    excerpt:
      "Exclusive insights into the luxury real estate market, including buyer preferences and emerging luxury destinations.",
    content: `
      <h2>The Luxury Market Landscape</h2>
      <p>The luxury real estate market operates differently from traditional residential markets, with unique dynamics and buyer motivations.</p>
      
      <h3>Luxury Buyer Preferences</h3>
      <p>Today's luxury buyers prioritize privacy, technology integration, wellness amenities, and sustainable features.</p>
      
      <h3>Emerging Luxury Markets</h3>
      <p>Secondary markets like Austin, Nashville, and Boulder are attracting luxury buyers seeking value and lifestyle benefits.</p>
      
      <h3>International Buyers</h3>
      <p>Foreign investment in US luxury real estate remains strong, particularly from buyers in Canada, China, and Europe.</p>
      
      <h3>Technology Integration</h3>
      <p>Smart home features, high-speed internet, and advanced security systems are now standard expectations in luxury properties.</p>
      
      <h3>Wellness and Sustainability</h3>
      <p>Luxury buyers increasingly demand eco-friendly features, wellness amenities, and properties that support a healthy lifestyle.</p>
      
      <h3>Marketing Luxury Properties</h3>
      <p>Successful luxury marketing requires professional photography, virtual tours, and targeted marketing to qualified buyers.</p>
    `,
    author: "Victoria Sterling",
    publishDate: "2024-03-05",
    readTime: "7 min read",
    category: "Luxury Market",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
    tags: [
      "Luxury Real Estate",
      "High-End Properties",
      "Market Analysis",
      "Luxury Trends",
    ],
  },
];
