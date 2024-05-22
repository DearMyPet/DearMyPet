import { SyncLoader } from "react-spinners"

const Loading = () => {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <h3>잠시만 기다려주세요.</h3>
            <SyncLoader />
        </div>
    )
}

export default Loading;