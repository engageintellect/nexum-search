import { NextResponse } from "next/server";
import PocketBase from "pocketbase";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
    const projects = await pb.collection("projects").getFullList({
      sort: "-updated",
      expand: "likes",
    });

    const documentsDir = path.join(process.cwd(), "documents");
    if (!fs.existsSync(documentsDir)) {
      fs.mkdirSync(documentsDir);
    }

    const savedFiles: string[] = [];
    for (const project of projects) {
      console.log("project:", project);
      const filePath = path.join(documentsDir, `${project.name}.md`);
      const content = `---\n${Object.entries(project)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join("\n")}\n---\n\n${project.description}`;

      await fs.promises.writeFile(filePath, content);
      console.log(`Markdown file saved for project: ${project.collectionId}`);

      savedFiles.push(filePath);
    }

    console.log("Search records added to PocketBase...");
    console.log("Saved Markdown files:", savedFiles);

    const responseData = {
      files: savedFiles,
    };

    return NextResponse.json(responseData);
  } catch (err) {
    console.log("Error:", err);
    return NextResponse.error();
  }
}
