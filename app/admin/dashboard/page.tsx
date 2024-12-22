import { supabase } from '../../../lib/supabase-client'
import AdminDashboard from '../../../components/AdminDashboard'

async function getApplications() {
  const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching applications:', error)
    return []
  }

  return data
}

export default async function Dashboard() {
  const applications = await getApplications()

  return (
      <div>
        <AdminDashboard applications={applications} />
      </div>
  )
}

