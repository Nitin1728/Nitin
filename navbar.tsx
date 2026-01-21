'use client'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Navbar({ email }: { email?: string }) {
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl tracking-tight text-blue-600">
        PortfolioAI
      </Link>
      
      <div className="flex items-center gap-6">
        {email ? (
          <>
            <span className="text-sm text-gray-500 hidden md:block">{email}</span>
            <button 
              onClick={handleSignOut}
              className="text-sm font-medium text-red-600 hover:text-red-700 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/login" className="text-sm font-medium">Log In</Link>
        )}
      </div>
    </nav>
  )
}