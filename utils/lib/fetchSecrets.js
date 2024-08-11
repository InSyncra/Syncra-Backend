import { SecretManagerServiceClient } from "@google-cloud/secret-manager"
import fs from "fs"
import { dirname } from "path"
const client = new SecretManagerServiceClient()

async function getSecretValue(secretName) {
    try {
        const [version] = await client.accessSecretVersion({
            name: `projects/174905168265/secrets/${secretName}`
        });
        return version.payload.data.toString('utf8');
    } catch (error) {
        console.error(`Error fetching secret ${secretName}:`, error);
        throw error
    }

}

async function loadSecrets() {
    const secrets = ["POSTGRES_DB_URL", "FIREBASE_API_KEY", "FIREBASE_AUTH_DOMAIN", "FIREBASE_STORAGE_URL", "FIREBASE_MESSAGING_ID", "FIREBASE_APP_ID"]
    const envVariables = []

    for (const secret of secrets) {
        const secrets = await getSecretValue(secret);

        for (const [key, value] of Object.entries(secrets)) {
            envVariables.push(`${key}=${value}`)
        }

        fs.writeFileSync(`${__dirname}/../.env`, envVars.join('\n'));
        console.log(".env file created successfully!")
    }
}

loadSecrets().then(() => {
    import("dotenv").config()
    import("/server/server.js")
})