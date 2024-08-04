import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowBigRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Overview</h1>
        <p>
          This site serves as the way to learn more about how to run Syncra's
          backend.
        </p>
      </div>
      <p>
        Welcome to Syncra's Backend (Port 8080)!
        <br />
        In order to run the Syncra backend, you will need to have Docker
        installed and our container running.
      </p>

      <div>
        <div className="grid grid-cols-2 items-center gap-24 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Setup and Run Syncra</CardTitle>
              <CardDescription>
                Install and run Syncra&apos;s backend via your own Docker
                container
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end">
              <Link href="/docker/setup">Install and Run Syncra</Link>
              <span>
                <ArrowBigRightIcon />
              </span>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Update Syncra</CardTitle>
              <CardDescription>
                Learn how to update Syncra&apos;s backend container
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end">
              <Link href="/docker/update">Get the latest backend update</Link>
              <span>
                <ArrowBigRightIcon />
              </span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
