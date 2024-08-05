import React from "react";

type Props = {};

const ModelsOverviewPage = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Models Overview</h1>
        <p>
          All models are created with Prisma ORM, a TypeScript-based platform
          that simplifies database connections and management. It ensures type
          safety and provides auto-completion for models.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-medium">Data Collection</h3>
        <p>
          We collect various data points to populate these models. Most data
          points are based on frontend user input, while additional information
          is processed by the backend. Refer to specific model documentation for
          details.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-medium">Retrieving Data</h3>
        Backend responses include a JSON object with <code>status</code>,{" "}
        <code>data</code>, and <code>message</code>. On a successful request,
        the <code>data</code> field contains the model information:
        <ul>
          <li>
            <strong>Single model:</strong> An object
          </li>
          <li>
            <strong>Multiple models:</strong> An array of object
          </li>
        </ul>
      </div>
      <p>
        You can access this data using dot notation. The type safety ensures you
        can see and access every property confidently. Refer to each data model
        for specific details on what will be returned..
      </p>
    </div>
  );
};

export default ModelsOverviewPage;
