import type { NextApiRequest, NextApiResponse } from "next";
import AutonomousMergeManager from "../../../lib/merger";

type Data = {
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { url } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ message: "Invalid PR URL" });
  }

  const authToken = process.env.GITHUB_TOKEN;

  if (!authToken) {
    console.error("GitHub token not configured");
    return res.status(500).json({ message: "Internal server error" });
  }

  const mergeManager = new AutonomousMergeManager(authToken);

  try {
    console.log(`Received request to merge PR: ${url}`);
    const result = await mergeManager.mergePullRequest(url);
    console.log(`Successfully merged PR: ${url}`);
    res.status(200).json({ message: "PR merged successfully", data: result });
  } catch (error: any) {
    console.error(`Failed to merge PR: ${url}`, error);
    res.status(500).json({ message: error.message });
  }
}
