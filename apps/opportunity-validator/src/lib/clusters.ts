export interface ProblemCluster {
  id: string;
  title: string;
  description: string;
  evidence: string;
  approaches: string[];
  primaryCategory: string;
  modifier: number;
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
    primaryCategory: "AI Agency",
    modifier: 8
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
    primaryCategory: "Consulting",
    modifier: 6
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
    primaryCategory: "Micro SaaS",
    modifier: 5
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
    primaryCategory: "Micro SaaS",
    modifier: 4
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
    primaryCategory: "Local Business",
    modifier: 3
  },
  {
    id: "customer-retention",
    title: "Customer Retention & Churn",
    description: "Businesses struggle to retain customers and lose recurring revenue due to poor onboarding, weak engagement, and inconsistent follow-up.",
    evidence: "Retention problems appear repeatedly across SaaS, agencies, and local businesses. Many operators focus on acquisition while ignoring the economics of churn.",
    approaches: [
      "Customer success systems",
      "Retention automation",
      "Subscription optimization services"
    ],
    primaryCategory: "Consulting",
    modifier: 7
  },
  {
    id: "appointment-scheduling",
    title: "Appointment Scheduling Chaos",
    description: "Service businesses waste significant time coordinating appointments, reminders, cancellations, and follow-up communication.",
    evidence: "Missed appointments and administrative overload remain common complaints among local service providers.",
    approaches: [
      "AI scheduling assistants",
      "Automated reminders",
      "Booking workflow automation"
    ],
    primaryCategory: "AI Agency",
    modifier: 6
  },
  {
    id: "knowledge-management",
    title: "Internal Knowledge Loss",
    description: "Organizations lose operational knowledge when employees leave or critical information remains trapped in documents and chats.",
    evidence: "Distributed teams frequently report duplicated work, slow onboarding, and excessive dependence on key individuals.",
    approaches: [
      "Knowledge bases",
      "AI documentation systems",
      "Operational playbooks"
    ],
    primaryCategory: "Micro SaaS",
    modifier: 6
  },
  {
    id: "compliance-documentation",
    title: "Compliance & Documentation Burden",
    description: "Businesses struggle with regulatory paperwork, reporting obligations, and documentation requirements.",
    evidence: "Administrative burden continues increasing while smaller organizations lack dedicated compliance resources.",
    approaches: [
      "Documentation automation",
      "Compliance workflow systems",
      "Industry-specific reporting tools"
    ],
    primaryCategory: "AI Agency",
    modifier: 5
  },
  {
    id: "online-reputation",
    title: "Online Reputation Management",
    description: "Poor reviews, inconsistent listings, and unmanaged customer feedback directly reduce revenue.",
    evidence: "Review-driven purchasing behavior continues to increase across most local service industries.",
    approaches: [
      "Review generation systems",
      "Reputation monitoring",
      "Local visibility optimization"
    ],
    primaryCategory: "Local Business",
    modifier: 5
  }
];
