'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */


import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, Plus, Menu, Home, Code2, Shield, BookOpen, Settings, HelpCircle, LogOut, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from 'next/image'

export default function Repository() {
  const [repositories, setRepositories] = useState([
    {
      name: 'design-system',
      description: 'React-based design system',
      language: 'React',
      size: '7320 KB',
      status: 'Public',
      updatedAt: '1 day ago'
    },
    {
      name: 'codeant-ci-app',
      description: 'CI/CD application',
      language: 'JavaScript',
      size: '5871 KB',
      status: 'Private',
      updatedAt: '2 days ago'
    },
    {
      name: 'analytics-dashboard',
      description: 'Analytics dashboard application',
      language: 'Python',
      size: '4521 KB',
      status: 'Private',
      updatedAt: '5 days ago'
    }
  ])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const navItems = [
    { title: 'Repositories', icon: Home, active: true },
    { title: 'AI Code Review', icon: Code2 },
    { title: 'Cloud Security', icon: Shield },
    { title: 'How to Use', icon: BookOpen },
    { title: 'Settings', icon: Settings }
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  const LanguageDot = ({ language }: { language: string }) => {
    const colors: { [key: string]: string } = {
      React: 'bg-blue-400',
      JavaScript: 'bg-yellow-400',
      Python: 'bg-green-400',
      Swift: 'bg-orange-400',
      Java: 'bg-red-400',
      'HTML/CSS': 'bg-purple-400',
      PHP: 'bg-indigo-400'
    }
    return (
      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${colors[language] || 'bg-gray-400'}`} />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden border-b bg-white">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <Image src="/codeantai.jpg" alt="CodeAnt AI" width={32} height={32} />
            <span className="font-semibold">CodeAnt AI</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[300px] p-0">
              <div className="flex flex-col h-full">
                <SheetHeader className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <Select defaultValue="UtkarshDhairyaPanwar">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UtkarshDhairyaPanwar">UtkarshDhairyaPanwar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </SheetHeader>
                <div className="flex-1 overflow-auto py-2">
                  {navItems.map((item) => (
                    <a
                      key={item.title}
                      href="#"
                      className={`flex items-center px-4 py-2 text-sm ${
                        item.active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.title}
                    </a>
                  ))}
                </div>
                <div className="border-t">
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <HelpCircle className="h-4 w-4 mr-3" />
                    Support
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="flex h-[calc(100vh-3.5rem)] md:h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 h-14 px-4 border-b">
              <Image src="/codeantai.webp" alt="CodeAnt AI" width={32} height={32} />
              <span className="font-semibold">CodeAnt AI</span>
            </div>
            <div className="p-4 border-b">
              <Select defaultValue="UtkarshDhairyaPanwar">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UtkarshDhairyaPanwar">UtkarshDhairyaPanwar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 overflow-auto">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href="#"
                  className={`flex items-center px-4 py-2 text-sm ${
                    item.active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.title}
                </a>
              ))}
            </div>
            <div className="border-t mt-auto">
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <HelpCircle className="h-4 w-4 mr-3" />
                Support
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:pl-64">
          {/* Desktop Header */}
          <div className="hidden md:flex flex-col h-[104px] px-4 border-b bg-white">
            <div className="flex items-center justify-between h-14">
              <h1 className="text-xl font-semibold">Repositories</h1>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh All
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Repository
                </Button>
              </div>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="text-sm text-gray-500">{repositories.length} total repositories</p>
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="md:hidden flex items-center justify-between p-4">
            <p className="text-sm text-gray-500">{repositories.length} total repositories</p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh All
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Repository
              </Button>
            </div>
          </div>

          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search Repositories"
                className="pl-10"
              />
            </div>

            <div className="space-y-4">
              {repositories.map((repo) => (
                <div
                  key={repo.name}
                  className="bg-white rounded-lg border p-4 hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium hover:text-blue-600">
                          <a href="#">{repo.name}</a>
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {repo.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {repo.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <LanguageDot language={repo.language} />
                      {repo.language}
                    </span>
                    <span>{repo.size}</span>
                    <span>Updated {repo.updatedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

