import { NextResponse } from "next/server";
import PocketBase from "pocketbase";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
    const pages = await pb.collection("pages").getFullList({
      // sort: "-updated",
      // expand: "likes",
    });

    const documentsDir = path.join(process.cwd(), "documents");
    if (!fs.existsSync(documentsDir)) {
      fs.mkdirSync(documentsDir);
    }

    const savedFiles: string[] = [];
    for (const page of pages) {
      // console.log("page:", page);
      const filePath = path.join(documentsDir, `${page.id}.md`);
      const content = `---\n${Object.entries(page)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join("\n")}\n---\n\n${page.description}`;

      await fs.promises.writeFile(filePath, content);
      // console.log(`Markdown file saved for page: ${page.collectionId}`);

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
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}
