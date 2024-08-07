import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AccordionItem } from "@radix-ui/react-accordion";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronsUpDown } from "lucide-react";

const APIVersionsPage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold">API Versions</h1>
      <p>Check here for the latest API versions and info on bug fixes.</p>

      <div className="flex flex-col gap-4 my-8">
        <div>
          <h3 className="text-2xl">Instructions:</h3>
          <p>Click each toggle to view the changes made for each version.</p>
        </div>
        <div className="flex flex-col gap-4 my-4">
          <Collapsible open>
            <div className="flex gap-4">
              <h2 className="text-3xl">Version 1</h2>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle Version 1</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <Accordion
                type="single"
                collapsible
                className="w-[700px] rounded-md border px-4 py-2 my-2"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <h3 className="text-xl">Version 1.0.0: Initial Release</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside">
                      <li>Full backend layout created</li>
                      <li>Firebase and neon database implemented</li>
                      <li>Endpoint routes to be created in v1.1.0</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default APIVersionsPage;
