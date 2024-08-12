import CodeSnippet from "@/components/CodeSnippet";
import NavigateTo from "@/components/NavigateTo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const frontendExample = `// Frontend
//...existing code
const newUser = await fetch("http:localhost:8000/users", {
	method: "POST",
	body: {
		name: "John Doe",
		githubUsername: "john_does_code",
		email: "jd@mail.com",
		//... other attributes
	}
})

//...more frontend code
// notice "role" is not needed. By default the user's role is "USER"`;

const backendExample = `// Backend
const {name, githubUsername, email, etc...} = req.body

// backend will process the information and send
const newUser = await createNewUserAndAddToDatabase()

if (successful) {
	res.send(newUser) // returns user model object with processed infromation back to frontend
}
`;

const ModelsVsEnumsPage = () => {
  return (
    <div>
      <h1 className="text-4xl">Models vs Enums</h1>
      <p>
        Understanding the distinction between models and enums is essential for
        effective data management and code organization. This document explains
        what models and enums are, their differences, and scenarios for their
        usage.
      </p>

      <div className="flex flex-col gap-4 my-6">
        <h2 className="text-3xl underline mb-6">Definitions</h2>
        <h3 className="text-2xl">Models</h3>
        <Accordion collapsible type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>What are Models?</AccordionTrigger>
            <AccordionContent>
              A model represents the comprehensive data structure of an object.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How are they implemented?</AccordionTrigger>
            <AccordionContent>
              In JavaScript, models are often implemented as class objects, with
              each data point being a property accessed via dot notation (e.g.,{" "}
              <code>user.name, user.id, user.projects</code>).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is their purpose?</AccordionTrigger>
            <AccordionContent>
              They encapsulate all relevant data and behaviors of an object,
              providing a structured and coherent way to manage complex data
              entities.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <h3 className="text-2xl">Enums</h3>
        <Accordion collapsible type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>What are Enums?</AccordionTrigger>
            <AccordionContent>
              An enum represents a set of possible values for a specific data
              property.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How are they implemented?</AccordionTrigger>
            <AccordionContent>
              In TypeScript, enums are typically defined as a list of constants,
              often implemented using an object or TypeScript's{" "}
              <code>enum</code> consruct.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is their purpose?</AccordionTrigger>
            <AccordionContent>
              They constrain a data property to predefined values, enhancing
              code clarity, consistency, and error prevention by limiting the
              range of acceptable inputs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex flex-col gap-4 my-4">
          <h2 className="text-3xl">The Difference</h2>
          <p>
            Models represent the entire data of an object. In Javascript, these
            are stored as class objects, meaning that each data point is a
            property whose value can be accessed via dot notation (user.name,
            user.id, user.projects, etc.)
          </p>
          <p>
            Enums represent a small set of possible values. They are stored in
            the database to provide a list of values that can be added to a
            specific data property
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 my-4">
        <div>
          <h2 className="text-3xl">Practical Example</h2>
          <p>
            When a new user signs up for Syncra, the backend will create a new
            record in the `User` table using the `User` model. The `role` field
            of this record will be constrained to the values defined in the
            `UserRole` enum. This ensures that the user's role is always valid
            and consistent.
          </p>
        </div>

        <div>
          <h3 className="text-2xl">Frontend</h3>
          <CodeSnippet codeString={frontendExample} />
        </div>

        <div>
          <h3 className="text-2xl">Backend</h3>
          <CodeSnippet codeString={backendExample} />
        </div>
      </div>

      <NavigateTo
        backLink="/models"
        backTitle="Models Overview"
        backText="Models Overview"
        nextLink="/models/user"
        nextTitle="The User Object"
        nextText={'The "User" Object'}
      />
    </div>
  );
};

export default ModelsVsEnumsPage;
