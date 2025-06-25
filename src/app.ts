import "dotenv/config";
import config from "./config/index"
import createServer from "./utils/server"
const { port, environment } = config;

const app = createServer();

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
