import { firebaseDB } from "../../../lib/firebase";
import { cors } from "../../../utils/middleware";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, cors);

  if (req.method === "POST") {
    const stat = req.body.stat;
    const slug = req.body.slug;

    try {
      const refObject = firebaseDB.ref().child("blogPosts");

      let snapshot = await refObject.once("value");
      const JSONshot = snapshot.toJSON();

      if (JSONshot[slug] === undefined) {
        await refObject.update({ [slug]: { likes: 0, views: 0 } });
        snapshot = await refObject.once("value");
      }

      const currentStat = snapshot.toJSON()[slug][stat];
      const newStat = currentStat + 1;

      await refObject.child(slug).update({ [stat]: newStat });

      const updatedSnapshot = await refObject.child(slug).once("value");

      res.status(200).json(updatedSnapshot.toJSON());
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(405).send("Method not allowed, dumbass...");
  }
}
