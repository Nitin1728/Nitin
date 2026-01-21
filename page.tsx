import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function PublicPortfolio({ params }: { params: { username: string } }) {
  const supabase = await createClient()
  
  // 1. Fetch the portfolio data using the username from the URL
  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('*')
    .eq('username', params.username)
    .single()

  // 2. If no portfolio exists for this username, show a 404 page
  if (!portfolio) {
    notFound()
  }

  const { content } = portfolio

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="py-20 px-6 max-w-4xl mx-auto text-center border-b">
        <h1 className="text-5xl font-extrabold text-slate-900">{content.fullName}</h1>
        <p className="mt-6 text-xl text-slate-600 leading-relaxed">
          {content.bio}
        </p>
      </header>

      {/* Skills Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-slate-800 uppercase tracking-widest text-sm">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {content.skills.map((skill: string) => (
            <span key={skill} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full font-medium">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto bg-slate-50">
        <h2 className="text-2xl font-bold mb-10 text-slate-800">Featured Projects</h2>
        <div className="grid gap-8">
          {content.projects.map((project: any) => (
            <div key={project.title} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-10 text-center text-slate-400 text-sm">
        Built with MyPortfolio AI
      </footer>
    </div>
  )
}