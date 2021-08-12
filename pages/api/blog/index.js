import { firebaseDB } from "../../../lib/firebase";

export default async function handler(req, res) {
  try {
    const refObject = firebaseDB.ref().child("blogPosts");
    const snapshot = await refObject.once("value");
    res.status(200).json(snapshot);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
