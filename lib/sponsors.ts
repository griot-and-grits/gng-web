import { getLogoUrl } from '@/lib/cdn';

export interface Sponsor {
    name: string;
    logo: string;
    website?: string;
}

export const goldSponsors: Sponsor[] = [
    {
        name: "Resilient Ventures",
        logo: getLogoUrl("RV Color Horizontal.jpg"),
        website: "https://resilient-ventures.com"
    }
];

export const silverSponsors: Sponsor[] = [];

export const bronzeSponsors: Sponsor[] = [];

export const partners: Sponsor[] = [
    {
        name: "Mass Open Cloud",
        logo: getLogoUrl("MOCwordmark_RGB_small.png"),
        website: "https://massopen.cloud"
    }
];
