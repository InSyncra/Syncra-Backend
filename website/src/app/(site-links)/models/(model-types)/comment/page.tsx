import { schemas } from "@/app/constants";
import CodeSnippet from "@/components/CodeSnippet";
import ModelTable from "@/components/ModelTable";
import NavigateTo from "@/components/NavigateTo";
import Link from "next/link";

const commentModelExample = `
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
		// get projects from user

		const userProjects = user.projects

		console.log(userProjects) // returns array of each Project object

		// do stuff with user projects variable
		userProjects.map(project = (
			// get comments from each projects

			const comments = project.comments
			// do stuff with comments array
			console.log(comments)
		))
	} else {
		console.log
		throw new Error(\`User does not exist, {data.message}\`)
	}
	
}catch (err) {
	console.error(err)
}
//...additional code
`;

const CommentModelPage = () => {
  const commentMod = schemas.comment;
  return (
    <div>
      <h1 className="text-4xl font-bold">Project Model</h1>
      <p>
        The <code>Comment</code> model represents any comment created on the
        Syncra platform that was added to a{" "}
        <Link href={"/models/project"}>Project</Link>. Since a comment must have
        a user that created it, it must be accessed via User.projects
      </p>

      <div className="flex flex-col gap-6 my-6">
        <div>
          <h3>Example Use</h3>
          <CodeSnippet codeString={commentModelExample} />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">Comment Attributes</h2>
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

        <ModelTable model={commentMod} />
      </div>

      <NavigateTo
        backLink="/models/project"
        backTitle="The Project Model"
        backText='The "Project" Model'
        nextLink="/routes"
        nextTitle="Routes"
        nextText={"Routes"}
      />
    </div>
  );
};

export default CommentModelPage;
