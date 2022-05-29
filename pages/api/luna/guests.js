import { firebaseDB } from "../../../lib/firebase";
import { cors } from "../../../utils/middleware";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, cors);

  const name = req.query.name;

  try {
    const refObject = firebaseDB.ref().child("luna").child("guestList");
    const snapshot = await refObject.once("value");
    const people = snapshot.val();

    const matches = Object.entries(people).filter(
      ([key, val]) =>
        val.name.toLowerCase() === name.toLowerCase() ||
        val?.aliases?.filter(
          (alias) => alias.toLowerCase() === name.toLowerCase()
        ).length
    );

    const personWasFound = matches.length > 0;

    console.log(matches);

    if (personWasFound) {
      const groups = matches.map(([, match]) => match.group);

      const groupData = Object.values(people).filter((item) =>
        groups.includes(item.group)
      );

      res.status(200).json({ groupData, success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (e) {
    res.status(500).json(e);
  }
}
