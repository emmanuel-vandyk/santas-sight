import * as React from "react";
import { ReindeerModalInfo } from "@/components/reindeer/reindeerModalInfo";
import ReindeerModal from "@/components/reindeer/ReindeerModal";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

export default function ReindeersTable({
  data,
  updateReindeer,
  addNewReindeer,
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedReindeer, setSelectedReindeer] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState({
    ReindeerModal: false,
    ReindeerModalInfo: false,
  });
  const [editingReindeer, setEditingReindeer] = React.useState(null);

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "avatar",
      header: ({ column }) => (
        <p className="hidden md:block">Avatar</p>
      ),
      cell: ({ row }) => {
        const initials = (row.getValue("name") || "").slice(0, 2).toUpperCase();
        return (
          <div className="hidden md:grid place-items-center">
            <Avatar>
              <AvatarImage
                src={
                  row.getValue("name") === "Rudolph"
                    ? "https://www.svgrepo.com/show/507092/cel-reindeer.svg"
                    : "https://www.svgrepo.com/show/507136/cel-reindeer.svg"
                }
                alt="Reindeer Avatar"
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <p className="hidden md:block">Id</p>
      ),
      cell: ({ row }) => (
        <div className="text-center hidden md:block font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <p className="hidden md:block">Type</p>
      ),
      cell: ({ row }) => (
        <div className="capitalize hidden md:block">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "available",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        if (row.getValue("available")) {
          return !data[row.index].assignedToSanta ? (
            <Badge variant="outline" className="bg-green-300">
              Available
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-orange-300">
              Assigned
            </Badge>
          );
        } else {
          return <Badge variant="destructive">Not Available</Badge>;
        }
      },
    },
    {
      header: "More Options",
      id: "options",
      enableHiding: false,
      cell: ({ row }) => {
        const reindeer = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedReindeer(reindeer);
                  setIsModalOpen((state) => ({
                    ...state,
                    ReindeerModalInfo: true,
                  }));
                }}
                className="cursor-pointer"
              >
                View Stats
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  setEditingReindeer(reindeer);
                  setIsModalOpen((state) => ({
                    ...state,
                    ReindeerModal: true,
                  }));
                }}
              >
                Edit {row.getValue("name")}
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuLabel>Select a status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {!row.getValue("available") ? (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer text-green-600"
                          onClick={() =>
                            updateReindeer({
                              ...reindeer,
                              available: true,
                            })
                          }
                        >
                          Active
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuSeparator />
                        {data[row.index].assignedToSanta ? (
                          <>
                            <DropdownMenuItem
                              className="cursor-pointer text-orange-600"
                              onClick={() =>
                                updateReindeer({
                                  ...reindeer,
                                  assignedToSanta: false,
                                  position: 0,
                                })
                              }
                            >
                              Unequip
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <>
                            <DropdownMenuItem className="cursor-pointer text-orange-600">
                              Equip
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600"
                          onClick={() =>
                            updateReindeer({
                              ...reindeer,
                              assignedToSanta: false,
                              position: 0,
                              available: false,
                            })
                          }
                        >
                          Deactivate
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              {!row.getValue("available") && (
                <>
                  <DropdownMenuSeparator />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-red-600 border-none border-transparent w-full px-2 py-2 justify-start hover:bg-none"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure you want to delete{" "}
                          {row.getValue("name")}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete {row.getValue("name")} and remove it from
                          Santa's Workshop.
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
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <h1 className="text-3xl font-bold">Reindeer Management</h1>
      <div className="w-auto md:w-full">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:justify-between">
          <Input
            placeholder="Filter names..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className=""
          />
          <div className="flex flex-col gap-2 md:flex-row">
            <Button
              variant="outline"
              onClick={() =>
                setIsModalOpen((state) => ({
                  ...state,
                  ReindeerModal: true,
                }))
              }
            >
              + New Reindeer
            </Button>
            <Button variant="outline">Change Status</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border w-auto">
          <Table className="w-full mx-auto">
            <TableHeader className="bg-gradient-to-b from-green-600 to-green-400 whitespace-nowrap">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-center font-bold text-zinc-800"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <ReindeerModalInfo
        reindeer={selectedReindeer}
        isOpen={isModalOpen.ReindeerModalInfo}
        onClose={() =>
          setIsModalOpen((state) => ({
            ...state,
            ReindeerModalInfo: false,
          }))
        }
      />
      <ReindeerModal
        isOpen={isModalOpen.ReindeerModal}
        isClose={() => {
          setIsModalOpen((state) => ({
            ...state,
            ReindeerModal: false,
          }));
          setEditingReindeer(null);
        }}
        onSubmit={editingReindeer ? updateReindeer : addNewReindeer}
        initialData={editingReindeer}
      />
    </div>
  );
}
