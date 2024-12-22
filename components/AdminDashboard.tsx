'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LogoutButton } from './LogoutButton'

type Application = {
  id: string
  name: string
  email: string
  cnic: string
  phone: string
  position: string
  experience: number
  house_number: string
  created_at: string
}

export default function AdminDashboard({ applications }: { applications: Application[] }) {
  return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-blue-600">Admin Dashboard</h2>
          <LogoutButton />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>CNIC</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>House Number</TableHead>
                <TableHead>Applied At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>{application.name}</TableCell>
                    <TableCell>{application.email}</TableCell>
                    <TableCell>{application.cnic}</TableCell>
                    <TableCell>{application.phone}</TableCell>
                    <TableCell>{application.position}</TableCell>
                    <TableCell>{application.experience} years</TableCell>
                    <TableCell>{application.house_number}</TableCell>
                    <TableCell>{new Date(application.created_at).toLocaleString()}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
  )
}

