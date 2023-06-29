import { TodoItemsPage } from "./TodoItemsPage";
import { WelcomePage } from "./WelcomePage";
import "./App.css";

export function Home(currentUser: any) {
   return (
    <div>{currentUser ? <TodoItemsPage /> : <WelcomePage />}</div>
    );
}