export default function Countdown(props: {
    begin: boolean;
    countDown: number
}) {
    return (
        !props.begin && <div style={{
            position: "fixed",
            height: "100vh",
            width: "100vw",
            backgroundColor: "#00000080",
            zIndex: 10,
            fontSize: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: 'red'
        }}>{
            props.countDown && `${props.countDown}`
        }</div>
    )
}