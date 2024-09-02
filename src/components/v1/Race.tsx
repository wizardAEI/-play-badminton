/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PersonWithBadminton from "./PersonWithBadminton";
import Countdown from "../Countdown";
import BadMinton from "../BedMinton";

export default function Race() {
  const [person1, setPerson1] = useState({
    x: 10,
    y: 0,
  });
  const [person2, setPerson2] = useState({
    x: 90,
    y: 0,
  });
  useEffect(() => {
    // 控制person1左右移动和跳跃
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "a") {
        if (person1.x <= 5) return;
        setPerson1((prevPerson1) => ({
          ...prevPerson1,
          x: prevPerson1.x - 3,
        }));
      }
      if (event.key === "d") {
        if (person1.x >= 45) return;
        setPerson1((prevPerson1) => ({
          ...prevPerson1,
          x: prevPerson1.x + 3,
        }));
      }
    };
    // 监听键盘事件
    window.addEventListener("keydown", handleKeyDown);

    // 控制person2左右移动和跳跃
    const handleKeyDown2 = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        if (person2.x <= 55) return;
        setPerson2((prevPerson2) => ({
          ...prevPerson2,
          x: prevPerson2.x - 3,
        }));
      }
      if (event.key === "ArrowRight") {
        if (person2.x >= 95) return;
        setPerson2((prevPerson2) => ({
          ...prevPerson2,
          x: prevPerson2.x + 3,
        }));
      }
    };
    // 监听键盘事件
    window.addEventListener("keydown", handleKeyDown2);
    // 清除监听
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keydown", handleKeyDown2);
    };
  }, [person1.x, person2.x]);
  const [countDown, setCountDown] = useState(3);
  const [begin, setBegin] = useState(false);
  const [badMintonPosition, setBadMintonPosition] = useState({
    initialX: 10,
    initialY: 10,
    x: 10,
    y: 10,
    time: 0,
    isMoving: false,
    direction: 1,
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prevCountDown) => {
        if (prevCountDown == 0) {
          clearInterval(timer);
          setBegin(true);
          setBadMintonPosition({
            ...badMintonPosition,
            isMoving: true,
          });
          return 0; // 防止负数
        }
        return prevCountDown - 1;
      });
    }, 1000);
    // 清理定时器
    return () => clearInterval(timer);
  }, []);
  function calculatePosition(
    initialX: number,
    initialY: number,
    v0: number,
    n: number,
    direction: number
  ) {
    const g = 9.81; // 重力加速度 (m/s^2)
    const angle = 45; // 抛出角度 (度)

    // 将角度转换为弧度
    const angleRad = angle * (Math.PI / 180);

    // 计算 x 和 y 的位置
    const deltaX = v0 * Math.cos(angleRad) * n * direction;
    const deltaY = v0 * Math.sin(angleRad) * n - 0.5 * g * Math.pow(n, 2);

    // 新的位置
    const x = initialX + deltaX * 0.02;
    const y = initialY + deltaY * 0.02;

    return { x: x, y: y };
  }

  const initialVelocity = 0.2; // m/s
  // 动画逻辑
  useEffect(() => {
    const animate = () => {
      setBadMintonPosition((prev) => {
        if (prev.y <= 0) return prev;
        const position = calculatePosition(
          prev.initialX,
          prev.initialY,
          initialVelocity,
          prev.time,
          prev.direction,
        );
        // 更新羽毛球的位置
        return {
          ...prev,
          x: position.x,
          y: position.y,
          time: prev.time + 0.01,
          // velocity: prev.velocity - prev.gravity, // 速度随重力减小
        };
      });
      requestAnimationFrame(animate);
    };
    if (badMintonPosition.isMoving) {
      requestAnimationFrame(animate);
    }
  }, [badMintonPosition]);

  // // 碰撞逻辑
  useEffect(() => {
    const x = ((badMintonPosition.x - 10) * 40000 + 10) / 1200 * 100
    const y = (badMintonPosition.y * 20) / 10
    console.log ('>>>', x, y, person2.x)
    if ((person1.x > x - 7) && (person1.x < x + 7) ) {
      if (badMintonPosition.direction === 1) return
      setBadMintonPosition((prev) => ({
       ...prev,
        direction: 1,
        time: 0,
      }));
    }
    if ((person2.x > x - 7) && (person2.x < x + 7) ) {
      if (badMintonPosition.direction === -1) return
      setBadMintonPosition((prev) => ({
        ...prev,
        direction: -1,
        time: 0,
      }));
    }
  }, [person1, person2, badMintonPosition])


  function getX(x: number) {
    let next = 0
    if(x < 10) {
      next =  ((9.973 - x) * 40000) - 1200
    } else {
      next = (x - 10) * 40000 + 10
    }
    return next
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Countdown begin={begin} countDown={countDown} />
      <div
        style={{
          position: "absolute",
          bottom: `${person1.y}%`,
          left: `calc(${person1.x}% - 80px)`,
        }}
      >
        <PersonWithBadminton index={7} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          width: "10px",
          height: "200px",
          backgroundColor: "black",
          transform: "translateX(49vw)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: `${person2.y}%`,
          left: `calc(${person2.x}% - 80px)`,
        }}
      >
        <PersonWithBadminton index={12} reverse />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: `${badMintonPosition.y * 20}px`,
          left: `calc(${getX(badMintonPosition.x)}px + 10px)`,
          transform: `rotate(${-badMintonPosition.direction * 90}deg)`,
        }}
      >
        <BadMinton width={30} height={30} fill="red" />
      </div>
    </div>
  );
}
