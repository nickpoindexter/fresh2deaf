import { ImprovementsPage } from "./ImprovementsPage";
import { WelcomePage } from "./WelcomePage";
import { useApp } from "./RealmApp";
import "./App.css";

export function Home() {
    const app = useApp();
   return (
    <div>{app.currentUser ? <ImprovementsPage /> : <WelcomePage />}</div>
    );
}