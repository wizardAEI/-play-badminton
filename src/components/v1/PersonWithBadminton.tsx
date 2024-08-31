import Person from "../Person";
import Racket from "../Racket";

export default function PersonWithBadminton(props: {
  index: number;
  reverse?: boolean;
}) {
  return (
    <>
      <Racket reverse={props.reverse}/>
      <Person index={props.index} reverse={props.reverse}/>
    </>
  )
}