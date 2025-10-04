import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <h1 className="text-center font-bold text-3xl md:text-5xl">
        Hey there 👋
      </h1>
      <Link
        href="/users"
        className={buttonVariants({
          size: "lg",
        })}
      >
        Mannage Users
      </Link>
    </div>
  );
}
