import { PropsWithChildren } from "react";

const MainCol = (props: PropsWithChildren<{}>) => {
  return (
    <main
      className={
        "flex max-w-[140px] flex-col items-center justify-center px-5 pb-[30vh]"
      }
    >
      {props.children}
    </main>
  );
};

export default MainCol;
