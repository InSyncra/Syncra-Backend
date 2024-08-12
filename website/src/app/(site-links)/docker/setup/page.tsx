import NavigateTo from "@/components/NavigateTo";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Link from "next/link";

const DockerSetupPage = () => {
  return (
    <div>
      <h1 className="text-2xl">Setup and Run Syncra via Docker</h1>
      <p>
        Use the interactive tutorial below to quickly and easily setup Syncra
        via Docker. More details are provided in the read more section.
      </p>
      <iframe
        src="https://app.tango.us/app/embed/1b39df38-c6b2-4806-b529-efdd9bd4962c"
        style={{ minHeight: "640px" }}
        sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
        security="restricted"
        title="Accessing and Using Syncra's Backend Tutorial"
        width="100%"
        height="100%"
        referrerPolicy="strict-origin-when-cross-origin"
        frameBorder="0"
      ></iframe>
      <NavigateTo
        backLink="/"
        backTitle="Introduction"
        backText="Introduction"
        nextLink="/docker/update"
        nextTitle="Updating to the latest Syncra Backend"
        nextText="Updating to the latest Syncra Backend"
      />
    </div>
  );
};

export default DockerSetupPage;
