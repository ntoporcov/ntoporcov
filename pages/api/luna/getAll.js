import { firebaseDB } from "../../../lib/firebase";
import { cors } from "../../../utils/middleware";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, cors);

  try {
    const refObject = firebaseDB.ref().child("luna").child("guestList");
    const snapshot = await refObject.once("value");
    const data = snapshot.val();

    res.status(200).json({ groupData: Object.values(data) });
  } catch (e) {
    res.status(500).json(e);
  }
}
