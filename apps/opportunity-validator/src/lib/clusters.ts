export interface ProblemCluster {
  id: string;
  title: string;
  description: string;
  evidence: string;
  approaches: string[];
  primaryCategory: string;
}

export const clusters: ProblemCluster[] = [
  {
    id: "repetitive-work",
    title: "Repetitive Work & Manual Operations",
    description: "Businesses are bleeding margin on manual data entry, cross-system synchronization, and repetitive administrative tasks.",
    evidence: "Research across r/smallbusiness and r/agency indicates severe operational bottlenecks. Owners report high employee burnout and scaling limitations due to administrative bloat and manual data transfer errors.",
    approaches: [
      "Productized workflow automation setup",
      "Custom internal tooling for data synchronization",
      "Automated reporting and dashboard generation"
    ],
    primaryCategory: "AI Agency"
  },
  {
    id: "customer-acquisition",
    title: "Unpredictable Customer Acquisition",
    description: "Founders and service providers struggle to generate consistent leads without exhausting capital on unpredictable, high-cost advertising platforms.",
    evidence: "Analysis of r/SaaS and r/Entrepreneur reveals widespread frustration with rising acquisition costs. Traditional outbound campaigns are failing due to deliverability issues, and trust in generalist marketing agencies is critically low.",
    approaches: [
      "Performance-based growth partnerships",
      "Done-for-you cold outreach infrastructure",
      "Niche-specific SEO content services"
    ],
    primaryCategory: "Consulting"
  },
  {
    id: "tool-fragmentation",
    title: "SaaS Fatigue & Tool Fragmentation",
    description: "Teams are overwhelmed by disconnected software ecosystems, resulting in siloed data, broken workflows, and subscription fatigue.",
    evidence: "Discussions in r/productivity and r/startups highlight a critical inefficiency: users spend more time managing tools than executing work. There is strong demand for workflow consolidation and niche-specific integrations.",
    approaches: [
      "Unified dashboards aggregating multi-platform data",
      "All-in-one tools for narrow, underserved industries",
      "Micro-integrations bridging non-communicating platforms"
    ],
    primaryCategory: "Micro SaaS"
  },
  {
    id: "hiring-signal",
    title: "Signal-to-Noise Ratio in Hiring",
    description: "Companies cannot efficiently source specialized talent because generalist job boards are saturated with unqualified, high-volume applications.",
    evidence: "Feedback from r/recruiting and r/founders shows hiring managers wasting excessive hours filtering irrelevant resumes. The market is actively seeking pre-vetted, high-signal talent pools over broad distribution.",
    approaches: [
      "Curated, niche-specific job boards",
      "Reverse talent directories for pre-vetted candidates",
      "Skill-specific assessment and filtering services"
    ],
    primaryCategory: "Micro SaaS"
  },
  {
    id: "cash-flow",
    title: "Cash Flow & Receivables Management",
    description: "Small businesses face operational risk due to delayed invoice payments, unpredictable revenue cycles, and the friction of manual collections.",
    evidence: "Reports from r/freelance and r/smallbusiness highlight constant anxiety regarding net-60/90 terms and outstanding receivables. Owners lack the infrastructure to bridge the gap between payroll obligations and client payments.",
    approaches: [
      "Automated dunning systems for specific service niches",
      "Fractional accounts receivable management",
      "Milestone-based billing and escrow templates"
    ],
    primaryCategory: "Local Business"
  }
];
