import { format } from "date-fns";
import { nl } from "date-fns/locale";
import GanttChart from "./components/GanttChart";
import { projectPlan, timelineEnd, timelineStart } from "./data/projectData";

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <h1>Integrale Projectplanning Oude Langstraat</h1>
          <p>Tilburg · 13 appartementen · Projectvisualisatie (2024–2026)</p>
        </div>
        <div className="update-pill">
          Update: {format(new Date(), "dd-MM-yyyy", { locale: nl })}
        </div>
      </header>

      <GanttChart phases={projectPlan} timelineStart={timelineStart} timelineEnd={timelineEnd} />

      <footer className="app-footer">
        Planning bevat: Sloop &amp; Site Prep, Fundering &amp; Inrichting, Steel Skeleton en Duratherm Installatie.
      </footer>
    </main>
  );
}

export default App;
