import { firebaseDB } from "../../../lib/firebase";
import { cors } from "../../../utils/middleware";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, cors);

  try {
    const refObject = firebaseDB.ref().child("blogPosts");
    const snapshot = await refObject.once("value");
    res.status(200).json(snapshot);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
