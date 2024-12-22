'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '../lib/supabase-client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { AnimatedSubmitButton } from './AnimatedSubmitButton'
import { SuccessToast } from './SuccessToast'

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  cnic: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, { message: "CNIC must be in the format 12345-1234567-1" }),
  phone: z.string().regex(/^92\d{10}$/, { message: "Phone number must start with 92 followed by 10 digits" }),
  position: z.string().min(1, { message: "Please select a position." }),
  experience: z.union([z.number().min(0), z.string().transform(v => v === '' ? 0 : Number(v))]),
  houseNumber: z.string().min(1, { message: "House number is required." }),
})

const positions = [
  "Teacher",
  "Administrator",
  "Counselor",
  "Librarian",
  "IT Specialist",
]

export default function RecruitmentForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      cnic: "",
      phone: "",
      position: "",
      experience: 0,
      houseNumber: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('applications')
        .insert([
          {
            name: values.name,
            email: values.email,
            cnic: values.cnic,
            phone: values.phone,
            position: values.position,
            experience: values.experience,
            house_number: values.houseNumber,
          },
        ])

      if (error) throw error

      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
        action: <SuccessToast />,
      })
      form.reset()
    } catch (error) {
      console.error('Error submitting application:', error)
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cnic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNIC</FormLabel>
              <FormControl>
                <Input
                  placeholder="12345-1234567-1"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 13);
                    const formattedValue = value.replace(/(\d{5})(\d{7})(\d{1})/, '$1-$2-$3');
                    field.onChange(formattedValue);
                  }}
                />
              </FormControl>
              <FormDescription>Format: 12345-1234567-1</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="923001234567"
                  {...field}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (!value.startsWith('92')) {
                      value = '92' + value;
                    }
                    value = value.slice(0, 12);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormDescription>Format: 923001234567</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Applying for Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value === '' ? '' : Number(e.target.value);
                    field.onChange(value);
                  }}
                  value={field.value === 0 ? '' : field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="houseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>House Number</FormLabel>
              <FormControl>
                <Input placeholder="123-A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AnimatedSubmitButton loading={isSubmitting}>Submit Application</AnimatedSubmitButton>
      </form>
    </Form>
  )
}

