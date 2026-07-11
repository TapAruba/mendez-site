export type Property = {
  slug: string;
  smoobuId: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  mainImage: string;
  gallery: string[];
  specs: string[];
  amenities: string[];
  rates: { label: string; value: string }[];
};

export const properties: Property[] = [
  {
    slug: "naima",
    smoobuId: process.env.SMOOBU_NAIMA_ID ?? "",
    name: "Naïma Luxury",
    tagline: "Private Garden Villa in Aruba",
    description:
      "A cottage and main house wrapped in lush private garden — pool, hammocks, six resident tortoises, and Ana's famous breakfast basket included on arrival. Perfect for couples and small groups seeking a genuine Aruban home.",
    heroImage: "images/naima-hero.jpg",
    mainImage: "images/naima-main.jpg",
    gallery: Array.from({ length: 32 }, (_, i) => `images/naima-${String(i + 1).padStart(2, "0")}.jpg`),
    specs: ["Private Garden Pool", "2 Bedrooms", "6 Tortoises On-Site", "Breakfast Included"],
    amenities: [
      "Private garden pool",
      "Outdoor hammocks",
      "Full kitchen",
      "Air conditioning",
      "Free Wi-Fi",
      "Smart TV",
      "Welcome breakfast basket",
      "Resident tortoises & cat",
      "Towels, bed sheets & pillows",
      "WhatsApp concierge",
    ],
    rates: [
      { label: "Nightly rate", value: "Upon request" },
      { label: "Minimum stay", value: "3 nights" },
      { label: "Cleaning fee", value: "Included" },
    ],
  },
  {
    slug: "maxwell",
    smoobuId: process.env.SMOOBU_MAXWELL_ID ?? "",
    name: "Maxwell Luxury",
    tagline: "Open-Concept Pool Home in Aruba",
    description:
      "An open-concept home with a large private pool, ideal for families and groups of 6 to 7 guests. Each bedroom has its own coffee machine with one complimentary espresso capsule per guest. Linen (towels, bed sheets & pillows) included.",
    heroImage: "images/maxwell-hero.jpg",
    mainImage: "images/maxwell-main.jpg",
    gallery: Array.from({ length: 51 }, (_, i) => `images/maxwell-${String(i + 1).padStart(2, "0")}.jpg`),
    specs: ["Large Private Pool", "6–7 Sleeps", "Coffee Machine Per Room", "Linen Included"],
    amenities: [
      "Large private pool",
      "Open-concept living area",
      "Full kitchen",
      "Air conditioning",
      "Free Wi-Fi",
      "Smart TV",
      "Coffee machine in every bedroom",
      "1 complimentary espresso capsule per guest",
      "Towels, bed sheets & pillows",
      "WhatsApp concierge",
    ],
    rates: [
      { label: "Nightly rate", value: "Upon request" },
      { label: "Minimum stay", value: "3 nights" },
      { label: "Cleaning fee", value: "Included" },
    ],
  },
];

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}
