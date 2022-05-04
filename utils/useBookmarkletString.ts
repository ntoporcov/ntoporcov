import React, { useEffect, useState } from "react";

export const useBookmarkletString = (fileName: string) => {
  const [string, setString] = useState("");

  useEffect(() => {
    fetch(`/bookmarklets/${fileName}.js`).then(async (res) => {
      const text = await res.text();
      setString(text);
    });
  }, [fileName]);

  return string;
};
