import "dotenv/config";
import config from "../config/index.js";
const { port, environment } = config;

import routes from "./routes/index.js";
import createServer from "./utils/server.js";

const app = createServer();

// Send welcome to let others know this is the correct Syncra route
app.get("/", async (req, res) => {
	res.send(
		`<h1>Welcome to Syncra backend!</h1> <p>This project is designed for authorized users to clone and access the codebase. Instructions will be posted soon.</p>`,
	);
});

// Connect all the routes
app.use("/api/v1", routes);

app.listen(port, () => {
	if (environment === "development") {
		console.log("\n\n***********************************");
		console.log("***********************************");
		console.log(`Server is now listening on port ${port}. Test it out on http://localhost:${port}/`);
		console.log("***********************************");
		console.log("***********************************\n\n");
	} else {
		console.log("\n\n***********************************");
		console.log("***********************************");
		console.log(`Server is now listening on port ${port}.`);
		console.log("***********************************");
		console.log("***********************************\n\n");
	}
});
