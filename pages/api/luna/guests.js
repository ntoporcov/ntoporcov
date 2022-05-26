import { firebaseDB } from "../../../lib/firebase";
import { cors } from "../../../utils/middleware";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, cors);

  const name = req.query.name;

  try {
    const refObject = firebaseDB.ref().child("luna");
    const snapshot = await refObject.once("value");
    const data = snapshot.val();

    const results = data.guests.filter((guestGroup) =>
      guestGroup.invited
        .map((name) => name.toLowerCase())
        .includes(name.toLowerCase())
    );

    const accepted = data.accepted;
    const denied = data.denied;

    if (results[0]) {
      res
        .status(200)
        .json({ group: results[0], accepted, denied, success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (e) {
    res.status(500).json(e);
  }
}
