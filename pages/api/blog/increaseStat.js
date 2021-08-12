import { firebaseDB } from "../../../lib/firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const stat = req.body.stat;
    const slug = req.body.slug;

    try {
      const refObject = firebaseDB.ref().child("blogPosts");
      let snapshot = await refObject.once("value");

      const JSONshot = snapshot.toJSON();
      console.log(JSONshot);

      if (JSONshot[slug] === undefined) {
        await refObject.set({ ...JSONshot, [slug]: { likes: 0, views: 0 } });
        snapshot = await refObject.once("value");
      }

      const currentStat = snapshot.toJSON()[slug][stat];
      const newStat = currentStat + 1;

      await refObject.child(slug).child(stat).set(newStat);

      const updateSnapshot = await refObject.once("value");

      res.status(200).json(updateSnapshot);
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(405).send("Method not allowed, dumbass...");
  }
}
