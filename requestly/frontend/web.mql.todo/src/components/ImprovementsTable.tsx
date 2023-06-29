import React from 'react';
import {Table, TableHeader, Row, Cell} from '@leafygreen-ui/table'

interface Props {
    improvements: Array<any>
}

export default function ImprovementsTable({improvements }: Props) {
  return (
     <Table
        columns={[
        <TableHeader label="header hello" id="test" />,
        <TableHeader label="header world" id="test" />,
        ]}
        data={improvements}
     >
      {({ datum }) => <Row><Cell>{datum.hello}</Cell><Cell>{datum.world}</Cell></Row>}
    </Table>
  )
}