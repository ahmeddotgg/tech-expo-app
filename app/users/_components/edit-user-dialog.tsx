import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUsersStore } from "@/lib/store";
import type { User } from "@/lib/types";

const userFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  age: z
    .number()
    .min(18, "Age must be at least 18")
    .max(120, "Age must be less than 120"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  companyTitle: z.string().min(2, "Job title must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
});

type UserFormValues = z.infer<typeof userFormSchema>;
interface EditUserDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditUserDialog({
  user,
  open,
  onOpenChange,
}: EditUserDialogProps) {
  const updateUser = useUsersStore((state) => state.updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      age: user.age,
      address: user.address.address,
      city: user.address.city,
      state: user.address.state,
      companyTitle: user.company.title,
      companyName: user.company.name,
    },
  });

  function onSubmit(values: UserFormValues) {
    updateUser(user.id, {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      age: values.age,
      address: {
        address: values.address,
        city: values.city,
        state: values.state,
      },
      company: {
        title: values.companyTitle,
        name: values.companyName,
      },
    });

    toast.success("User updated successfully");
    onOpenChange(false);
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit User</AlertDialogTitle>
          <AlertDialogDescription>
            Update user information
          </AlertDialogDescription>
        </AlertDialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <form
            id="edit-user-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 min-[450px]:grid-cols-2">
              <Field data-invalid={!!errors.firstName}>
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                <Input
                  id="firstName"
                  aria-invalid={!!errors.firstName}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <FieldError>{errors.firstName.message}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.lastName}>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <Input
                  id="lastName"
                  aria-invalid={!!errors.lastName}
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <FieldError>{errors.lastName.message}</FieldError>
                )}
              </Field>
            </div>

            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!errors.phone}>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  id="phone"
                  aria-invalid={!!errors.phone}
                  {...register("phone")}
                />
                {errors.phone && (
                  <FieldError>{errors.phone.message}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.age}>
                <FieldLabel htmlFor="age">Age</FieldLabel>
                <Input
                  id="age"
                  type="number"
                  aria-invalid={!!errors.age}
                  {...register("age")}
                />
                {errors.age && <FieldError>{errors.age.message}</FieldError>}
              </Field>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Address</h4>

              <Field data-invalid={!!errors.address}>
                <FieldLabel htmlFor="address">Street Address</FieldLabel>
                <Input
                  id="address"
                  aria-invalid={!!errors.address}
                  {...register("address")}
                />
                {errors.address && (
                  <FieldError>{errors.address.message}</FieldError>
                )}
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field data-invalid={!!errors.city}>
                  <FieldLabel htmlFor="city">City</FieldLabel>
                  <Input
                    id="city"
                    aria-invalid={!!errors.city}
                    {...register("city")}
                  />
                  {errors.city && (
                    <FieldError>{errors.city.message}</FieldError>
                  )}
                </Field>

                <Field data-invalid={!!errors.state}>
                  <FieldLabel htmlFor="state">State</FieldLabel>
                  <Input
                    id="state"
                    aria-invalid={!!errors.state}
                    {...register("state")}
                  />
                  {errors.state && (
                    <FieldError>{errors.state.message}</FieldError>
                  )}
                </Field>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Employment</h4>

              <Field data-invalid={!!errors.companyTitle}>
                <FieldLabel htmlFor="companyTitle">Job Title</FieldLabel>
                <Input
                  id="companyTitle"
                  aria-invalid={!!errors.companyTitle}
                  {...register("companyTitle")}
                />
                {errors.companyTitle && (
                  <FieldError>{errors.companyTitle.message}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.companyName}>
                <FieldLabel htmlFor="companyName">Company Name</FieldLabel>
                <Input
                  id="companyName"
                  aria-invalid={!!errors.companyName}
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <FieldError>{errors.companyName.message}</FieldError>
                )}
              </Field>
            </div>
          </form>
        </ScrollArea>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit" form="edit-user-form" disabled={!isDirty}>
            Save Changes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
