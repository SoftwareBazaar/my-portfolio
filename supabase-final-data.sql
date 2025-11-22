-- ============================================
-- FINAL DATA UPDATE - REAL PROJECTS & CONTENT
-- Remove all mock data and add real content
-- ============================================

-- ============================================
-- 1. CLEAN UP - Remove all mock/sample data
-- ============================================

DELETE FROM projects WHERE slug IN (
  'sample-project', 
  'tradetime-pro', 
  'ai-founder-lab', 
  'founder-notes',
  'smart-algos-trading-platform',
  'thrift-shop-inventory'
);

DELETE FROM companies WHERE slug IN (
  'sample-company'
);

DELETE FROM articles WHERE slug NOT IN (
  'getting-started' -- Keep only if this is your derisking article, otherwise remove this line
);

-- ============================================
-- 2. ADD REAL PROJECTS
-- ============================================

-- Project 1: SmartAlgos Platform
INSERT INTO projects (
  slug,
  title,
  summary,
  description,
  published_at,
  tech_tags,
  featured,
  status,
  thumbnail_url,
  live_url,
  github_url
)
VALUES (
  'smartalgos-platform',
  'SmartAlgos Platform',
  'Algorithmic trading and AI hub for equities, forex, and crypto desks.',
  E'# SmartAlgos Platform\n\nA comprehensive algorithmic trading platform that combines AI-powered trading strategies with real-time market analysis for professional traders and institutions.\n\n## Overview\n\nSmartAlgos Platform is a cutting-edge trading solution that leverages machine learning and artificial intelligence to provide traders with advanced tools for equities, forex, and cryptocurrency markets.\n\n## Key Features\n\n### AI-Powered Trading\n- Machine learning algorithms that adapt to market conditions\n- Real-time pattern recognition and trend analysis\n- Automated trading strategies with risk management\n- Backtesting engine for strategy validation\n\n### Multi-Asset Support\n- Trade equities, forex, and cryptocurrencies from one platform\n- Real-time market data feeds\n- Multi-exchange connectivity\n- Advanced order execution\n\n### Analytics & Insights\n- Advanced charting and technical analysis tools\n- Portfolio tracking and performance analytics\n- Risk management dashboard\n- Custom indicator development\n\n## Technology Stack\n\n### Frontend\n- **React 18**: Modern UI with hooks and concurrent features\n- **Tailwind CSS**: Utility-first styling for responsive design\n- **Framer Motion**: Smooth animations and transitions\n\n### Backend\n- **Node.js/Express**: Scalable server architecture\n- **Socket.io**: Real-time bidirectional communication\n- **WebSockets**: Live market data streaming\n\n### Database\n- **MongoDB**: Flexible document storage for trading data\n- **Redis**: High-performance caching and session management\n\n### AI/ML\n- **TensorFlow**: Deep learning models for price prediction\n- **PyTorch**: Neural networks for pattern recognition\n- **NLP**: Sentiment analysis from news and social media\n\n### Notable Integrations\n- **Electron Desktop**: Native desktop application\n- **Paystack**: Payment processing for subscriptions\n- **Stripe**: International payment gateway\n- **Chart.js**: Interactive financial charts\n- **Multisig Escrow**: Secure transaction handling\n\n## Use Cases\n\n- Professional day traders seeking algorithmic advantages\n- Hedge funds requiring automated trading strategies\n- Retail investors wanting AI-powered insights\n- Trading desks needing multi-asset management\n\n## Platform Benefits\n\n- **Reduced Emotional Trading**: Automated strategies remove emotion from decisions\n- **24/7 Market Monitoring**: Never miss trading opportunities\n- **Risk Management**: Built-in controls to protect capital\n- **Backtesting**: Validate strategies before live trading\n- **Real-Time Analytics**: Make informed decisions quickly\n\nThe platform serves professional traders and institutions looking to leverage algorithmic trading strategies for consistent returns.',
  NOW(),
  ARRAY['React 18', 'Tailwind', 'Framer Motion', 'Node.js', 'Express', 'Socket.io', 'WebSockets', 'MongoDB', 'Redis', 'Electron', 'Paystack', 'Stripe', 'Chart.js', 'Multisig', 'TensorFlow', 'PyTorch', 'NLP'],
  true,
  'live',
  '/images/placeholders/project-placeholder.svg',
  'https://web-production-fdb58.up.railway.app/',
  NULL
);

-- Project 2: Thrift Shop Inventory
INSERT INTO projects (
  slug,
  title,
  summary,
  description,
  published_at,
  tech_tags,
  featured,
  status,
  thumbnail_url,
  live_url,
  github_url
)
VALUES (
  'thrift-shop-inventory',
  'Thrift Shop Inventory',
  'Retail and donation inventory intelligence with channel integrations.',
  E'# Thrift Shop Inventory System\n\nA comprehensive inventory management system designed specifically for thrift shops, donation centers, and retail operations handling second-hand goods.\n\n## Overview\n\nThis system streamlines the entire lifecycle of donated and retail items, from intake to sale, with intelligent tracking and multi-channel integration capabilities.\n\n## Key Features\n\n### Smart Inventory Tracking\n- Real-time tracking of donations and sales\n- Automated item categorization\n- Condition assessment and grading\n- Location tracking across multiple stores\n- Stock level monitoring and alerts\n\n### Channel Integrations\n- Connect with multiple sales channels\n- Synchronized inventory across platforms\n- Automated listing creation\n- Price optimization based on market data\n\n### Donation Management\n- Donor information tracking\n- Donation receipt generation\n- Tax documentation automation\n- Donor portal for contribution tracking\n- Thank you letter automation\n\n### Barcode/SKU Management\n- Easy product identification and tracking\n- Mobile barcode scanning\n- Custom SKU generation\n- Batch processing capabilities\n\n### Sales Analytics\n- Detailed reporting and insights\n- Revenue tracking by category\n- Donor impact reports\n- Inventory turnover analysis\n- Seasonal trend identification\n\n## Technology Stack\n\n### Frontend\n- **React (Vercel)**: Modern, fast-loading user interface\n- **Tailwind CSS**: Responsive design for all devices\n- Mobile-optimized for on-the-go inventory management\n\n### Backend\n- **Node.js Serverless APIs**: Scalable, cost-effective backend\n- RESTful API architecture\n- Automated workflows and triggers\n\n### Database\n- **MongoDB**: Flexible schema for diverse inventory items\n- Document-based storage for complex item attributes\n- Fast queries for real-time inventory updates\n\n### Integrations\n- **Vercel Deployments**: Fast, reliable hosting with automatic scaling\n- **Barcode/SKU Scanning**: Mobile and desktop scanning support\n- **Stripe**: Secure payment processing\n- **REST API Automations**: Connect with external systems\n- **Extensible Plugin System**: (Planned) Custom integrations\n\n## Notable Features\n\n### Automated Pricing\n- AI-suggested pricing based on item condition\n- Market data analysis for competitive pricing\n- Dynamic pricing adjustments\n- Bulk pricing tools\n\n### Donor Portal\n- Self-service portal for donors\n- Track contribution history\n- View impact reports\n- Download tax receipts\n\n### Tax Receipt Generation\n- Automatic generation of donation receipts\n- IRS-compliant documentation\n- Email delivery to donors\n- Annual summary reports\n\n### Inventory Alerts\n- Low stock notifications\n- Reorder suggestions\n- Slow-moving item alerts\n- Seasonal inventory planning\n\n### Mobile App\n- Scan and manage inventory on the go\n- Quick item intake process\n- Photo capture for listings\n- Real-time sync with main system\n\n## Benefits\n\n- **Increased Efficiency**: Reduce time spent on manual inventory tasks\n- **Better Accuracy**: Minimize errors in tracking and pricing\n- **Improved Revenue**: Optimize pricing and reduce waste\n- **Donor Satisfaction**: Professional receipts and impact reporting\n- **Multi-Location Support**: Manage multiple stores from one system\n\nThis system helps thrift shops streamline operations, improve inventory accuracy, and maximize revenue from donations while providing excellent donor experiences.',
  NOW(),
  ARRAY['React', 'Vercel', 'Tailwind', 'Node.js', 'MongoDB', 'Stripe', 'REST API', 'Barcode/SKU', 'Serverless'],
  true,
  'live',
  '/images/placeholders/project-placeholder.svg',
  'https://thrift-shop-inventor-git-9a738b-john-wanyagas-projects-3586103c.vercel.app/',
  NULL
);

-- ============================================
-- 3. ADD REAL COMPANY
-- ============================================

INSERT INTO companies (
  slug,
  name,
  tagline,
  logo_url,
  website
)
VALUES (
  'smart-algos-trading-solutions',
  'Smart Algos Trading Solutions',
  'Financial investment, hedging and trading tool innovations for sell and rent. Founded in 2024. Role: Founder & CEO',
  '/images/companies/smart-algos-logo.jpg',
  'https://web-production-fdb58.up.railway.app/'
);

-- ============================================
-- 4. VERIFY DATA
-- ============================================

SELECT 'Data update completed successfully!' as status;

-- Show projects
SELECT 'PROJECTS:' as section;
SELECT slug, title, status, featured, live_url FROM projects ORDER BY published_at DESC;

-- Show companies
SELECT 'COMPANIES:' as section;
SELECT slug, name, website FROM companies ORDER BY created_at DESC;

-- Show articles
SELECT 'ARTICLES:' as section;
SELECT slug, title, featured FROM articles ORDER BY published_at DESC;
