export type PackageType = 'starter' | 'pro';

export interface StudioPackage {
  id: PackageType;
  name: string;
  duration: string;
  priceLKR: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  packageId: PackageType;
  notes?: string;
  createdAt: string;
}

export const STUDIO_PACKAGES: StudioPackage[] = [
  {
    id: 'starter',
    name: 'Starter Session',
    duration: '2 Hours (2H)',
    priceLKR: 3000,
    description: 'Perfect for quick talk shows, individual hosts, or light content creators looking for absolute purity in sound recording.',
    features: [
      'Top-tier Condenser Mics (up to 2 accounts)',
      'Raw multitrack & stereo audio export',
      'Studio engineer assistance',
      'Soundproofed acoustic environment',
      'Free high-speed fiber internet access',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Broadcaster',
    duration: '4 Hours (4H)',
    priceLKR: 5000,
    description: 'Designed for professional panel discussions, high-fidelity shows, and long-form podcasting needing absolute creative control.',
    features: [
      'Top-tier Condenser Mics (up to 4 accounts)',
      'Sub-mix editing & audio mastering included',
      'Acoustic space setup assistance',
      'Raw multitrack output & post-session storage',
      'Dedicated host monitoring & coffee/beverage bar access',
    ],
    isPopular: true,
  },
];

export const TIME_SLOTS = [
  '08:00 AM - 10:00 AM',
  '10:30 AM - 12:30 PM',
  '01:00 PM - 03:00 PM',
  '03:30 PM - 05:30 PM',
  '06:00 PM - 08:00 PM',
  '08:30 PM - 10:30 PM',
];
