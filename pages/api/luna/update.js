import { firebaseDB } from "../../../lib/firebase";
import { cors } from "../../../utils/middleware";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, cors);

  const name = req.body.name;
  const going = req.body.going;

  // console.log(name, going, group);

  if (req.method === "POST") {
    try {
      const arrayToRemove = going ? "denied" : "accepted";
      const arrayToAdd = !going ? "denied" : "accepted";

      await firebaseDB
        .ref()
        .child("luna")
        .child(arrayToRemove)
        .transaction((curr) => {
          console.log(curr);
          return curr.filter((nameInArr) => nameInArr !== name);
        });

      await firebaseDB
        .ref()
        .child("luna")
        .child(arrayToAdd)
        .transaction((curr) => [...curr, name]);

      const refObject = firebaseDB.ref().child("luna");
      const snapshot = await refObject.once("value");
      const data = snapshot.val();

      const results = data.guests.filter((guestGroup) =>
        guestGroup.invited
          .map((name) => name.toLowerCase())
          .includes(name.toLowerCase())
      )[0];

      res
        .status(200)
        .json({ group: results, denied: data.denied, accepted: data.accepted });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}
