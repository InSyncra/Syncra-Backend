import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronsUpDown } from "lucide-react";

type changesObject = {
  version: string;
  title: string;
  updates: string[];
  knownFixesToMake?: string[];
};

type VersionObject = {
  versionNum: number;
  changes: changesObject[];
};

const versions: VersionObject[] = [
  {
    versionNum: 1,
    changes: [
      {
        version: "1.0.1",
        title: "Multi-Containers Created",
        updates: [
          "Multiple backend ports available",
          "Request Server runs on port 5000",
          "Database Server runs on port 5555",
          "NEW: Added knowledgebase to port 8080",
        ],
        knownFixesToMake: [
          "Still to create endpoint routes in v1.1.0",
          "This version for testing and getting familiar with the backend",
          "Firebase and Neon database not properly implemented",
        ],
      },
      {
        version: "1.0.0",
        title: "Initial Release",
        updates: [
          "Full backend layout created",
          "Firebase and neon database implemented",
        ],
        knownFixesToMake: ["Create endpoint routes in v1.1.0"],
      },
    ],
  },
];

const VersionCollapsible = ({ versionNum, changes }: VersionObject) => {
  return (
    <Collapsible open>
      <div className="flex gap-4">
        <h2 className="text-3xl">Version {versionNum}</h2>
        <CollapsibleTrigger asChild>
          <Button variant={"ghost"} size={"sm"} className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle Version {versionNum}</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        {changes.map((change, index) => (
          <Accordion
            key={index}
            type="single"
            collapsible
            className="w-[700px] rounded-md border px-4 py-2 my-2"
          >
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>
                <h3 className="text-xl">{`${change.version}: ${change.title}`}</h3>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside">
                  {change.updates.map((update, index) => (
                    <li key={index}>{update}</li>
                  ))}
                  {change.knownFixesToMake && (
                    <div className="mt-4">
                      <h4 className="text-lg">Known Bugs/Future Updates</h4>
                      <ul className="list-disc list-inside">
                        {change.knownFixesToMake.map((fix, index) => (
                          <li key={index}>{fix}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

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
          {versions.map((version) => (
            <VersionCollapsible
              key={version.versionNum}
              versionNum={version.versionNum}
              changes={version.changes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default APIVersionsPage;
