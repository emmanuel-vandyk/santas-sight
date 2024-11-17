import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ElveModal from "@/components/elves/ElveModal";
import DeletedTableElve from "@/components/elves/DeletedTableElve";
import {
  useElves,
  useAddElves,
  useUpdateElves,
  useLogicalDeleteElves,
  useRestoreElves,
} from "@/services/elvescrud/elvesapi";
import SantaChristmasSpinner from "@/components/global/spinner";
import { ElvesAvatar } from "@/components/elves/ElvesAvatar";

export default function ElvesTable() {
  const { data: elves, isLoading, isError } = useElves();
  const addElveMutation = useAddElves();
  const updateElveMutation = useUpdateElves();
  const logicalDeleteMutation = useLogicalDeleteElves();
  const restoreMutation = useRestoreElves();

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingElve, setEditingElve] = useState(null);

  const data = useMemo(() => {
    return elves ? elves.filter((elve) => !elve.isDeleted) : [];
  }, [elves]);

  const deletedElves = useMemo(() => {
    return elves ? elves.filter((elve) => elve.isDeleted) : [];
  }, [elves]);

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
      enableHiding: true,
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
            <ElvesAvatar initials={initials} />
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <p>ID</p>
      ),
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
        >
          Name
          <ArrowUpDown className="size-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "height",
      header: ({ column }) => (
        <p className="hidden md:block">Height</p>
      ),
      cell: ({ row }) => (
        <div className="hidden md:block capitalize">{row.getValue("height")}</div>
      ),
    },
    {
      accessorKey: "age",
      header: ({ column }) => (
        <p className="hidden md:block">Age</p>
      ),
      cell: ({ row }) => (
        <div className="hidden md:block text-center font-medium">{row.getValue("age")}</div>
      ),
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <p className="hidden md:block">Address</p>
      ),
      cell: ({ row }) => (
        <div className="hidden md:block capitalize">{row.getValue("address")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden md:flex w-full"
        >
          Email
          <ArrowUpDown className="hidden md:flex items-center size-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase hidden md:block">{row.getValue("email")}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const elve = row.original;
        return (
          <Button
            className="size-8"
            variant="ghost"
            onClick={() => editElve(elve)}
          >
            <span className="sr-only">Edit</span>
            <Pencil className="size-4" />
          </Button>
        );
      },
      enableHiding: false,
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

  const addNewElve = async (newElve) => {
    await addElveMutation.mutateAsync(newElve);
  };

  const updateElve = async (elveUpdated) => {
    await updateElveMutation.mutateAsync(elveUpdated);
  };

  const deleteRows = async () => {
    const rowsToDelete = table.getFilteredSelectedRowModel().rows;
    for (const row of rowsToDelete) {
      await logicalDeleteMutation.mutateAsync(row.original.id);
    }
    setRowSelection({});
  };

  const restoreElve = async (elve) => {
    await restoreMutation.mutateAsync(elve.id);
  };

  const editElve = (elve) => {
    setEditingElve(elve);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center h-full">
        <SantaChristmasSpinner />
      </div>
    );
  }

  if (isError) return <div>Error fetching elves</div>;

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h1 className="text-3xl font-bold">Elves Management</h1>
      <div className="w-full max-w-7xl">
        <section className="mb-2 md:mb-4 flex flex-col-reverse gap-2 md:flex-row justify-between">
            <Input
              placeholder="Filter names..."
              value={table.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
            />
          <div className="flex gap-3 md:gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              + New Elve
            </Button>
            <Button
              variant="destructive"
              onClick={deleteRows}
              disabled={table.getFilteredSelectedRowModel().rows.length === 0}
            >
              Delete
            </Button>
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
        </section>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="backdrop:flex justify-center bg-gradient-to-b from-green-600 to-green-300">
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
        <ElveModal
          isOpen={isModalOpen}
          isClose={() => {
            setIsModalOpen(false);
            setEditingElve(null);
          }}
          onSubmit={editingElve ? updateElve : addNewElve}
          initialData={editingElve}
        />
        <h2 className="text-3xl font-bold text-center pb-4">Deleted Elves</h2>
        <DeletedTableElve deletedElves={deletedElves} onRestore={restoreElve} />
      </div>
    </div>
  );
}
