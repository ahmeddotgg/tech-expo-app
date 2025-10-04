"use client";

import { RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useUsersStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/table";

export default function UsersPage() {
  const users = useUsersStore((state) => state.users);
  const isLoading = useUsersStore((state) => state.isLoading);
  const hasEdits = useUsersStore((state) => state.hasEdits);
  const fetchUsers = useUsersStore((state) => state.fetchUsers);
  const resetUsers = useUsersStore((state) => state.resetUsers);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleReset = async () => {
    toast.info("Resetting data...");
    await resetUsers();
    toast.success("Data has been reset with fresh data from API");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-14">
      <div className="flex flex-col items-start justify-between gap-2 min-[300px]:flex-row">
        <h1 className="font-bold text-3xl">Users</h1>
        <Button
          onClick={handleReset}
          disabled={isLoading || !hasEdits}
          variant="outline"
        >
          <RefreshCw className={cn("size-4", isLoading && "animate-spin")} />
          Reset Data
        </Button>
      </div>
      <DataTable columns={columns} data={users} isLoading={isLoading} />
    </div>
  );
}
