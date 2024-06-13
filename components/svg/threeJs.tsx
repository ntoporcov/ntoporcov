import { SVGProps, useContext } from "react";
import { IconContext } from "react-icons";
import { cn } from "../../hooks/tailwind";
export const ThreeJsIcon = (props: SVGProps<SVGSVGElement>) => {
  const context = useContext(IconContext);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      id="Layer_1"
      x={0}
      y={0}
      viewBox="0 0 640 640"
      width="1em"
      height="1em"
      {...props}
      className={cn(props.className, context.className)}
    >
      <style>
        {
          ".st1,.st2{fill:#fff;stroke:#000;stroke-width:7;stroke-miterlimit:10}.st2{fill:none}"
        }
      </style>
      <path
        d="M171.7 621.7 20 18.4l600 168.5"
        style={{
          fill: "#fff",
        }}
      />
      <path
        d="m245.8 362.4 37.9 150.9M395.5 404.8l-149.7-42.4M283.7 513.3l111.8-108.5M283.7 513.3 134 470.9"
        className="st1"
      />
      <path d="m134 470.9 37.9 151 111.8-108.6" className="st2" />
      <path
        d="m134 470.9 111.8-108.5M245.8 362.4l111.9-108.6M357.7 253.8l111.8-108.5M319.8 102.9l37.9 150.9M357.7 253.8l-149.8-42.3M207.9 211.5l37.9 150.9M245.8 362.4 96.1 320M96.1 320 134 470.9M58.2 169.1 96.1 320M207.9 211.5 58.2 169.1M96.1 320l111.8-108.5M207.9 211.4l111.9-108.5M319.8 102.9 170 60.5M170 60.5l37.9 150.9"
        className="st1"
      />
      <path d="m58.2 169.1-37.9-151L170 60.5" className="st2" />
      <path d="M58.2 169.1 170 60.5" className="st1" />
      <path d="m507.4 296.2 111.8-108.5-149.7-42.4" className="st2" />
      <path
        d="m469.5 145.3 37.9 150.9M507.4 296.2l-149.7-42.4M357.7 253.8l37.8 151M395.5 404.8l111.9-108.6M469.5 145.3l-149.7-42.4"
        className="st1"
      />
    </svg>
  );
};
