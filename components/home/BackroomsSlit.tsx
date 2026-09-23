import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./BackroomsSlit.module.css";

export default function BackroomsSlit() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let closeTimer: number | undefined;
    const handleScroll = () => {
      setIsScrolling(true);
      window.clearTimeout(closeTimer);
      // Leave a short window to catch the opening after a swipe ends.
      closeTimer = window.setTimeout(() => setIsScrolling(false), 900);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(closeTimer);
    };
  }, []);

  return (
    <div className={styles.junction}>
      <Link
        href="/backrooms"
        prefetch={false}
        aria-label="Slip through the tear into the Backrooms"
        className={styles.entry}
        data-open={isScrolling}
      >
        <span className={styles.tear} aria-hidden="true">
          <span className={styles.interior}>
            <span className={styles.doorway} />
          </span>
        </span>
      </Link>
    </div>
  );
}
