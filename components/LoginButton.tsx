'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatedLoginButton } from './AnimatedLoginButton'
import { useToast } from "@/hooks/use-toast"

interface LoginButtonProps {
  email: string;
  password: string;
}

export function LoginButton({ email, password }: LoginButtonProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        router.push('/admin/dashbotard')
      } else {
        console.error('Login failed:', data.error, data.details)
        toast({
          title: "Login Failed",
          description: data.error || "An error occurred during login.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error during login:', error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatedLoginButton onClick={handleLogin} loading={loading}>
      Login
    </AnimatedLoginButton>
  )
}

