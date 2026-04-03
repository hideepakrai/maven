export type NavItem = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  primaryCta: NavItem;
  secondaryCta: NavItem;
  supportingCaption: string;
  metaLabel: string;
};

export type StudioIntro = {
  eyebrow: string;
  title: string;
  description: string;
  supportingCopy: string;
  cta: NavItem;
};

export type FounderFeature = {
  eyebrow: string;
  title: string;
  quote: string;
  description: string;
  image: string;
  secondaryImage: string;
  role: string;
  name: string;
  cta: NavItem;
};

export type ServiceItem = {
  index: string;
  title: string;
  description: string;
  icon: "house" | "sofa" | "ruler";
  linkLabel: string;
};

export type LogoItem = {
  name: string;
  src: string;
};

export type ProjectItem = {
  title: string;
  category: string;
  location: string;
  image: string;
  href: string;
  year: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type TestimonialContent = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

export type JournalItem = {
  title: string;
  excerpt: string;
  image: string;
  href: string;
  meta: string;
};

export type ContactLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type FeatureBanner = {
  eyebrow: string;
  title: string;
  image: string;
  secondaryImage?: string;
  cta: NavItem;
};

export type StatItem = {
  value: string;
  label: string;
};

export type AwardItem = {
  year: string;
  title: string;
  source: string;
};

export const siteNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Selected Work", href: "/selected-work" },
  { label: "Process", href: "/process" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

export const heroContent: HeroContent = {
  eyebrow: "Featured Project / 2024",
  title: "ARCHITECTURAL EXCELLENCE",
  image: "/assets/Image/about-us-img.jpeg",
  primaryCta: { label: "See selected work", href: "#projects" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
  supportingCaption:
    "Beyond architecture, creating places for learning, culture, and everyday calm.",
  metaLabel: "Minnaro Architects / Architecture and Interior Design",
};

export const studioIntro: StudioIntro = {
  eyebrow: "Who we are",
  title:
    "Minnaro Architects is an award-winning modern architecture firm based in New York. We specialize in contemporary design through our signature Natural Modern approach.",
  description: "",
  supportingCopy: "",
  cta: { label: "More about us", href: "/about" },
};

export const services: ServiceItem[] = [
  {
    index: "01",
    title: "Architecture",
    description:
      "We design beautiful, healthy buildings that empower families, uplift communities, and harmonize with our living world.",
    icon: "house",
    linkLabel: "Architecture",
  },
  {
    index: "02",
    title: "Renovation",
    description:
      "Breathing new life into existing structures through thoughtful redesign, sustainable upgrades, and structural refinement.",
    icon: "ruler",
    linkLabel: "Renovation",
  },
  {
    index: "03",
    title: "Interior Design",
    description:
      "Honoring the profound and nuanced ways humans interact with, utilize, and are shaped by our intimately crafted spaces.",
    icon: "sofa",
    linkLabel: "Interior design",
  },
];

export const featuredProjects: ProjectItem[] = [
  {
    title: "Primary Residence House",
    category: "New build",
    location: "Jaipur, India",
    image: "/assets/Image/about-img.jpg",
    href: "/portfolio",
    year: "2024",
  },
  {
    title: "Field View Villa",
    category: "Private home",
    location: "Ahmedabad, India",
    image: "/assets/Image/about-image.jpg",
    href: "/portfolio",
    year: "2023",
  },
  {
    title: "Lightwell Gallery",
    category: "Cultural interiors",
    location: "Mumbai, India",
    image: "/assets/Image/project-image2.png",
    href: "/portfolio",
    year: "2024",
  },
];

export const processIntro = {
  eyebrow: "Our process",
  title:
    "Our process starts with the first conversation and continues through move-in, guiding you from understanding to planning and design opportunities.",
  description:
    "We keep the workflow clear, collaborative, and detail-led so the design evolves with confidence instead of guesswork.",
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Letter of Collaboration",
    description:
      "We establish scope, intent, and working rhythm early so the project starts with aligned expectations and a shared architectural brief.",
  },
  {
    step: "02",
    title: "Evaluate & Design",
    description:
      "Concept development, material study, planning, and technical refinement move in parallel to keep the design both expressive and buildable.",
  },
  {
    step: "03",
    title: "Partner & Build",
    description:
      "With consultants, vendors, and site teams aligned, we stay involved through execution to protect the quality of every decision.",
  },
];

export const featureBanner: FeatureBanner = {
  eyebrow: "Before the build",
  title: "The best builds start before the build",
  image: "/assets/Image/project-image1.png",
  secondaryImage: "/assets/Image/project-image2.png",
  cta: { label: "Discover more", href: "/about" },
};

export const projectMetrics: StatItem[] = [
  { value: "10+", label: "Years experience" },
  { value: "200+", label: "Concepts and studies" },
  { value: "100+", label: "Materials and vendor partners" },
  { value: "400+", label: "Technical drawings delivered" },
];

export const awards: AwardItem[] = [
  { year: "2024", title: "Best contemporary residence", source: "Indian Design Awards" },
  { year: "2023", title: "Interior concept showcase", source: "Build Review" },
  { year: "2023", title: "Emerging architecture practice", source: "Design Dialogues" },
  { year: "2022", title: "Residential detailing award", source: "Habitat Interiors" },
];

export const founderFeature: FounderFeature = {
  eyebrow: "Studio note",
  title: "Designing with discipline, warmth, and long-term clarity.",
  quote:
    "Every successful project balances concept and control. The ambition matters, but so does the patience to refine every line until it feels inevitable.",
  description:
    "Our studio pairs strong architectural thinking with calm execution support so the final space feels as resolved as the early vision promised.",
  image: "/assets/Image/team-img.jpg",
  secondaryImage: "/assets/Image/project-image2.png",
  role: "Architecture / Interiors / Delivery",
  name: "Minnaro Architects",
  cta: { label: "Meet the studio", href: "/about" },
};

export const journalEntries: JournalItem[] = [
  {
    title: "How a modern facade stays warm and welcoming",
    excerpt:
      "A closer look at proportion, materials, and threshold design in our recent residential work.",
    image: "/assets/Image/about-image.jpg",
    href: "/about",
    meta: "Media",
  },
  {
    title: "Designing joinery that feels architectural",
    excerpt:
      "Interior details can reinforce the larger spatial idea when geometry, texture, and light are handled together.",
    image: "/assets/minnaro/p1.png",
    href: "/portfolio",
    meta: "Press release",
  },
  {
    title: "Recent hospitality concept highlighted by editors",
    excerpt:
      "A published project story focused on circulation, atmosphere, and restrained material layering.",
    image: "/assets/Image/project-image2.png",
    href: "/testimonials",
    meta: "News",
  },
];

export const testimonial: TestimonialContent = {
  quote:
    "Minnaro Architects gave our home a rare sense of stillness. Every room feels generous, resolved, and beautifully easy to live in.",
  name: "Residential Client",
  role: "New York",
  image: "/assets/Image/testimonials-img.png",
};

export const collaborationLogos: LogoItem[] = [
  { name: "Brand 1", src: "/assets/Image/brand-logo (1).svg" },
  { name: "Brand 2", src: "/assets/Image/brand-logo (2).svg" },
  { name: "Brand 3", src: "/assets/Image/brand-logo (3).svg" },
  { name: "Brand 4", src: "/assets/Image/brand-logo (4).svg" },
];

export const homeFooterCta: FeatureBanner = {
  eyebrow: "Let's work together",
  title: "Let's create a home that feels composed, generous, and fully yours.",
  image: "/assets/Image/about-image.jpg",
  cta: { label: "Book a consultation", href: "mailto:hello@minnaro.com" },
};

export const siteContact = {
  phoneLabel: "+1 212 555 0199",
  phoneHref: "tel:+12125550199",
  emailLabel: "hello@minnaro.com",
  emailHref: "mailto:hello@minnaro.com",
  address: "105 Central Park West, New York, NY",
};

export const footerQuickLinks: ContactLink[] = [
  ...siteNavigation,
];

export const footerContactActions: ContactLink[] = [
  { label: "Email the studio", href: siteContact.emailHref },
  { label: "Schedule a call", href: siteContact.phoneHref },
  { label: "View selected work", href: "/selected-work" },
];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "Facebook", href: "https://facebook.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "YouTube", href: "https://youtube.com/" },
];
