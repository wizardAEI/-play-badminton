import Persons from "/persons.svg";

export default function Person(props: { index: number, reverse?: boolean}) {
  const index = props.index;
  const reverse = props.reverse;

  // 假设每个小人的宽度和高度是 50px，且排列成一行
  const personWidth = 125; // 750 / 6
  const personHeight = 166.67; // 500 / 3

  // 计算小人的 x 和 y 坐标
  const x = (index % 6) * personWidth; // 6 列
  const y = Math.floor(index / 6) * personHeight; // 3 排

  console.log(x, y);

  return (
    <div style={{
        width: personWidth,
        height: personHeight,
    }}>
      <svg width={personWidth} height={personHeight}>
        <image
          href={Persons}
          width="750"
          height="500"
          clipPath="url(#clip-person)"
          style={{
            transform: `translate(${-x}px, ${-y}px) scale(${reverse ? -1 : 1}, 1)`,
            transformOrigin: `${x + personWidth / 2}px ${y + personHeight / 2}px`
          }}
        />
      </svg>
    </div>
  );
}
