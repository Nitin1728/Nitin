import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b p-4 flex justify-between items-center">
        <span className="font-bold text-xl">MyPortfolio AI</span>
        <div className="flex gap-4 items-center">
          <span className="text-sm text-gray-500">{user.email}</span>
          <button className="text-sm text-red-500">Sign Out</button>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}