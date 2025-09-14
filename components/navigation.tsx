"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import GlobalSearch from "@/components/search/global-search"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/places", label: "Places" },
    { href: "/festivals", label: "Festivals" },
    { href: "/culture", label: "Culture" },
    { href: "/reviews", label: "Reviews" },
    { href: "/map", label: "Map" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="text-primary-foreground font-bold text-lg">JH</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl text-primary">Jharkhand Tourism</span>
                <p className="text-xs text-muted-foreground">Explore Nature's Paradise</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  pathname === link.href 
                    ? "text-primary bg-primary/10 shadow-sm" 
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar & Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="w-64">
              <GlobalSearch placeholder="Search destinations, festivals..." className="w-full" />
            </div>
            <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-200">
              <Link href="/book-tour" className="whitespace-nowrap">Book Tour</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-primary/10"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-4 pt-4 pb-6 space-y-3 bg-card/50 backdrop-blur-sm">
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      pathname === link.href 
                        ? "text-primary bg-primary/10 border-l-4 border-primary" 
                        : "text-card-foreground hover:text-primary hover:bg-primary/5 hover:translate-x-1"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              
              <div className="pt-4 space-y-3 border-t border-border">
                <div className="px-4">
                  <GlobalSearch 
                    placeholder="Search destinations..." 
                    className="w-full" 
                    showResults={false}
                  />
                </div>
                <div className="px-4">
                  <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-200">
                    <Link href="/book-tour" onClick={() => setIsMenuOpen(false)}>Book Cultural Tour</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
