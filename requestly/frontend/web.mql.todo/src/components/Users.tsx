import { Cell, Row, Table,TableHeader } from '@leafygreen-ui/table';
import { useUsers } from "../hooks/useUsers_mql";
import { useNavigate } from "react-router-dom";
import { useApp } from "./RealmApp";

export function Users() {
    const app = useApp();
    const navigate = useNavigate();
   
    if(!app.currentUser || app.currentUser.customData.admin==false) {
        navigate('/')
    }
    const { users, toggleAdmin } = useUsers();
    
    return (
        <Table
            data={users}
            columns={[
              <TableHeader label="id" key="id" />,
              <TableHeader label="email" key="email" />,
              <TableHeader label="action" key="action" />
            ]}
          >
            {({ datum }) => (
              <Row>
                <Cell>
                  {datum.userid}
                </Cell>
                <Cell>{datum.email}</Cell>
                <Cell> 
                    <button onClick={() => {
                        toggleAdmin(datum);
                        app.currentUser.refreshCustomData();
                    }}>
                        {datum.admin == true ? "Remove Admin" : "Make Admin"}
                    </button></Cell>
              </Row>
            )}
          </Table>
    )

}