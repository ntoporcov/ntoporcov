import { firebaseDB } from "../../../lib/firebase";
import { cors } from "../../../utils/middleware";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, cors);

  const name = req.body.name;
  const group = req.body.group;
  const aliases = req.body.aliases;

  try {
    const person = {
      name,
      group,
      accepted: false,
      denied: false,
      aliases,
    };

    await firebaseDB.ref().child("luna").child("guestList").push(person);

    res.status(200).json({ success: true, person });
  } catch (e) {
    res.status(500).json(e);
  }
}
