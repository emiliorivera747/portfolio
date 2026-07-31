import postgres from "postgres";
import * as fs from "fs";
import * as path from "path";

const connectionString = process.env.DATABASE_URL!;

async function setupTriggers() {
  const sql = postgres(connectionString);

  try {
    console.log("Setting up database triggers for updatedAt auto-update...");

    // Read the SQL file
    const sqlFile = fs.readFileSync(
      path.join(__dirname, "../lib/db/setup-triggers.sql"),
      "utf8"
    );

    // Execute the SQL
    await sql.unsafe(sqlFile);

    console.log("✓ Database triggers created successfully!");
    console.log("  - User table trigger");
    console.log("  - Post table trigger");
    console.log("  - ContentBlock table trigger");
    console.log("  - Media table trigger");
  } catch (error) {
    console.error("Error setting up triggers:", error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

setupTriggers();
