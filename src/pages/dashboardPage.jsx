import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaHardHat, FaTools } from "react-icons/fa";

export const DashboardPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md border-none shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
            <FaHardHat className="text-yellow-500" />
            Page under construction
          </CardTitle>
          <CardDescription>
            We&apos;re working hard to bring you something amazing!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <FaTools className="text-6xl text-primary animate-pulse" />
          </div>
          <p className="text-center text-muted-foreground">
            Our team is currently building this page. Please check back soon for
            updates!
          </p>
          <div className="flex justify-center">
            <Button variant="default" className="mt-4">
              Return home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
