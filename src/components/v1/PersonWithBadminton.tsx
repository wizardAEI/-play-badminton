import Person from "../Person";
import Racket from "../Racket";

export default function PersonWithBadminton(props: {
  index: number;
  reverse?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        height: "200px",
        width: "160px"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: props.reverse ? "scale(-1, 1)" : "scale(1, 1)",
          transformOrigin: "center",
        }}
      >
        <Racket />
      </div>
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          transform: props.reverse ? "scale(-1, 1)" : "scale(1, 1)",
          transformOrigin: "center",
        }}
      >
        <Person index={props.index} />
      </div>
    </div>
  );
}
