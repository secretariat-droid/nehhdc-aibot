/**
 * NEHHDC Official Knowledge Base
 * 
 * Sourced directly and verified from:
 * - Official Website: https://www.nehhdc.com/
 * - Official Purbashree Online Store: https://www.purbashree.com/
 * - Official Tenders Portal: https://www.nehhdc.com/tenders/
 * - Official Contact Us: https://www.nehhdc.com/contact-us
 * - Ministry of Development of North Eastern Region (MDoNER), Government of India
 * 
 * Rules:
 * 1. Contains only verified public information.
 * 2. Does NOT promise employment, approval, or guaranteed funding.
 * 3. Does NOT guess active tender submission deadlines or recruitment dates.
 * 4. Each entry includes source URLs for citation.
 */

export interface KnowledgeEntry {
  id: string;
  category: 
    | 'about' 
    | 'artisan_services' 
    | 'business_services' 
    | 'marketing_retail' 
    | 'public_information' 
    | 'digital_platforms';
  title: string;
  summary: string;
  content: string;
  keywords: string[];
  sourceUrl: string;
  verifiedDate: string;
}

export const NEHHDC_KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // --- A. ABOUT NEHHDC ---
  {
    id: 'about-organization',
    category: 'about',
    title: 'About NEHHDC & Organizational Identity',
    summary: 'North Eastern Handicrafts and Handlooms Development Corporation Ltd. is a Central Public Sector Enterprise under the Ministry of Development of North Eastern Region (MDoNER), Government of India.',
    content: `The North Eastern Handicrafts and Handlooms Development Corporation Ltd. (NEHHDC) is a Government of India enterprise operating under the administrative control of the Ministry of Development of North Eastern Region (MDoNER). 

Established in 1977 under the Companies Act 1956, NEHHDC was set up to develop, promote, and market the rich indigenous handicrafts and handlooms produced by artisans and weavers across the eight states of North Eastern India: Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, and Tripura.

Core Vision: To uplift the artisans and weavers of the North Eastern Region by enhancing their quality of life, upgrading skills, fostering entrepreneurship, and expanding market demand for traditional crafts nationally and globally.`,
    keywords: [
      'about', 'what is nehhdc', 'full name', 'history', 'establishment', 'doner', 
      'ministry', 'government of india', 'cpse', 'psu', 'states', 'assam', 'meghalaya', 
      'manipur', 'nagaland', 'tripura', 'mizoram', 'arunachal pradesh', 'sikkim', '1977'
    ],
    sourceUrl: 'https://www.nehhdc.com/',
    verifiedDate: '2026-11'
  },
  {
    id: 'about-mandate-role',
    category: 'about',
    title: 'NEHHDC Mandate, Role & Craft Communities',
    summary: 'Promoting North Eastern craft communities through technical assistance, raw material supply, capacity building, and market linkages.',
    content: `NEHHDC acts as a catalyst between grassroots artisans and the commercial marketplace. 

Its key responsings include:
1. Providing technical, design, and financial assistance through central government schemes.
2. Sourcing authentic handloom and handicraft products directly from master craftsmen, self-help groups (SHGs), and cooperative societies.
3. Establishing common facility centres, testing laboratories, and raw material depots.
4. Eliminating middlemen so that artisans and weavers receive fair remuneration for their craft.
5. Operating retail emporiums, exhibitions, and e-commerce platforms under the brand name 'Purbashree'.`,
    keywords: [
      'mandate', 'role', 'objective', 'artisan welfare', 'weavers', 'market linkage', 
      'craft communities', 'empowerment', 'traditional craft', 'bamboo', 'cane', 'handloom'
    ],
    sourceUrl: 'https://www.nehhdc.com/',
    verifiedDate: '2026-11'
  },

  // --- B. CITIZEN AND ARTISAN SERVICES ---
  {
    id: 'artisan-initiatives',
    category: 'artisan_services',
    title: 'How Artisans & Weavers Can Connect with NEHHDC',
    summary: 'Artisans and weavers can register, participate in procurement drives, display crafts at Purbashree emporiums, and join training workshops.',
    content: `Artisans, weavers, and craft cooperatives from the North Eastern Region can connect with NEHHDC through multiple channels:

1. Artisan Mobilization & Registration: Artisans possessing Pehchan Cards (issued by the Ministry of Textiles) or registered with state Directorate of Handloom & Textiles / Handicrafts can enroll with NEHHDC for empanelment, direct craft sourcing, and exhibition opportunities.
2. Craft Promotion Center & Field Units: Artisans can visit NEHHDC's Craft Promotion Center at Garchuk, Guwahati or regional branch offices to submit product samples for quality evaluation and procurement.
3. Exhibition & Buyer-Seller Meets: NEHHDC organizes national and regional craft melas, exhibitions, and B2B buyer-seller meets where empaneled artisans receive stall space to sell their creations directly.
4. Contact for Onboarding: Artisans can contact NEHHDC via email at hradmin@nehhdc.com or phone at +91 361 2270000 / +91 70024 03723.`,
    keywords: [
      'artisan connect', 'weaver connect', 'register', 'how to join', 'sell my craft', 
      'empanelment', 'pehchan card', 'artisan card', 'samples', 'exhibitions', 'stalls'
    ],
    sourceUrl: 'https://www.nehhdc.com/',
    verifiedDate: '2026-11'
  },
  {
    id: 'training-programmes',
    category: 'artisan_services',
    title: 'Skill Development & Training Programmes',
    summary: 'Skill upgradation, PMKVY, SAMARTH, PM-VIKAS, and Entrepreneurship/Management Development Programmes (ESDP/MDP).',
    content: `NEHHDC functions as an active implementing agency for central skill development programs under the Ministry of Textiles, Ministry of MSME, and Ministry of Skill Development & Entrepreneurship (MSDE).

Key Training Initiatives:
- SAMARTH Scheme (Scheme for Capacity Building in Textile Sector): Advanced training in modern weaving, jacquard operations, and textile designing.
- PMKVY (Pradhan Mantri Kaushal Vikas Yojana): Certified training programs in traditional craft job roles.
- PM-VIKAS (PM Vishwakarma / Artisan Skill initiatives): Hands-on training for traditional craftspersons.
- Craft Specializations: Loin loom weaving, silk reeling and spinning, jacquard and two-shaft loom operations, hank dyeing, hand embroidery, cane & bamboo craft creation, and natural fiber processing.
- Entrepreneurship & Management Development Programs (ESDP/MDP): Training for craft micro-entrepreneurs on packaging, costing, digital literacy, and e-commerce selling.

Eligibility and enrollment are announced through official circulars on the NEHHDC portal and local district administrative offices.`,
    keywords: [
      'training', 'skill development', 'samarth', 'pmkvy', 'pm vikas', 'esdp', 'mdp', 
      'courses', 'capacity building', 'cane and bamboo', 'handloom weaving', 'dyeing', 
      'entrepreneurship', 'free training', 'stipend'
    ],
    sourceUrl: 'https://www.nehhdc.com/',
    verifiedDate: '2026-11'
  },
  {
    id: 'development-projects',
    category: 'artisan_services',
    title: 'Development & Cluster Schemes (SFURTI & MSME)',
    summary: 'Cluster development projects under SFURTI, MSME cluster initiatives, and NERTPS to build common infrastructure.',
    content: `NEHHDC implements cluster development and infrastructure projects across the North East:

1. SFURTI (Scheme of Fund for Regeneration of Traditional Industries): Establishing Common Facility Centres (CFCs), raw material banks, and modern processing equipment for traditional artisan clusters.
2. MSME Clusters: Developing specialized clusters in cane, bamboo, bell metal, pottery, woodcraft, and eri/muga silk.
3. NERTPS (North East Region Textile Promotion Scheme): Upgrading looms, providing technical kits, and establishing weaving sheds in rural clusters.
4. Beneficiary Outreach: Over thousands of artisans across remote rural blocks have benefited through tooling kits, solar-assisted looms, and quality upgrade support.`,
    keywords: [
      'clusters', 'sfurti', 'cfc', 'common facility center', 'msme', 'nertps', 
      'projects', 'development schemes', 'schemes', 'bamboo cluster'
    ],
    sourceUrl: 'https://www.nehhdc.com/',
    verifiedDate: '2026-11'
  },

  // --- C. BUSINESS AND INSTITUTIONAL SERVICES ---
  {
    id: 'institutional-sales',
    category: 'business_services',
    title: 'Institutional Sales, Corporate Gifting & B2B Procurement',
    summary: 'Custom corporate gifting, government department procurement, mementos, shawls, conference kits, and bulk orders.',
    content: `NEHHDC offers institutional sales and customized B2B sourcing services for Government Ministries, Public Sector Undertakings (PSUs), Corporate Houses, Embassies, and Educational Institutions.

Services Offered:
- Custom Corporate & VIP Gifting: Authentic handcrafted mementos, muga/eri silk shawls, stoles, cane-bamboo craft artifacts, and brass/bell metal items.
- Conference & Event Kits: Eco-friendly handloom conference folders, bags, laptop sleeves, and welcome kits made with indigenous North Eastern fibers.
- Office Furnishing & Decor: Bamboo furniture, handwoven upholstery, traditional wall hangings, and decorative artifacts for government offices and guest houses.
- GeM Portal (Government e-Marketplace): NEHHDC supplies authentic handloom and handicraft products listed on GeM for seamless government procurement.
- Inquiries: Institutions can email b2b/bulk inquiries to purbashreeonline@gmail.com or hradmin@nehhdc.com.`,
    keywords: [
      'institutional sales', 'b2b', 'corporate gifting', 'gem portal', 'bulk purchase', 
      'mementos', 'shawls', 'conference bags', 'government procurement', 'corporate gifts'
    ],
    sourceUrl: 'https://www.nehhdc.com/',
    verifiedDate: '2026-11'
  },
  {
    id: 'textile-testing-lab',
    category: 'business_services',
    title: 'Textile Testing Laboratory Facilities',
    summary: 'State-of-the-art accredited laboratory in Guwahati for comprehensive fibre, yarn, and fabric testing.',
    content: `NEHHDC houses an accredited, state-of-the-art Textile Testing Laboratory at its Craft Promotion Center complex in Garchuk, Guwahati, Assam.

The laboratory serves handloom weavers, textile manufacturers, exporters, and government agencies with certified testing:
1. Fibre Tests: Fibre identification (microscopic, burning, and chemical solubility methods) and fibre fineness.
2. Yarn Tests: Single and double yarn twist tests, lea digital tensile strength, yarn count (through wrap reel), and Count Strength Product (CSP).
3. Fabric Tests: GSM (grams per square metre) testing, fabric count, thickness, Martindale abrasion resistance and pilling test, drape coefficient, tearing strength, tensile strength, flammability test, dimensional stability (shrinkage), crease recovery, water absorbency, air permeability, and moisture content.
4. Colour Fastness Tests: Fastness to washing, rubbing (crocking), perspiration, and light.

Testing is conducted under standardized procedures with formal test certificates issued for commercial and export compliance.`,
    keywords: [
      'textile testing', 'laboratory', 'testing lab', 'fabric testing', 'gsm test', 
      'yarn test', 'fibre test', 'tensile strength', 'abrasion', 'colour fastness', 
      'guwahati lab', 'textile certificate'
    ],
    sourceUrl: 'https://www.nehhdc.com/',
    verifiedDate: '2026-11'
  },
  {
    id: 'yarn-supplies-mill',
    category: 'business_services',
    title: 'Yarn Supply, Depots & Eri Silk Spinning Mill',
    summary: 'Reliable raw material supply chain for weavers and certified Eri silk yarn production from the Bodoland mill.',
    content: `To ensure weavers get high-quality raw materials at fair, non-speculative prices, NEHHDC operates raw material depots and yarn distribution facilities:

1. Eri Silk Spinning Mill: Situated in the Bodoland Territorial Region (BTR) in Baksa, Assam. The mill processes indigenous cocoon harvest into certified, high-tensile, uniform Eri silk yarn.
2. Laboratory Certified: Yarn produced and distributed undergoes strict testing in NEHHDC's textile lab for count consistency and lea strength before delivery to weaving societies and MSMEs.
3. Yarn Depots: Operates yarn depots that supply cotton, muga silk, tussar silk, and eri silk to rural clusters, shielding small weavers from market volatility.`,
    keywords: [
      'yarn', 'yarn supply', 'eri silk', 'spinning mill', 'baksa', 'bodoland', 
      'btr', 'muga yarn', 'cotton yarn', 'yarn depot', 'raw materials'
    ],
    sourceUrl: 'https://www.nehhdc.com/',
    verifiedDate: '2026-11'
  },
  {
    id: 'catd-and-processing',
    category: 'business_services',
    title: 'CATD (Computer-Aided Textile Design) & Fabric Calendaring',
    summary: 'Modern Computer-Aided Design facilities, jacquard card punching (100/120 hooks), and fabric calendaring.',
    content: `NEHHDC provides specialized pre-loom and post-loom technical facilities to artisans and textile entrepreneurs:

1. Computer-Aided Textile Design (CATD): High-end software utilities to digitize indigenous North Eastern motifs, create intricate graph patterns, and prepare Jacquard loom layouts.
2. Design Card Punching: Automated and precision card punching facilities (supporting 100 hooks, 120 hooks, and multi-hook jacquard looms) enabling weavers to execute complex patterns without manual drafting errors.
3. Fabric Calendaring & Finishing: Post-weaving fabric calendaring equipment that provides a smooth, lustrous finish, uniform feel, and improved handle to handloom fabrics before retail distribution.`,
    keywords: [
      'catd', 'computer aided textile design', 'design card punching', 'jacquard', 
      'hooks', 'calendaring', 'fabric finishing', 'motifs', 'digitize design'
    ],
    sourceUrl: 'https://www.nehhdc.com/',
    verifiedDate: '2026-11'
  },

  // --- D. MARKETING AND RETAIL (PURBASHREE) ---
  {
    id: 'purbashree-brand',
    category: 'marketing_retail',
    title: 'Purbashree Retail Emporiums & Brand',
    summary: 'Purbashree is NEHHDC\'s flagship retail brand offering authentic Northeast handlooms, handicrafts, and silk garments.',
    content: `Purbashree is the prestigious retail brand and operational commercial wing of NEHHDC. 

Under the Purbashree banner, NEHHDC presents the authentic cultural heritage of the North East to consumers in metropolitan cities and tourist hubs across India.

Key Retail Emporium Locations:
- New Delhi: Dilli Haat, INA, New Delhi
- Kolkata: Dakshinapan Shopping Complex, Dhakuria, Kolkata, West Bengal
- Guwahati: Ambari, G.N.B. Road, Guwahati, Assam
- Shillong: Police Bazar & ISBT, Mawiongrm, Shillong, Meghalaya
- Gujarat: Ekta Mall, Statue of Unity, Kevadiya, Gujarat

Products available include Assam Muga & Eri silk sarees, Mekhela Chador, Naga shawls, Manipuri sarees, cane & bamboo home furniture and decor, water hyacinth craft, tribal jewellery, traditional musical instruments, and organic handwoven fabrics.`,
    keywords: [
      'purbashree', 'emporium', 'showroom', 'retail', 'where to buy', 'delhi haat', 
      'kolkata', 'guwahati', 'shillong', 'statue of unity', 'kevadiya', 'muga silk', 
      'eri silk', 'mekhela chador', 'naga shawl', 'bamboo craft'
    ],
    sourceUrl: 'https://www.purbashree.com/',
    verifiedDate: '2026-11'
  },
  {
    id: 'purbashree-ecommerce',
    category: 'marketing_retail',
    title: 'Purbashree E-Commerce & Online Store',
    summary: 'Online store at purbashree.com for worldwide and pan-India delivery of authentic Northeast handicrafts and handlooms.',
    content: `Consumers, collectors, and corporate buyers can purchase authentic, artisan-made North Eastern products directly online:

- Official Online Store: https://www.purbashree.com/
- Shipping: Pan-India doorstep delivery with insured courier shipping.
- Authenticity Assurance: 100% genuine handcrafted products verified directly from source artisan clusters in North East India.
- Product Categories: Silk Sarees, Dupattas & Stoles, Cane & Bamboo Furniture, Kitchen & Diningware, Handcrafted Bags & Folders, Wall Hangings, Natural Fibre Crafts, and Regional Souvenirs.
- E-commerce Support: Contact purbashreeonline@gmail.com for order inquiries, tracking, and bulk purchase quotes.`,
    keywords: [
      'online store', 'ecommerce', 'buy online', 'purbashree.com', 'shop online', 
      'shipping', 'pan india delivery', 'silk saree online', 'authentic'
    ],
    sourceUrl: 'https://www.purbashree.com/',
    verifiedDate: '2026-11'
  },

  // --- E. PUBLIC INFORMATION (TENDERS, RECRUITMENT, CONTACT) ---
  {
    id: 'tenders-procurement',
    category: 'public_information',
    title: 'Current Tenders & Procurement Notices',
    summary: 'Official tenders, Expression of Interest (EOI), and Notice Inviting Offers (NIO) are published on the official tenders portal.',
    content: `NEHHDC regularly issues public tenders, Expression of Interest (EOI) notices, Notice Inviting Offers (NIO) for emporium partnerships, civil works, equipment procurement, and raw material supply.

Important Guidelines on Tenders:
1. Official Tender URL: https://www.nehhdc.com/tenders/
2. Central Public Procurement Portal: Active tenders are also published on Government e-Procurement (etenders.gov.in) and GeM (gem.gov.in).
3. Submission Deadlines: NEHHDC frequently updates tender dates, addendums, and corrigendums. This virtual assistant cannot confirm specific live submission deadlines or opening dates.
4. How to Verify: Bidders and vendors must always download the latest official Tender Document and Corrigendum directly from https://www.nehhdc.com/tenders/ to obtain verified dates, EMD amounts, and qualification criteria.`,
    keywords: [
      'tenders', 'tender', 'procurement', 'eoi', 'expression of interest', 'nio', 
      'bid', 'quotation', 'deadline', 'due date', 'corrigendum', 'gem', 'etenders'
    ],
    sourceUrl: 'https://www.nehhdc.com/tenders/',
    verifiedDate: '2026-11'
  },
  {
    id: 'recruitment-careers',
    category: 'public_information',
    title: 'Recruitment & Job Openings Policy',
    summary: 'Official vacancy announcements, eligibility, and selection lists are published on nehhdc.com. NEHHDC cannot guarantee employment.',
    content: `All employment opportunities, consultant positions, contractual roles, and walk-in interviews at NEHHDC are published transparently on the official website.

Important Employment Guidelines:
1. Official Portal: Notices are posted under the Notifications / Current Openings section on https://www.nehhdc.com/.
2. No Job Guarantees: NEHHDC does NOT guarantee employment, recruitment, or selection through this chatbot or any unofficial third party. Recruitment is strictly subject to official advertisement, qualification criteria, and selection committee processes.
3. Beware of Fraud: NEHHDC never asks candidates for security deposits, registration fees, or processing payments through personal bank accounts. Always verify advertisements on the official site.
4. Enquiries: For human resources queries, write to hradmin@nehhdc.com.`,
    keywords: [
      'recruitment', 'job', 'career', 'vacancy', 'interview', 'opening', 'employment', 
      'apply for job', 'guarantee job', 'hiring', 'salary', 'post'
    ],
    sourceUrl: 'https://www.nehhdc.com/',
    verifiedDate: '2026-11'
  },
  {
    id: 'contact-offices',
    category: 'public_information',
    title: 'Official Contact Details & Office Addresses',
    summary: 'Corporate office in Guwahati, registered office in Shillong, and key official telephone numbers and email addresses.',
    content: `Official contact information for NEHHDC:

1. Corporate Office:
   North Eastern Handicrafts and Handlooms Development Corporation Ltd.
   Craft Promotion Center, Garchuk, Pamohi Road,
   Guwahati - 781035, Assam, India.
   - Telephone: +91 361 2270000 / +91 70024 03723
   - Email: hradmin@nehhdc.com / purbashreeonline@gmail.com

2. Registered Office:
   C/O Purbashree Emporium, NEHHDC Ltd.,
   Police Bazar, Shillong - 793001, Meghalaya, India.
   - Telephone/Fax: 0364-2224477
   - Email: secretariat@nehhdc.com / md.nehhdcl@gmail.com

3. Official Website: https://www.nehhdc.com/
4. Official Contact Page: https://www.nehhdc.com/contact-us

For formal requests, grievances, administrative queries, or RTI matters, please use the official email addresses above.`,
    keywords: [
      'contact', 'address', 'phone', 'telephone', 'email', 'office', 'guwahati', 
      'shillong', 'corporate office', 'head office', 'registered office', 'location'
    ],
    sourceUrl: 'https://www.nehhdc.com/contact-us',
    verifiedDate: '2026-11'
  },
  {
    id: 'rti-governance',
    category: 'public_information',
    title: 'RTI, Annual Reports & Governance Notices',
    summary: 'Statutory compliance, Right to Information (RTI) act disclosures, annual reports, and citizen charter.',
    content: `As a Government of India Public Sector Enterprise under MDoNER, NEHHDC adheres to transparency standards:

1. Right to Information (RTI): Citizens can file RTI applications seeking public information under the RTI Act 2005. The designated Public Information Officer (PIO) and Appellate Authority details are published on the website.
2. Annual Reports: Audited annual reports, financial balance sheets, and performance disclosures are accessible under the Corporate Reports section of https://www.nehhdc.com/.
3. Grievance Redressal: Grievances can be submitted through the CPGRAMS portal (Centralized Public Grievance Redress and Monitoring System - pgportal.gov.in) or directly to the Nodal Grievance Officer at hradmin@nehhdc.com.`,
    keywords: [
      'rti', 'right to information', 'annual report', 'governance', 'complaint', 
      'grievance', 'audit', 'cpgrams', 'citizen charter'
    ],
    sourceUrl: 'https://www.nehhdc.com/',
    verifiedDate: '2026-11'
  },

  // --- F. DIGITAL PLATFORMS ---
  {
    id: 'digital-platforms',
    category: 'digital_platforms',
    title: 'Official Digital Platforms & Mobile Application',
    summary: 'Official NEHHDC portal, Purbashree e-store, and official NEHHDC Android mobile application on Google Play Store.',
    content: `NEHHDC operates the following verified digital touchpoints:

1. Main Website: https://www.nehhdc.com/ - The primary source for corporate announcements, tenders, services, cluster updates, and event schedules.
2. Purbashree Online Store: https://www.purbashree.com/ - The direct-to-consumer e-commerce portal for purchasing certified handloom and handicraft products.
3. Official Mobile App: 'NEHHDC' mobile app (developed with Geekworkx Technologies) available on the Google Play Store for staying updated with artisan communities, exhibitions, craft notifications, and institutional events.
4. Social Media: Official updates are periodically posted via MDoNER and NEHHDC official handles.`,
    keywords: [
      'website', 'app', 'mobile app', 'play store', 'download app', 'portal', 
      'digital', 'online', 'geekworkx'
    ],
    sourceUrl: 'https://www.nehhdc.com/',
    verifiedDate: '2026-11'
  }
];

export const SUGGESTED_QUESTIONS = [
  'What is NEHHDC?',
  'What services does NEHHDC provide?',
  'How can artisans and weavers connect with NEHHDC?',
  'What training programmes are available?',
  'Where can I find current tenders?',
  'How can I contact NEHHDC?',
  'How can I purchase Northeast handicrafts and handlooms?',
  'What institutional and B2B services does NEHHDC offer?'
] as const;
