import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaHardHat, FaTools } from "react-icons/fa"
import './App.css'

function App() {


  return (
    <>
     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
            <FaHardHat className="text-yellow-500" />
            Page Under Construction
          </CardTitle>
          <CardDescription>We&apos;re working hard to bring you something amazing!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <FaTools className="text-6xl text-primary animate-pulse" />
          </div>
          <p className="text-center text-muted-foreground">
            Our team is currently building this page. Please check back soon for updates!
          </p>
          <div className="flex justify-center">
            <Button variant="default" className="mt-4">
              Return Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  )
}

export default App
