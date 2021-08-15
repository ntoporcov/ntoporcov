import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const name = req.body.name;
    const message = req.body.message;
    const gif = req.body.gif;

    if (name.length === 0) {
      res.status(403).send("Name is Required");
      return;
    }

    const gifObject = {
      audience: {
        OR: [
          {
            tag: ["ntoporcov"],
          },
          {
            ios_channel: "eabad846-8be4-45de-8058-f7c4aa70293b",
          },
        ],
      },
      message: {
        title: "Website Notification",
        body: `<html lang="en">
            <body>
              <h1>GIF from ${name.toString()}</h1>
              <p>${message.toString()}</p>
              <hr>
              <img src="${gif.images.original.url}" alt="gif from website"/>
              <p>${gif.images.original.url}</p>
              <hr>
              <a href="${gif.images.original.url}">Open Gif</a>
            </body></html>`,
        content_type: "text/html",
      },
      device_types: ["ios"],
      notification: {
        ios: {
          thread_id: "website",
          alert: {
            title: `GIF from ${name.toString()}`,
            body: message || `No Message`,
            "summary-arg": `GIF from ${name.toString()}`,
            "summary-arg-count": 1,
          },
          sound: {
            name: "strike-call",
            volume: 1,
            critical: true,
          },
          media_attachment: {
            content: {
              title: `GIF from ${name.toString()}`,
              body: message || `No Message`,
            },
            options: {
              crop: {
                height: 0.5,
                width: 0.5,
                x: 0.25,
                y: 0.25,
              },
              time: 15,
            },
            url: gif.images.original.url,
          },
          mutable_content: 1,
        },
      },
    };

    try {
      await axios.post("https://go.urbanairship.com/api/push", gifObject, {
        headers: {
          Authorization: "Basic " + process.env.AIRSHIP_AUTH,
          "Content-Type": "application/json",
          Accept: "application/vnd.urbanairship+json; version=3;",
        },
      });

      res.status(200).send("Message Sent");
    } catch (e) {
      console.log(e);
      res.status(500).send("Something went wrong :/");
    }
  } else {
    res.status(405).send("Method not allowed, dumbass...");
  }
}
