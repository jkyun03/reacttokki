import TopTabs from "../../components/common/TopTabs";
import GlassPanel from "../../components/common/GlassPanel";
import backgroundImg from "../../assets/background.png";
import "./Daily.css"

export default function Daily() {
  return (
    <div
      className="daily-page"
      style={{ 
        backgroundImage: `url(${backgroundImg})`,
      }}
    >

      <TopTabs />
      
      <GlassPanel className="daily-panel"></GlassPanel>

    </div>

  )
}