import React, { useState } from "react";
import "./Weekly.css";
import bg from "../../assets/background.png";
import TopTabs from "../../components/common/TopTabs";
import GlassPanel from "../../components/common/GlassPanel";

const hours = Array.from({ length: 24 }, (_, i) => i);
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Weekly() {
  const [events] = useState([]);

  return (
    <div className="planner" style={{ backgroundImage: `url(${bg})` }}>
      <div className="planner-main-layout">
        <div className="tabs-container">
          <TopTabs />
        </div>

        <GlassPanel>
          <div className="planner-container">
            <div className="time-bar">
              <div className="time-header" />
              <div className="time-body">
                {hours.map((h) => (
                  <div key={h} className="time-slot">
                    {String(h).padStart(2, "0")}:00
                  </div>
                ))}
              </div>
            </div>

            <div className="week-grid">
              {days.map((day, dayIdx) => (
                <div
                  key={day}
                  className={`day-column ${dayIdx < 5 ? "weekday" : "weekend"}`}
                >
                  <div className={`day-header ${day.toLowerCase()}`}>{day}</div>
                  <div className="day-body">
                    {hours.map((hour) => (
                      <div key={hour} className="cell" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
