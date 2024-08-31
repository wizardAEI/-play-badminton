import PersonWithBadminton from "./PersonWithBadminton";

export default function Race() {
    return (
        <div>
            <PersonWithBadminton index={7}/>
            <PersonWithBadminton index={9} reverse/>
        </div>
    )
}