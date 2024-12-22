import { CheckCircle } from 'lucide-react'

export function SuccessToast() {
  return (
    <div className="flex items-center space-x-2">
      <CheckCircle className="h-6 w-6 text-green-500" />
      <span className="text-green-600 font-medium">Success!</span>
    </div>
  )
}

