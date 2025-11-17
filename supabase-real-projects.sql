-- ============================================
-- ADD REAL PROJECTS
-- Run this to add your actual projects
-- ============================================

-- Delete sample/mock projects first (optional)
DELETE FROM projects WHERE slug IN ('sample-project', 'tradetime-pro', 'ai-founder-lab', 'founder-notes');

-- Insert Smart Algos Trading Platform
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
  live_url
)
VALUES (
  'smart-algos-trading-platform',
  'Smart Algos Trading Platform',
  'Algorithmic trading and AI hub for equities, forex, and crypto desks.',
  E'Smart Algos is a comprehensive algorithmic trading platform that combines AI-powered trading strategies with real-time market analysis.\n\n## Key Features\n\n- **AI-Powered Trading**: Machine learning algorithms that adapt to market conditions\n- **Multi-Asset Support**: Trade equities, forex, and cryptocurrencies from one platform\n- **Real-Time Analytics**: Advanced charting and technical analysis tools\n- **Risk Management**: Built-in risk controls and portfolio optimization\n- **Backtesting Engine**: Test strategies against historical data\n\n## Technology Stack\n\n**Frontend**: React 18, Tailwind CSS, Framer Motion for smooth animations\n**Backend**: Node.js/Express, Socket.io for real-time data, WebSockets\n**Database**: MongoDB with Redis for caching\n**AI/ML**: TensorFlow, PyTorch for machine learning models, NLP for sentiment analysis\n**Integrations**: Electron desktop app, Paystack for payments, Stripe, Chart.js, Multisig Escrow\n\n## Notable Integrations\n\n- Real-time market data feeds\n- Multi-exchange connectivity\n- Advanced order execution\n- Portfolio tracking and analytics\n- Automated trading bots\n\nThe platform serves professional traders and institutions looking to leverage algorithmic trading strategies.',
  NOW(),
  ARRAY['React 18', 'Tailwind', 'Framer Motion', 'Node.js', 'Express', 'Socket.io', 'WebSockets', 'MongoDB', 'Redis', 'Electron', 'Paystack', 'Stripe', 'Chart.js', 'Multisig', 'TensorFlow', 'PyTorch', 'NLP'],
  true,
  'Completed',
  '/images/projects/smart-algos.jpg',
  'https://smartalgos.com'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  description = EXCLUDED.description,
  tech_tags = EXCLUDED.tech_tags,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status;

-- Insert Thrift Shop Inventory
INSERT INTO projects (
  slug,
  title,
  summary,
  description,
  published_at,
  tech_tags,
  featured,
  status,
  thumbnail_url
)
VALUES (
  'thrift-shop-inventory',
  'Thrift Shop Inventory',
  'Retail and donation inventory intelligence with channel integrations.',
  E'A comprehensive inventory management system designed specifically for thrift shops and donation centers.\n\n## Key Features\n\n- **Smart Inventory Tracking**: Real-time tracking of donations and sales\n- **Channel Integrations**: Connect with multiple sales channels\n- **Barcode/SKU Management**: Easy product identification and tracking\n- **Donation Management**: Track donors, donations, and tax receipts\n- **Sales Analytics**: Detailed reporting and insights\n- **Multi-Location Support**: Manage multiple store locations\n\n## Technology Stack\n\n**Frontend**: React (Vercel), Tailwind CSS for responsive design\n**Backend**: Node.js serverless APIs\n**Database**: MongoDB (assumed) for flexible data storage\n**Integrations**: \n- Vercel deployments for fast, reliable hosting\n- Barcode/SKU scanning integration\n- Stripe for payment processing\n- REST API automations\n- Extensible plugin system (planned)\n\n## Notable Features\n\n- **Automated Pricing**: AI-suggested pricing based on item condition and market data\n- **Donor Portal**: Self-service portal for donors to track their contributions\n- **Tax Receipt Generation**: Automatic generation of donation receipts\n- **Inventory Alerts**: Low stock and reorder notifications\n- **Mobile App**: Scan and manage inventory on the go\n\nThis system helps thrift shops streamline operations, improve inventory accuracy, and maximize revenue from donations.',
  NOW(),
  ARRAY['React', 'Vercel', 'Tailwind', 'Node.js', 'MongoDB', 'Stripe', 'REST API', 'Barcode/SKU', 'Serverless'],
  true,
  'Completed',
  '/images/projects/thrift-shop.jpg'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  description = EXCLUDED.description,
  tech_tags = EXCLUDED.tech_tags,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status;

-- Verify projects were added
SELECT 'Projects added successfully!' as status;
SELECT slug, title, featured FROM projects ORDER BY published_at DESC;
