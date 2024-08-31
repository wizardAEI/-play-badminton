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
          x: prevPerson1.x - 2,
        }));
      }
      if (event.key === "d") {
        if (person1.x >= 45) return;
        setPerson1((prevPerson1) => ({
          ...prevPerson1,
          x: prevPerson1.x + 2,
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
          x: prevPerson2.x - 2,
        }));
      }
      if (event.key === "ArrowRight") {
        if (person2.x >= 95) return;
        setPerson2((prevPerson2) => ({
          ...prevPerson2,
          x: prevPerson2.x + 2,
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
    x: 10,
    y: 10,
    isMoving: false,
    direction: 1,
    velocity: 2, // 初始速度
    gravity: 0.1, // 重力加速度
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

 

    // 动画逻辑
    useEffect(() => {
      const animate = () => {
        setBadMintonPosition((prev) => {
          if (!prev.isMoving) return prev;
  
          const newX = prev.x + prev.velocity * Math.cos(Math.PI / 4); // 45度角
          const newY = prev.y + prev.velocity * Math.sin(Math.PI / 4) - prev.gravity; // 重力影响
  
          // 更新羽毛球的位置
          return {
            ...prev,
            x: newX,
            y: newY,
            velocity: prev.velocity - prev.gravity, // 速度随重力减小
          };
        });
  
        requestAnimationFrame(animate);
      };
  
      if (badMintonPosition.isMoving) {
        requestAnimationFrame(animate);
      }
    }, [badMintonPosition]);

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
        <PersonWithBadminton index={9} reverse />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: `${badMintonPosition.y}%`,
          left: `calc(${badMintonPosition.x}% - 15px)`,
          transform: `rotate(${badMintonPosition.direction * 90}deg)`,
        }}
      >
        <BadMinton width={30} height={30} fill="red" />
      </div>
    </div>
  );
}
