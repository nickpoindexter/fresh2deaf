import { TodoItemsPage } from "./TodoItemsPage";
import { WelcomePage } from "./WelcomePage";
import { useApp } from "./RealmApp";
import "./App.css";

export function Home() {
    const app = useApp();
   return (
        <div>{app.currentUser ? <TodoItemsPage /> : <WelcomePage />}</div>
    );
}