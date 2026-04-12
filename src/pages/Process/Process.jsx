import { useState, useMemo } from "react";
/*
import TopTaps from "../../components/Toptaps";
import GlassPanel from "../../components/GlassPanel";
 * 그리고 return문 최상단을 <GlassPanel>으로 감싸고,
 * <TopTaps /> 를 wrapper 위에 넣으면 됩니다.
 *
 * 토끼 이미지 파일은 public/assets/ 또는 src/assets/ 에
 * rabbit1.png ~ rabbit5.png 로 저장해두세요.
 */

//---토끼 이미지 입력 ---
const RABBIT_IMAGES = {
  0: "/assets/rabbit1.png",
  25: "/assets/rabbit2.png",
  50: "/assets/rabbit3.png",
  75: "/assets/rabbit4.png",
  100: "/assets/rabbit5.png",
};
// ---토끼 한줄평 입력 ---
const MESSAGES = {
  0: "오늘 시작해야죠!",
  25: "시작이 반이에요!",
  50: "절반 왔어요! 파이팅!",
  75: "거의 다 왔어요! 조금만 더!",
  100: "완벽해요! 수고했어요🥕",
};

// ─── 달성률에 따른 원 색상 ───
function getCircleColor(percent) {
  if (percent === 0) return "#EAEAEA";      // 연보라 (미완료)
  if (percent <= 25) return "#FBF6FD";      // 보라
  if (percent <= 50) return "#F6EAFC";      // 중간 보라
  if (percent <= 75) return "#E2DFFD";      // 진보라
  return "#CFD9F9";                          // 완료 (진한 보라)
}

// ─── 토끼 이미지 결정 함수 ───
function getRabbitImage(percent) {
  if (percent >= 100) return RABBIT_IMAGES[100];
  if (percent >= 75) return RABBIT_IMAGES[75];
  if (percent >= 50) return RABBIT_IMAGES[50];
  if (percent >= 25) return RABBIT_IMAGES[25];
  return RABBIT_IMAGES[0];
}

function getMessage(percent) {
  if (percent >= 100) return MESSAGES[100];
  if (percent >= 75) return MESSAGES[75];
  if (percent >= 50) return MESSAGES[50];
  if (percent >= 25) return MESSAGES[25];
  return MESSAGES[0];
}

// ─── 2026년 4월 달력 데이터 생성 ───
function generateApril2026() {
  // 2026년 4월 1일 = 수요일 (0=일, 3=수)
  const startDay = 3; // 수요일
  const totalDays = 30;
  const cells = [];

  // 앞쪽 빈 칸 채우기
  for (let i = 0; i < startDay; i++) {
    cells.push({ day: null, key: `empty-${i}` });
  }
  // 1~30일
  for (let d = 1; d <= totalDays; d++) {
    cells.push({ day: d, key: `day-${d}` });
  }
  // 뒤쪽 빈 칸 (7의 배수 맞추기)
  while (cells.length % 7 !== 0) {
    cells.push({ day: null, key: `empty-end-${cells.length}` });
  }
  return cells;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function Process() {
  // ─── 각 날짜별 달성률 상태 (1~30일) ───
  const [dayProgress, setDayProgress] = useState(() => {
    const init = {};
    for (let d = 1; d <= 30; d++) {
      init[d] = 0; // 초기값 0%
    }
    return init;
  });

  // 날짜 클릭 시 달성률 순환: 0 → 25 → 50 → 75 → 100 → 0
  const handleDayClick = (day) => {
    if (!day) return;
    setDayProgress((prev) => {
      const current = prev[day];
      const next = current >= 100 ? 0 : current + 25;
      return { ...prev, [day]: next };
    });
  };

  // ─── 전체 달성률 계산 ───
  const overallPercent = useMemo(() => {
    const values = Object.values(dayProgress);
    const sum = values.reduce((a, b) => a + b, 0);
    return Math.round(sum / values.length);
  }, [dayProgress]);

  const calendarCells = useMemo(() => generateApril2026(), []);
  const rabbitImg = getRabbitImage(overallPercent);
  const message = getMessage(overallPercent);

  return (
    <div style={styles.pageWrapper}>
      {/*
        실제 프로젝트에서는 여기에 <TopTaps /> 추가
        <TopTaps />
      */}

      <div style={styles.wrapper}>
        {/* ══════ 왼쪽: Process 카드 ══════ */}
        <div style={styles.leftPanel}>
          <div style={styles.titleBadge}>Process</div>

          {/* 토끼 이미지 박스 */}
          <div style={styles.rabbitBox}>
            <img
              src={rabbitImg}
              alt={`토끼 ${overallPercent}%`}
              style={styles.rabbitImg}
              onError={(e) => {
                // 이미지 없을 때 대체 텍스트 표시
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div style={{ ...styles.fallbackText, display: "none" }}>
              🐰
              <br />
              rabbit{overallPercent >= 100 ? 5 : overallPercent >= 75 ? 4 : overallPercent >= 50 ? 3 : overallPercent >= 25 ? 2 : 1}.png
            </div>
          </div>

          {/* 한줄평 + 퍼센트 */}
          <div style={styles.messageBox}>{message}</div>
          <div style={styles.percentText}>{overallPercent}%</div>
        </div>

        {/* ══════ 오른쪽: 캘린더 ══════ */}
        <div style={styles.rightPanel}>
          <div style={styles.monthTitle}>4</div>
          <div style={styles.yearSubtitle}>2026</div>

          {/* 요일 헤더 */}
          <div style={styles.weekdayRow}>
            {WEEKDAYS.map((wd) => (
              <div key={wd} style={styles.weekdayCell}>
                {wd}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div style={styles.calendarGrid}>
            {calendarCells.map((cell) => (
              <div
                key={cell.key}
                style={{
                  ...styles.dayCircle,
                  backgroundColor: cell.day
                    ? getCircleColor(dayProgress[cell.day])
                    : "transparent",
                  cursor: cell.day ? "pointer" : "default",
                  boxShadow: cell.day && dayProgress[cell.day] >= 100
                    ? "0 0 12px rgba(108, 92, 231, 0.5)"
                    : "none",
                }}
                onClick={() => handleDayClick(cell.day)}
                title={
                  cell.day
                    ? `4월 ${cell.day}일 - ${dayProgress[cell.day]}% (클릭하여 변경)`
                    : ""
                }
              >
                {cell.day && (
                  <span
                    style={{
                      ...styles.dayNumber,
                      color: dayProgress[cell.day] >= 75 ? "#fff" : "#4a4a6a",
                    }}
                  >
                    {cell.day}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* 범례 */}
          <div style={styles.legend}>
            {[
              { label: "0%", color: "#e0d6f0" },
              { label: "25%", color: "#c4b0e8" },
              { label: "50%", color: "#9b8ec4" },
              { label: "75%", color: "#7b6fa0" },
              { label: "100%", color: "#6c5ce7" },
            ].map((item) => (
              <div key={item.label} style={styles.legendItem}>
                <div
                  style={{
                    ...styles.legendDot,
                    backgroundColor: item.color,
                  }}
                />
                <span style={styles.legendLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 스타일 ───
const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ddd6f3 0%, #faaca8 50%, #c4b0e8 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
  },
  wrapper: {
    display: "flex",
    gap: "2rem",
    background: "rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderRadius: "24px",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    padding: "2rem",
    maxWidth: "900px",
    width: "100%",
    boxShadow: "0 8px 32px rgba(100, 80, 160, 0.15)",
  },

  /* ── 왼쪽 패널 ── */
  leftPanel: {
    flex: "0 0 240px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.75rem",
  },
  titleBadge: {
    background: "rgba(200, 180, 240, 0.4)",
    borderRadius: "20px",
    padding: "0.4rem 1.5rem",
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#4a4a6a",
    letterSpacing: "0.5px",
  },
  rabbitBox: {
    width: "220px",
    height: "260px",
    background: "rgba(255, 220, 240, 0.4)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.5)",
  },
  rabbitImg: {
    maxWidth: "90%",
    maxHeight: "90%",
    objectFit: "contain",
  },
  fallbackText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
    color: "#8a7ab0",
    textAlign: "center",
    lineHeight: 1.4,
  },
  messageBox: {
    background: "rgba(255, 200, 220, 0.5)",
    borderRadius: "12px",
    padding: "0.5rem 1.2rem",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#5a4a6a",
    textAlign: "center",
    width: "100%",
  },
  percentText: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#5a4a6a",
    lineHeight: 1,
  },

  /* ── 오른쪽 패널 ── */
  rightPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  monthTitle: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#4a4a6a",
    lineHeight: 1,
  },
  yearSubtitle: {
    fontSize: "0.85rem",
    color: "#8a7ab0",
    marginBottom: "0.75rem",
    fontWeight: "600",
  },
  weekdayRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "6px",
    width: "100%",
    marginBottom: "4px",
  },
  weekdayCell: {
    textAlign: "center",
    fontSize: "0.75rem",
    fontWeight: "700",
    color: "#8a7ab0",
    padding: "4px 0",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "6px",
    width: "100%",
  },
  dayCircle: {
    aspectRatio: "1",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.25s ease",
    minWidth: "36px",
  },
  dayNumber: {
    fontSize: "0.85rem",
    fontWeight: "700",
    userSelect: "none",
  },

  /* ── 범례 ── */
  legend: {
    display: "flex",
    gap: "12px",
    marginTop: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  legendDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.5)",
  },
  legendLabel: {
    fontSize: "0.7rem",
    color: "#6a5a8a",
    fontWeight: "600",
  },
};
