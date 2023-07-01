import React, { useState } from "react";
import {
  Container,
  Button,
  List,
  LinearProgress,
} from "@mui/material";
import { useTodos } from "../todo_hooks/useTodos";
import { TodoItem } from "./TodoItem";
import { useDraftTodos } from "../todo_hooks/useDraftTodos";
import { DraftTodoItem } from "./DraftTodoItem";
import { useShowLoader } from "../todo_hooks/util-hooks";
import { createObjectId, getTodoId } from "../utils";
import ImprovementsTable from "./ImprovementsTable";
import { useImprovments } from "../hooks/useImprovements_mql";
import { Form } from "./Form"
import { Improvement } from "../types";

export function ImprovementsPage() {
  const [openModal, setOpenModal] = React.useState(false);
  const [editableImprovement, setEditableImprovement] = useState<Improvement | undefined>(undefined);
  const { loading, todos, ...todoActions } = useTodos();
  const { improvements, saveImprovement, updateImprovement } = useImprovments();

  const openModalToEdit = (editableImprovement: Improvement) => {
    setEditableImprovement(editableImprovement);
    setOpenModal(true);
  };

  const submitImprovement = async (improvement: Improvement, isEdit: boolean) => {
    if (isEdit) {
      await updateImprovement(improvement);
    } else {
      await saveImprovement({...improvement, _id: createObjectId()});
    }
  }

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
          <Button
            variant="primaryOutline"
            size="small"
            onClick={() => {
              setEditableImprovement(undefined)
              setOpenModal(curr => !curr)
            }}>
              Create improvement
          </Button>
          <Form
            Submit={submitImprovement}
            open={openModal}
            setOpen={setOpenModal}
            editableImprovement={editableImprovement}
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
          <ImprovementsTable improvements={improvements} setModalOpen={(editable) => openModalToEdit(editable)}/>
        </div>
      )}
    </Container>
  );
}
