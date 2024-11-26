import * as React from "react";
import { ModalContext } from "@/components/calories/CookiesTracker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PlusSquare,
  Trash2,
  Eye,
  Cookie,
  ArrowDownUp,
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SelectAll from "@/components/global/selectAll";

export default function CookiesList({
  data: cookiesData,
  generateCookiesToSend,
}) {
  // Use the context to access the state and its updater function
  const { setModalState } = React.useContext(ModalContext);

  const [filter, setFilter] = React.useState("");
  const [checkedCookies, setCheckedCookies] = React.useState([]);

  const toggleCheckedCookies = (id, isChecked) => {
    setCheckedCookies((prevState) =>
      isChecked
        ? [...prevState, id]
        : prevState.filter((cookieId) => cookieId !== id)
    );
  };

  return (
    <Card className="flex flex-col justify-between gap-2 box-border">
      <CardHeader>
        <CardTitle>Cookies list</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="grid grid-cols-4 gap-2">
          <Input
            className="col-span-3"
            type="text"
            placeholder="Filter cookies names..."
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ArrowDownUp />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <ArrowUpNarrowWide />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowDownWideNarrow />
                Desc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SelectAll
            className="col-span-2"
            items={cookiesData}
            selectedItems={checkedCookies}
            onSelectionChange={(newSelection) =>
              setCheckedCookies(newSelection)
            }
          />
          <Button
            variant="outline"
            className="col-span-2"
            onClick={() => setModalState({ isOpen: true, cookieData: null })}
          >
            <PlusSquare />
            New
          </Button>
        </div>
        <ScrollArea className="h-72 rounded-md border p-2 box-border">
          {cookiesData
            .filter((cookie) =>
              cookie.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((cookie) => (
              <div key={cookie.id}>
                <Card className="grid grid-cols-1 gap-3 items-center p-3">
                  <div className="flex flex-col gap-3 items-center justify-center lg:justify-normal sm:flex-row">
                    <Checkbox
                      checked={checkedCookies.includes(cookie.id)}
                      onCheckedChange={(checked) =>
                        toggleCheckedCookies(cookie.id, checked)
                      }
                    />
                    <CardTitle className="flex items-center gap-1">
                      <Cookie size={18} className="text-amber-900" />
                      {cookie.name}
                    </CardTitle>
                  </div>
                  <div className="flex flex-col items-center justify-between lg:flex-row">
                    <CardDescription>
                      Calories: {cookie.calories}
                    </CardDescription>
                    <div className="flex justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => generateCookiesToSend(cookie.id)}
                      >
                        <Eye />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {`Are you absolutely sure you want to delete ${cookie.name}`}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {`This action cannot be undone. This will permanently
                            delete ${cookie.name}`}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
                <Separator className="my-3" />
              </div>
            ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" disabled={checkedCookies.length < 2}>
              <Trash2 />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you absolutely sure you want to delete these cookies?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete these
                cookies
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          variant="outline"
          onClick={() => {
            generateCookiesToSend(checkedCookies);
            setCheckedCookies([]);
          }}
          disabled={checkedCookies.length < 2}
        >
          <Eye />
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
