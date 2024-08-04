import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Link from "next/link";

const DockerUpdatePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Updating the Syncra Backend</h1>
      <p>
        As we build our backend, we will continuously provide updates to both
        our Github repo and Docker images. The main concern will be to update
        your Docker image.
      </p>

      <div className="my-8">
        <h2 className="text-xl font-medium">
          Delete your current Docker container
        </h2>
        <p>You will first need to delete your current Docker container.</p>
      </div>

      <Card className="w-[1200px] p-8">
        <CardContent>
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-6"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                From Your Terminal via Docker CLI:
              </AccordionTrigger>
              <AccordionContent>
                <ol className="flex flex-col gap-2 list-decimal mx-12">
                  <li>
                    Open your terminal and stop the backend container (if
                    running) by running the command:{" "}
                    <code className="bg-gray-400 text-gray-100 px-3 rounded-md font-bold">
                      docker stop Syncra-Backend
                    </code>
                  </li>
                  <Separator />
                  <li>
                    Run the command{" "}
                    <code className="bg-gray-400 text-gray-100 px-3 rounded-md font-bold">
                      docker rm Syncra-Backend
                    </code>{" "}
                    to delete the container
                  </li>
                  <Separator />
                  <li>
                    You can now run the command{" "}
                    <code className="bg-gray-400 text-gray-100 px-3 rounded-md font-bold">
                      docker ps -a
                    </code>{" "}
                    to check if the container has been completely removed
                  </li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>From the Docker Desktop App:</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-2 list-disc mx-12">
                  <li>Open Docker Desktop and go to the "Containers" tab</li>
                  <Separator />
                  <li>
                    Locate the "Syncra-Backend" container and click the "Stop"
                    button
                  </li>
                  <Separator />
                  <li>Click the "Trash" button to remove the container</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="my-8">
        <h2 className="text-xl font-medium">
          Pulling and running the latest backend
        </h2>
      </div>

      <Card className="w-[1200px] p-8">
        <CardContent>
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-6"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                From Your Terminal via Docker CLI:
              </AccordionTrigger>
              <AccordionContent>
                <ol className="flex flex-col gap-2 list-decimal mx-12">
                  <li>
                    Run the command:{" "}
                    <code className="bg-gray-400 text-gray-100 px-3 rounded-md font-bold">
                      docker pull izzy850/syncra:"[version]"
                    </code>
                    to pull the latest image from the Docker registry
                    <ul>
                      <li>
                        Visit <Link href={"/api-versions"}>API Versions</Link>{" "}
                        to get the latest update
                      </li>
                    </ul>
                  </li>
                  <Separator />
                  <li>
                    Run the command{" "}
                    <code className="bg-gray-400 text-gray-100 px-3 rounded-md font-bold">
                      docker run -d -p 8000:8000 --name Syncra-Backend
                      izzy850/syncra
                    </code>{" "}
                    to re-run a container with the newly updated backend image
                  </li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="flex justify-between absolute bottom-4 left-0 px-8 w-full">
        <Link
          href="/docker/setup"
          className="flex gap-2 items-center"
          title="Install and run Docker"
        >
          <ArrowBigLeft /> Setup and Run Syncra Backend
        </Link>
        <Link
          href="/models"
          className="flex gap-2 items-center"
          title="Models Overview"
        >
          Models Overview <ArrowBigRight />
        </Link>
      </div>
    </div>
  );
};

export default DockerUpdatePage;
