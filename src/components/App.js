import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import "babel-es6-polyfill";
import NavBar from './NavBar';
import font from 'font-awesome/css/font-awesome.css'; // eslint-disable-line
import TableComponent from './TableComponent';
import {Container, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    pageHandler = (offset) =>{
         this.setState(() => ({
             modal: offset
         }));
    }

    render() {
        const {modal} = this.state;
    return (

      <div>

        <NavBar
          auth={this.props.auth}
        />

        <Container className="content-wrapper">
          <Row>
            {this.props.children}
              <div>
                  <Button color="danger" onClick={this.toggle}>add new product</Button>
                  <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
                      <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                      <ModalBody>
                          <Form>
                              <FormGroup row>
                                  <Label for="exampleEmail" sm={2}>Email</Label>
                                  <Col sm={10}>
                                      <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                  </Col>
                              </FormGroup>
                              <FormGroup row>
                                  <Label for="examplePassword" sm={2}>Password</Label>
                                  <Col sm={10}>
                                      <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                                  </Col>
                              </FormGroup>
                              <FormGroup row>
                                  <Label for="exampleSelect" sm={2}>Select</Label>
                                  <Col sm={10}>
                                      <Input type="select" name="select" id="exampleSelect" />
                                  </Col>
                              </FormGroup>
                              <FormGroup row>
                                  <Label for="exampleSelectMulti" sm={2}>Select Multiple</Label>
                                  <Col sm={10}>
                                      <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple />
                                  </Col>
                              </FormGroup>
                              <FormGroup row>
                                  <Label for="exampleText" sm={2}>Text Area</Label>
                                  <Col sm={10}>
                                      <Input type="textarea" name="text" id="exampleText" />
                                  </Col>
                              </FormGroup>
                          </Form>
                      </ModalBody>
                      <ModalFooter>
                          <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                  </Modal>
              </div>
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
                          <Button color="primary" onClick={this.toggle}>Edit</Button>
                          <Button color="danger" onClick={this.toggle}>Delete</Button>
                      </td>
                  </tr>
                  <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>
                          <Button color="primary" onClick={this.toggle}>Edit</Button>
                          <Button color="danger" onClick={this.toggle}>Delete</Button>
                      </td>
                  </tr>
                  <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                  <td>
                  <Button color="primary" onClick={this.toggle}>Edit</Button>
                  <Button color="danger" onClick={this.toggle}>Delete</Button>
                  </td>
                  </tr>
                  </tbody>
              </Table>
          </Row>
        </Container>
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.element
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps
)(App);
