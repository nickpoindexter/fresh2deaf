import React from 'react';
import {Table, TableHeader, Row, Cell} from '@leafygreen-ui/table'
import { useApp } from './RealmApp';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { useImprovments } from "../hooks/useImprovements_mql";
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';

interface Improvements {
    _id?: string
    created?: number
    description?: string
    email?: string
    estimation?: string
    name?: string
    next_steps?: string
    notes?: string
    priority?: string
    size?: string
    target_quarter?: string
    team?: string
    ticket?: string
    votes?: number
}

interface Props {
    improvements: Array<Improvements>
}

export default function ImprovementsTable({improvements }: Props) {
  const { currentUser } = useApp();
  const addImprovementVote  = (improvementId: string) => {
    currentUser.functions.AddImprovementVote(improvementId)
  }
  const removeImprovementVote  = (improvementId: string) => {
    currentUser.functions.RemoveImprovementVote(improvementId)
  }
  const { deleteImprovement } = useImprovments();

  return (
     <Table
        columns={[
        <TableHeader label="Name" id="name" />,
        <TableHeader label="Description" id="description" />,
        <TableHeader label="Notes" id="notes" />,
        <TableHeader label="Actions" id="action" />,
        <TableHeader label="Votes" id="votes" />,
        ]}
        data={improvements}
     >
      {({ datum }) => <Row>
        <Cell>{datum.name}</Cell>
        <Cell>{datum.description}</Cell>
        <Cell>{datum.notes ?? ""}</Cell>
        <Cell>
          <Menu
            trigger={
              <Button
                type="button"
                size="xsmall"
              >
                <Icon glyph="Ellipsis" />
              </Button>
            }
          >
            <MenuItem onClick={() => deleteImprovement(datum)}>
              Delete
            </MenuItem>
          </Menu>
        </Cell>
        <Cell>
          {datum.voters?.length || 0}
          {!datum.voters?.includes(currentUser.id) ?
            <IconButton aria-label="Vote Up" onClick={() => addImprovementVote(datum._id.toString())}>
              <Icon glyph="ArrowUp" />
            </IconButton>
            :
            <IconButton aria-label="Remove Vote" onClick={() => removeImprovementVote(datum._id.toString())}>
                <Icon glyph="X" />
            </IconButton>
          }
        </Cell>
      </Row>}
    </Table>
  )
}