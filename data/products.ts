export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  benefits: string[];
  specs: Record<string, string>;
  accentColor: string; // Tailwind class name or custom color
  hoverAccentColor: string;
  amazonUrl: string;
  websiteUrl: string;
  isPublished: boolean;
  category: string;
  image: string;
  featured: boolean;
  isComingSoon?: boolean;
}

export const PRODUCT_CATEGORIES = [
  "Puzzles",
  "Board Games",
  "Card Games",
  "Party Games",
  "Family Games",
  "Educational Games",
  "Brain Training Games",
  "Puzzle Collections",
  "Kids Learning Games"
] as const;

export const products: Product[] = [
  {
    id: "mindovo-jigsaw-puzzle",
    name: "Mindovo Jigsaw Puzzle",
    slug: "jigsaw-puzzle",
    tagline: "A masterpiece in every piece.",
    description: "Premium 300-piece puzzle with state-of-the-art print clarity, designed to bring families together through mindful, screen-free engagement.",
    benefits: [
      "300 high-grade, interlocking blue board pieces",
      "Exquisite matte-finish print with zero reflections",
      "Includes premium full-size reference poster",
      "Packaged in a luxury rigid gift box"
    ],
    specs: {
      "Quantity": "300 Pieces",
      "Dimensions": "45 × 30 cm",
      "Material": "Eco-friendly Recycled Blueboard",
      "Printing": "Velvet-Touch Matte Coating",
      "Difficulty": "Moderate (Ideal for age 8 to 99)",
      "Box Style": "Premium Gift Box with Gold Foil detailing"
    },
    accentColor: "bg-puzzle-blue",
    hoverAccentColor: "hover:bg-blue-900",
    amazonUrl: "https://www.amazon.in/dp/B0DJSAWPUZ",
    websiteUrl: "#jigsaw-puzzle",
    isPublished: true,
    category: "Puzzles",
    image: "/images/jigsaw-puzzle-box.png",
    featured: true
  },
  {
    id: "bollywood-battle",
    name: "Bollywood Battle",
    slug: "bollywood-battle",
    tagline: "Lights, Camera, Showdown.",
    description: "The ultimate cinematic trivia game where film buffs and families go head-to-head. Packed with questions, challenges, and iconic movie lore.",
    benefits: [
      "200+ Premium trivia and action cards",
      "Stunning film-reel inspired aesthetic layout",
      "Staggered difficulty levels from easy to expert",
      "Instant ice-breaker for family game nights"
    ],
    specs: {
      "Contents": "220 Premium Linen-Finish Cards",
      "Players": "3 - 10 Players",
      "Playtime": "30 - 45 Minutes",
      "Age Range": "12 Years & Above",
      "Game Modes": "Classic Trivia, Guess the Hook, Dumb Charades",
      "Box Style": "Cinematic Rigid Box"
    },
    accentColor: "bg-puzzle-red",
    hoverAccentColor: "hover:bg-red-900",
    amazonUrl: "https://www.amazon.in/dp/B0BOLLYBTL",
    websiteUrl: "#bollywood-battle",
    isPublished: true,
    category: "Party Games",
    image: "/images/bollywood-battle-box.png",
    featured: true
  },
  {
    id: "mindovo-board-game-coming",
    name: "Mindovo Quest",
    slug: "mindovo-quest",
    tagline: "The Adventure Awaits.",
    description: "A premium cooperative adventure board game designed to foster strategic thinking and collaborative family bonding.",
    benefits: ["Cooperative gameplay mechanics", "Beautiful modular wooden board blocks"],
    specs: {},
    accentColor: "bg-puzzle-green",
    hoverAccentColor: "hover:bg-green-900",
    amazonUrl: "#",
    websiteUrl: "#",
    isPublished: false,
    isComingSoon: true,
    category: "Board Games",
    image: "/images/coming-soon.png",
    featured: false
  },
  {
    id: "mindovo-kids-learning-coming",
    name: "Brain Boost Junior",
    slug: "brain-boost-jr",
    tagline: "Play. Learn. Grow.",
    description: "Fun interactive brain training challenge card sets designed by child developmental psychologists.",
    benefits: ["Boosts spatial intelligence", "Fun daily learning routines"],
    specs: {},
    accentColor: "bg-puzzle-orange",
    hoverAccentColor: "hover:bg-orange-900",
    amazonUrl: "#",
    websiteUrl: "#",
    isPublished: false,
    isComingSoon: true,
    category: "Kids Learning Games",
    image: "/images/coming-soon.png",
    featured: false
  }
];
