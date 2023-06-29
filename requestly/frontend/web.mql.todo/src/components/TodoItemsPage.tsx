import React from "react";
import {
  Container,
  Button,
  Typography,
  List,
  LinearProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTodos } from "../todo_hooks/useTodos";
import { TodoItem } from "./TodoItem";
import { useDraftTodos } from "../todo_hooks/useDraftTodos";
import { DraftTodoItem } from "./DraftTodoItem";
import { useShowLoader } from "../todo_hooks/util-hooks";
import { MoreInfo } from "./MoreInfo";
import { createObjectId, getTodoId } from "../utils";
import ImprovementsTable from "./ImprovementsTable";
import { useImprovments } from "../hooks/useImprovements_mql";
import { Form } from "./Form"

export function TodoItemsPage() {
  const { loading, todos, ...todoActions } = useTodos();
  const { improvements, saveImprovement } = useImprovments();

  const { draftTodos, ...draftTodoActions } = useDraftTodos();
  const showLoader = useShowLoader(loading, 200);
  return (
    <Container className="main-container" maxWidth="sm">
      {loading ? (
        showLoader ? (
          <LinearProgress />
        ) : null
      ) : (
        <div className="todo-items-container">
          <Typography component="p" variant="h5">
            {`You have ${todos.length} To-Do Item${
              todos.length === 1 ? "" : "s"
            }`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => draftTodoActions.createDraftTodo()}
          >
            Add To-Do
          </Button>
          {/* dummy button to verify the inserts work */}
          <Form
            onSubmit={async () => {
              const dummyImprovement = {
                _id: createObjectId(),
                name: 'first try',
                description: 'lets hope this works'
              };
              await saveImprovement(dummyImprovement);
            }}
          >
            Create improvement
          </Form>
          <List style={{ width: "100%" }}>
            {todos.map((todo) => (
              <TodoItem
                key={getTodoId(todo)}
                todo={todo}
                todoActions={todoActions}
              />
            ))}
            {draftTodos.map((draft) => (
              <DraftTodoItem
                key={getTodoId(draft)}
                todo={draft}
                todoActions={todoActions}
                draftTodoActions={draftTodoActions}
              />
            ))}
          </List>
          <ImprovementsTable improvements={improvements}/>
        </div>
      )}
      <MoreInfo />
    </Container>
  );
}
