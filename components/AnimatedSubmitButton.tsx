import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

interface AnimatedSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function AnimatedSubmitButton({ children, loading, ...props }: AnimatedSubmitButtonProps) {
  return (
    <Button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        children
      )}
    </Button>
  )
}

