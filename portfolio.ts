'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function savePortfolio(content: any, username: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Unauthorized")

  // 1. Update the user's profile with their name/bio
  await supabase
    .from('profiles')
    .update({ 
      full_name: content.fullName,
      bio: content.bio,
      username: username.toLowerCase() 
    })
    .eq('id', user.id)

  // 2. Save the actual portfolio content
  const { error } = await supabase
    .from('portfolios')
    .upsert({
      user_id: user.id,
      content: content,
      username: username.toLowerCase(),
    }, { onConflict: 'user_id' })

  if (error) throw error

  revalidatePath(`/portfolios/${username}`)
}