"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Edit, EllipsisVertical, Maximize2, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/lib/types";
import { DeleteUserDialog } from "./delete-user-dialog";
import { EditUserDialog } from "./edit-user-dialog";
import { UserDetailsDialog } from "./user-details-dialog";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "image",
    header: "Avatar",
    size: 80,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Image
            src={row.getValue("image")}
            alt={`${row.original.firstName} ${row.original.lastName}`}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 280,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 180,
    cell: ({ row }) => {
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;
      return (
        <div className="font-medium">
          {firstName} {lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "company",
    header: "Job",
    size: 280,
    cell: ({ row }) => {
      const company = row.original.company;
      return (
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{company.title}</span>
          <span className="text-muted-foreground text-xs">{company.name}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    size: 60,
    cell: ({ row }) => {
      const user = row.original;
      const [viewDialogOpen, setViewDialogOpen] = useState(false);
      const [editDialogOpen, setEditDialogOpen] = useState(false);
      const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <span className="sr-only">Open menu</span>
                <EllipsisVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setViewDialogOpen(true)}>
                <Maximize2 /> View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                <Edit /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <TrashIcon /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <UserDetailsDialog
            user={user}
            open={viewDialogOpen}
            onOpenChange={setViewDialogOpen}
          />

          <EditUserDialog
            user={user}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
          />

          <DeleteUserDialog
            user={user}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          />
        </>
      );
    },
  },
];
