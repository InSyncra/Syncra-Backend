import CodeSnippet from "@/components/CodeSnippet";
import NavigateTo from "@/components/NavigateTo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { schemas } from "@/app/constants";
import Link from "next/link";
import ModelTable from "@/components/ModelTable";

const userModelExample = `
//...existing code

const userId = <method to get userId>

// fetch data from GET /api/<version>/user/:userId
// store as a response

try {
	const res = await fetch(\`http://localhost:8000/api/v1/user/{userId}\`, {
		headers: {
			authorization: <YOUR_AUTH_KEY>
		}
	})
	
	// convert response to JSON
	const data = res.json()
	
	// retrieve user object from data.data (see response for details)
	// this will give you all attributes of the user object
	const user = data.data
	
	// if user exists, from here you have access to all User attributes stored
	// in user variable
	if (user) {
		console.log(user)
		// do stuff with user variable
	} else {
		console.log
		throw new Error(\`User does not exist, {data.message}\`)
	}
	
}catch (err) {
	console.error(err)
}

//...additional code
`;

const UserModelPage = () => {
  const userMod = schemas.user;
  return (
    <div>
      <h1 className="text-4xl font-bold">User Model</h1>
      <p>
        The <code>User</code> model represents any authenticated user of the
        Syncra platform.
      </p>

      <div className="flex flex-col gap-6 my-6">
        <div>
          <h3 className="text-2xl font-medium">Example Use</h3>
          <CodeSnippet codeString={userModelExample} />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">User Attributes</h2>
          <p>This model has the following attributes for you to access:</p>
          <p>
            <strong>Note:</strong>
          </p>
          <ul className="list-disc list-inside">
            <li>
              "datatype"[] returns an array containing the data model or data
              type, which may include details referring to that specific data
              model.
            </li>
            <li>
              "Required?" refers to attributes required to create new instance.
              Some required attributes have default values and do not need to be
              provided, because they will be added upon creation.
            </li>
          </ul>
        </div>

        <ModelTable model={userMod} />
      </div>

      <NavigateTo
        backLink="/models/models-vs-enums"
        backTitle="Models vs. Enums"
        backText="Models vs. Enums"
        nextLink="/models/project"
        nextTitle="The Project Object"
        nextText={'The "Project" Object'}
      />
    </div>
  );
};

export default UserModelPage;
