import { Briefcase, Calendar, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { User } from "@/lib/types";

interface UserDetailsDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailsDialog({
  user,
  open,
  onOpenChange,
}: UserDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription className="text-balance">
            Complete information about the user
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="flex flex-col items-start gap-4 min-[423px]:flex-row min-[423px]:items-center">
            <Image
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h3 className="font-bold text-2xl">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-balance font-medium text-muted-foreground text-xs">
                ID: {user.id}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-lg">Contact Information</h4>
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.age} years old</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-3">
            <h4 className="font-semibold text-lg">Address</h4>
            <div className="flex items-start gap-3">
              <MapPin className="size-4 text-muted-foreground" />
              <div className="text-sm">
                <p>{user.address.address}</p>
                <p className="truncate">
                  {user.address.city}, {user.address.state}
                </p>
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="font-semibold text-lg">Employment</h4>
            <div className="flex items-start gap-3">
              <Briefcase className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">{user.company.title}</p>
                <p className="text-muted-foreground">{user.company.name}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
