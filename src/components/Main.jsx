import DiagnosticHistory from "./UI/DiagnosticHistory/DiagnosticHistory";
import DiagnosticList from "./UI/DiagnosticList/DiagnosticList";
import LabResults from "./UI/LabResults/LabResults";
import Profile from "./UI/Profile/Profile";

function Main() {
    return (
        <>
            <div className="w-[55%] flex flex-col gap-[32px]">
                <DiagnosticHistory />
                <DiagnosticList />
            </div>
            <div className="w-[25%] flex flex-col gap-[32px]">
                <Profile />
                <LabResults />
            </div>
        </>
    )
}
export default Main;