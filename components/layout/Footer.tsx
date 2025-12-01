import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, MessageCircle } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/SoftwareBazaar", icon: Github, label: "GitHub" },
  { href: "https://x.com/TheSelectMan73", icon: Twitter, label: "X (Twitter)" },
  { href: "https://www.linkedin.com/in/john-wanyaga-9b2a72367", icon: Linkedin, label: "LinkedIn" },
  { href: "https://wa.me/254746054224", icon: MessageCircle, label: "WhatsApp" },
  { href: "mailto:softwarebazaar.ke@gmail.com", icon: Mail, label: "Email" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-foreground">John Wanyaga</h3>
            <p className="mt-2 text-sm text-foreground-secondary">
              Algorithmic trading, fintech systems, and quantitative research
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-foreground-secondary transition-colors hover:text-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-sm text-foreground-secondary transition-colors hover:text-primary"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-sm text-foreground-secondary transition-colors hover:text-primary"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-foreground-secondary transition-colors hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Connect</h4>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-secondary transition-colors hover:text-primary"
                    aria-label={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-foreground-secondary">
            © {currentYear} John Wanyaga. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

