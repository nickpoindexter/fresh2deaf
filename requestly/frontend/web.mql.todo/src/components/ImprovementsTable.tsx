import React from 'react';
import {Table, TableHeader, Row, Cell} from '@leafygreen-ui/table'

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
  return (
     <Table
        columns={[
        <TableHeader label="Name" id="name" />,
        <TableHeader label="Description" id="description" />,
        <TableHeader label="Notes" id="notes" />,
        ]}
        data={improvements}
     >
      {({ datum }) => <Row>
        <Cell>{datum.name}</Cell>
        <Cell>{datum.description}</Cell>
        <Cell>{datum.notes}</Cell>
      </Row>}
    </Table>
  )
}