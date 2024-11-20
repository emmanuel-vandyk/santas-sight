import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Pencil, RotateCcw, Trash2 } from 'lucide-react';

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
import { Badge } from "@/components/ui/badge";
import ElveModal from "@/components/elves/ElveModal";
import {
  useElves,
  useAddElves,
  useUpdateElves,
  useLogicalDeleteElves,
  useRestoreElves,
} from "@/services/elvescrud/elvesapi";
import SantaChristmasSpinner from "@/components/global/spinner";
import ElvesAvatar from "@/components/elves/ElvesAvatar";
import { useToast } from "@/hooks/useToast";

export default function Component() {
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

  const toast = useToast();

  const data = useMemo(() => elves || [], [elves]);

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
      header: () => <p className="hidden md:block">Avatar</p>,
      cell: ({ row }) => {
        const id = row.original.id
        const initials = row.original.name.slice(0, 2).toUpperCase()
        return (
          <div className="hidden md:grid place-items-center">
            <ElvesAvatar id={id} initials={initials} />
          </div>
        )
      },
    },
    {
      accessorKey: "id",
      header: ({ column }) => <p>ID</p>,
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
      header: ({ column }) => <p className="hidden md:block">Height</p>,
      cell: ({ row }) => (
        <div className="hidden md:block capitalize">
          {row.getValue("height")}
        </div>
      ),
    },
    {
      accessorKey: "age",
      header: ({ column }) => <p className="hidden md:block">Age</p>,
      cell: ({ row }) => (
        <div className="hidden md:block text-center font-medium">
          {row.getValue("age")}
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: ({ column }) => <p className="hidden md:block">Address</p>,
      cell: ({ row }) => (
        <div className="hidden md:block capitalize">
          {row.getValue("address")}
        </div>
      ),
    },
    {
      accessorKey: "mail",
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
        <div className="lowercase hidden md:block">{row.getValue("mail")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => <p className="hidden md:block">Status</p>,
      cell: ({ row }) => (
        <Badge
          className={`hidden md:block ${row.original.isDeleted ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
        >
          {row.original.isDeleted ? "Not Available" : "Available"}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const elve = row.original
        return (
          <div className="flex justify-center space-x-2">
            {elve.isDeleted ? (
              <Button
                className="size-8"
                variant="ghost"
                onClick={() => handleRestore(elve)}
                aria-label={`Restore ${elve.name}`}
              >
                <RotateCcw className="size-4" />
              </Button>
            ) : (
              <>
                <Button
                  className="size-8"
                  variant="ghost"
                  onClick={() => editElve(elve)}
                  aria-label={`Edit ${elve.name}`}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  className="size-8"
                  variant="ghost"
                  onClick={() => handleDelete(elve)}
                  aria-label={`Delete ${elve.name}`}
                >
                  <Trash2 className="size-4" />
                </Button>
              </>
            )}
          </div>
        )
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
    enableRowSelection: true,
    enableMultiRowSelection: true,
  });

  const addNewElve = async (newElve) => {
    try {
      await addElveMutation.mutateAsync(newElve);
      toast.success("Elve added successfully");
    } catch {
      toast.error("Error adding elve");
    }
  };

  const updateElve = async (elveUpdated) => {
    try {
      await updateElveMutation.mutateAsync(elveUpdated);
      toast.success("Elve updated successfully");
    } catch {
      toast.error("Error updating elve");
    }
  };

  const deleteRows = async () => {
    try {
      const rowsToDelete = table.getFilteredSelectedRowModel().rows.filter(row => !row.original.isDeleted);
      const deleteCount = rowsToDelete.length;
      for (const row of rowsToDelete) {
        await logicalDeleteMutation.mutateAsync(row.original.id);
      }
      toast.success(`${deleteCount} elve${deleteCount !== 1 ? 's' : ''} deleted successfully`);
      setRowSelection({});
    } catch {
      toast.error("Error deleting elves");
    }
  };

  const handleDelete = async (elve) => {
    try {
      await logicalDeleteMutation.mutateAsync(elve.id);
      toast.success(`Elve ${elve.name} deleted successfully`);
    } catch {
      toast.error(`Error deleting elve ${elve.name}`);
    }
  };

  const handleRestore = async (elve) => {
    try {
      await restoreMutation.mutateAsync(elve.id);
      toast.success("Elve restored successfully");
    } catch {
      toast.error("Error restoring elve");
    }
  };

  const restoreSelectedRows = async () => {
    try {
      const rowsToRestore = table.getFilteredSelectedRowModel().rows.filter(row => row.original.isDeleted);
      const restoreCount = rowsToRestore.length;
      for (const row of rowsToRestore) {
        await restoreMutation.mutateAsync(row.original.id);
      }
      toast.success(`${restoreCount} elve${restoreCount !== 1 ? 's' : ''} restored successfully`);
      setRowSelection({});
    } catch {
      toast.error("Error restoring elves");
    }
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

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const hasSelectedDeletedElves = selectedRows.some(row => row.original.isDeleted);
  const hasSelectedActiveElves = selectedRows.some(row => !row.original.isDeleted);

  return (
    <div className="flex flex-col items-center gap-8 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-red-600">Elves management</h1>
      <div className="w-full max-w-7xl">
        <section className="mb-2 md:mb-4 flex flex-col-reverse gap-2 md:flex-row justify-between">
          <Input
            placeholder="Filter names..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <div className="flex flex-col items-center md:flex-row md:items-stretch gap-3 md:gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(true)} className="w-full md:w-auto">
              + New elve
            </Button>
            <Button
              variant="destructive"
              onClick={deleteRows}
              disabled={!hasSelectedActiveElves}
              className="w-full md:w-auto"
            >
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={restoreSelectedRows}
              disabled={!hasSelectedDeletedElves}
              className="w-full md:w-auto"
            >
              Restore
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
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
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-center font-bold">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                    className={row.original.isDeleted ? "bg-red-100" : ""}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {selectedRows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex gap-2">
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
            setIsModalOpen(false)
            setEditingElve(null)
          }}
          onSubmit={editingElve ? updateElve : addNewElve}
          initialData={editingElve}
        />
      </div>
    </div>
  );
}