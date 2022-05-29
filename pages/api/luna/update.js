import { firebaseDB } from "../../../lib/firebase";
import { cors } from "../../../utils/middleware";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, cors);

  const name = req.body.name;
  const group = req.body.group;
  const going = req.body.going;

  const ref = await firebaseDB.ref().child("luna").child("guestList");

  const snapshot = await ref.once("value");
  const people = snapshot.val();

  const person = Object.entries(people).filter(
    ([key, val]) => val.name === name && val.group === group
  );

  const personId = person[0][0];

  await firebaseDB
    .ref()
    .child("luna")
    .child("guestList")
    .child(personId)
    .update({
      accepted: going,
      denied: !going,
    });

  const allPeopleSnap = await ref.once("value");
  const allPeople = allPeopleSnap.val();

  const groupData = Object.values(allPeople).filter(
    (allPeoplePerson) => allPeoplePerson.group === allPeople[personId].group
  );

  res.status(200).json({ groupData });
}
