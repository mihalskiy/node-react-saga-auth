import React from 'react';
import { Table, Button} from 'reactstrap';


const TableComponent = (toggle) => (
    <Table striped>
        <thead>
        <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
                <Button color="primary">Edit</Button>
                <Button color="danger">Delete</Button>
            </td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>
                <Button color="primary" onClick={toggle()}>Edit</Button>
                <Button color="danger" onClick={toggle()}>Delete</Button>
            </td>
        </tr>
        {/*<tr>*/}
            {/*<th scope="row">3</th>*/}
            {/*<td>Larry</td>*/}
            {/*<td>the Bird</td>*/}
            {/*<td>@twitter</td>*/}
            {/*<td>*/}
                {/*<Button color="primary" onClick={this.props.pageHandler()}>Edit</Button>*/}
                {/*<Button color="danger" onClick={this.props.pageHandler()}>Delete</Button>*/}
            {/*</td>*/}
        {/*</tr>*/}
        </tbody>
    </Table>
)

export default TableComponent;
