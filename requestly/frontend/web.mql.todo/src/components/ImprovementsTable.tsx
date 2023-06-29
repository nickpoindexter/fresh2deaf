import React from 'react';
import {Table, TableHeader, Row, Cell} from '@leafygreen-ui/table'
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useApp } from './RealmApp';

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
    voters: string[]
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

  return (
     <Table
        columns={[
        <TableHeader label="Votes" id="votes" />,
        <TableHeader label="Name" id="name" />,
        <TableHeader label="Description" id="description" />,
        <TableHeader label="Notes" id="notes" />,
        ]}
        data={improvements}
     >
      {({ datum }) => <Row>
        <Cell>
            {datum.voters.length}
            { !datum.voters.includes(currentUser.id) ?
                <IconButton aria-label="Vote Up" onClick={() => addImprovementVote(datum._id.toString())}>
                    <Icon glyph="ArrowUp" />
                </IconButton>
                :
                <IconButton aria-label="Remove Vote" onClick={() => removeImprovementVote(datum._id.toString())}>
                    <Icon glyph="X" />
                </IconButton>
            }
        </Cell>
        <Cell>{datum.name}</Cell>
        <Cell>{datum.description}</Cell>
        <Cell>{datum.notes}</Cell>
      </Row>}
    </Table>
  )
}