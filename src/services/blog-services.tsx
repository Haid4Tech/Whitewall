import { BlogPost, IBlogCard } from "@/common/types";

// Mock data for demonstration
const mockBlogPosts: IBlogCard[] = [
  {
    id: "1",
    title: "Top 10 Real Estate Investment Tips for Beginners",
    content:
      "Real estate investment can be a lucrative venture when approached with the right knowledge and strategy...",
    excerpt:
      "Learn the essential tips for starting your real estate investment journey.",
    author: "John Smith",
    publishDate: new Date("2024-01-15"),
    isPublished: true,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    tags: ["investment", "tips", "beginners"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    slug: "top-10-real-estate-investment-tips-for-beginners",
    readTime: 7,
    category: "Investment",
  },
  {
    id: "2",
    title: "Market Trends: What to Expect in 2024",
    content:
      "The real estate market is constantly evolving, and 2024 brings new opportunities and challenges...",
    excerpt: "Comprehensive analysis of real estate market trends for 2024.",
    author: "Sarah Johnson",
    publishDate: new Date("2024-02-01"),
    isPublished: true,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    tags: ["market", "trends", "2024"],
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
    slug: "market-trends-what-to-expect-in-2024",
    readTime: 5,
    category: "Market Trends",
  },
];

export const blogService = {
  getAllPosts: async (): Promise<BlogPost[]> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [...mockBlogPosts];
  },

  getPostById: async (id: string): Promise<BlogPost | null> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockBlogPosts.find((post) => post.id === id) || null;
  },

  createPost: async (data: BlogPost): Promise<BlogPost> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newPost: BlogPost = {
      ...data,

      publishDate: data.isPublished ? new Date() : new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockBlogPosts.unshift(newPost);
    return newPost;
  },

  updatePost: async (
    id: string,
    data: Partial<BlogPost>
  ): Promise<BlogPost> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const index = mockBlogPosts.findIndex((post) => post.id === id);
    if (index === -1) throw new Error("Post not found");

    mockBlogPosts[index] = {
      ...mockBlogPosts[index],
      ...data,
      updatedAt: new Date(),
    };
    return mockBlogPosts[index];
  },

  deletePost: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockBlogPosts.findIndex((post) => post.id === id);
    if (index === -1) throw new Error("Post not found");
    mockBlogPosts.splice(index, 1);
  },

  togglePublish: async (id: string): Promise<BlogPost> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockBlogPosts.findIndex((post) => post.id === id);
    if (index === -1) throw new Error("Post not found");

    mockBlogPosts[index].isPublished = !mockBlogPosts[index].isPublished;
    mockBlogPosts[index].updatedAt = new Date();
    return mockBlogPosts[index];
  },
};
