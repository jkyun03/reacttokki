import TopTabs from "../../components/common/TopTabs";
import GlassPanel from "../../components/common/GlassPanel";
import backgroundImg from "../../assets/background.png";
import "./Monthly.css";

const weekDays = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];

const calendarRows = [
    ["", "", "1","2","3","4","5"],
    ["6", "7", "8","9","10","11","12"],
    ["13", "14", "15","16","17","18","19"],
    ["20", "21", "22","23","24","25","26"],
    ["27", "28", "29","30","","",""],
];

export default function Monthly() {
    return (
        <div
            className="monthly-page"
            style={{ backgroundImage: `url(${backgroundImg})`}}
        >
            <TopTabs />

            <GlassPanel className="monthly-panel">
                <h1 className="monthly-title">April</h1>

                <div className="calendar">
                    <div className="calendar__header">
                        {weekDays.map((day) => (
                            <div 
                                key={day}
                                className={`calendar__header-cell ${
                                    day === "Sat"
                                    ? "calendar__header-cell--sat"
                                    : day === "Sun"
                                    ? "calendar__header-cell--sun"
                                    : ""
                                }`}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="calendar__body">
                    {calendarRows.flat().map((date, index) => {
                        const columnIndex = index % 7;
                        const isSat = columnIndex === 5;
                        const isSun = columnIndex === 6;

                        return (
                            <div key={index} className="calendar__cell">
                                {date && (
                                    <span
                                        className={`calendar__date ${
                                            isSat
                                                ? "calendar__date--sat"
                                                : isSun 
                                                ? "calendar__date--sun"
                                                : ""
                                        }`}
                                    >
                                        {date}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </GlassPanel>
        </div>
    );
}