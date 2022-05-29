import { firebaseDB } from "../../../lib/firebase";
import { cors } from "../../../utils/middleware";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, cors);

  const name = req.body.name;
  const going = req.body.going;

  const ref = await firebaseDB
    .ref()
    .child("luna")
    .child("guestList")
    .orderByChild("name")
    .startAt(name)
    .limitToFirst(1);

  const snapshot = await ref.once("value");
  const person = snapshot.val();

  const personId = Object.keys(person)[0];

  await firebaseDB
    .ref()
    .child("luna")
    .child("guestList")
    .child(personId)
    .update({
      accepted: going,
      denied: !going,
    });

  const groupRef = await firebaseDB.ref().child("luna").child("guestList");
  const allPeopleSnap = await groupRef.once("value");
  const allPeople = allPeopleSnap.val();

  const groupData = Object.values(allPeople).filter(
    (allPeoplePerson) => allPeoplePerson.group === person[personId].group
  );

  res.status(200).json({ groupData });
}
