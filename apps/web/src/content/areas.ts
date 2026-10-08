/**
 * Neighbourhoods served. Each entry gives genuinely useful directions rather than
 * thin "hospital in X" doorway copy, which search engines penalise.
 * Keep travel notes factual (roads, landmarks, matatu routes); review them with
 * local staff whenever routes or landmarks change.
 */
export interface Area {
  name: string;
  slug: string;
  relation: string;
  directions: string;
}

export const AREAS_SERVED: Area[] = [
  {
    name: "Maili Sita",
    slug: "maili-sita",
    relation: "Our home",
    directions:
      "We're at Maili Sita Centre on the Nakuru–Nyahururu Road, directly opposite Kiamaina Primary School. Walking distance for most of the centre.",
  },
  {
    name: "Kabatini",
    slug: "kabatini",
    relation: "Neighbouring ward",
    directions:
      "From Kabatini, follow the Nakuru–Nyahururu Road to Maili Sita Centre and look for Kiamaina Primary School.",
  },
  {
    name: "Kiamaina",
    slug: "kiamaina",
    relation: "Same ward",
    directions:
      "Primegala is in Kiamaina Ward, directly opposite Kiamaina Primary School. Head along the Nakuru–Nyahururu Road towards Maili Sita. Matatus between Kiamaina and Nakuru town pass our gate.",
  },
  {
    name: "Bahati",
    slug: "bahati",
    relation: "Nakuru North",
    directions:
      "From Bahati, travel towards Nakuru on the Nakuru–Nyahururu Road. Primegala is at Maili Sita, opposite Kiamaina Primary School.",
  },
  {
    name: "Lanet & Umoja",
    slug: "lanet-umoja",
    relation: "Nakuru North",
    directions:
      "Join the Nakuru–Nyahururu Road and head north towards Bahati until you reach Maili Sita Centre.",
  },
  {
    name: "Dundori",
    slug: "dundori",
    relation: "Nakuru North",
    directions:
      "Come down to the Nakuru–Nyahururu Road and continue to Maili Sita Centre. Ask for Kiamaina Primary School: we're opposite.",
  },
  {
    name: "Maili Kumi",
    slug: "maili-kumi",
    relation: "Up the road",
    directions:
      "From Maili Kumi, travel towards Nakuru town on the Nakuru–Nyahururu Road. Maili Sita is the next major centre: about four miles.",
  },
  {
    name: "Nakuru Town",
    slug: "nakuru-town",
    relation: "About 10 km",
    directions:
      "Take the Nakuru–Nyahururu Road (B5) north from town. Maili Sita, “six miles”, is roughly 10 km away: about 15–20 minutes by car or matatu, traffic permitting.",
  },
];
