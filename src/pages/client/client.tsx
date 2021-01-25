import React from 'react';
import { Alert, Button, Form, Table } from 'react-bootstrap';
import ClientCtr from './clientCtr';

const Client: React.FC<ClientCtr> = (props: ClientCtr) => {
    return <div className="row">
        <div className="col-12">
            <h1>Lista de clientes</h1>
        </div>
        <div className="col-12">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre completo</th>
                        <th>Tipo de documento</th>
                        <th>Número de documento</th>
                        <th>Email</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Departamento</th>
                        <th>Municipio</th>
                        <th>Seleccionar</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {props.state.arrayClients.map((client: any, i: number) => {
                        return <tr>
                            <td>{i + 1}</td>
                            <td>{client.full_name}</td>
                            <td>{client.document_type}</td>
                            <td>{client.document_number}</td>
                            <td>{client.user_name}</td>
                            <td>{client.address}</td>
                            <td>{client.phone}</td>
                            <td>{client.departament}</td>
                            <td>{client.municipaly}</td>
                            <td><Form.Check
                                key={"checkbox-" + i}
                                type="checkbox"
                                id={`default-checkbox${i}`}
                                label="Seleccionar"
                                name={"selected"+i}
                                value={client.selected}
                                onChange={() => { props.handleSelected(client.id_client) }}
                            />
                            </td>
                            <td>  <Button onClick={() => { props.handleEdit(client.id_client) }} variant="primary">Editar</Button></td>
                            <td>  <Button onClick={() => { props.handleDelete(client.id_client) }} variant="warning">Eliminar</Button></td>
                        </tr>
                    })}
                </tbody>
            </Table>
            {props.countSelected > 1 ? <Button className="mr-3" onClick={props.handleDeleteAll} variant="warning">Eliminar elementos seleccionados</Button> : ""}
            <Button  onClick={props.handleCreateClient} variant="primary">Crear cliente</Button>
        </div>

        {props.state.idClientEdit || props.state.newClient ? (<div className="col-12">
            <div className="row align-items-center">
                <div className="col"></div>
                <div className="col">
                    {props.state.message ? <Alert key="alert1" variant="warning">
                        {props.state.message}
                    </Alert> : ""}
                    <Form>
                        <h3>Formuladio de edición</h3>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Nombre completo</Form.Label>
                            <Form.Control type="text" name="full_name" placeholder="Nombre" onChange={props.handleChangeInput} value={props.state.form.full_name} />
                        </Form.Group>

                        <Form.Group controlId="selectDocumentType">
                            <Form.Label>Tipo de documento</Form.Label>
                            <Form.Control as="select" name="id_document_type" custom onChange={props.handleChangeInput} value={props.state.form.id_document_type}>
                                <option value="0">[Seleccionar]</option>
                                {props.state.arrayDocumentType.map((dep: any) => {
                                    return <option value={dep.id_document_type}>{dep.document_type}</option>
                                })}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formDocument_number">
                            <Form.Label>Numero de documento</Form.Label>
                            <Form.Control type="number" name="document_number" placeholder="Numero de documento" onChange={props.handleChangeInput} value={props.state.form.document_number} />
                        </Form.Group>

                        <Form.Group controlId="formAddress">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control type="text" name="address" placeholder="Dirección" onChange={props.handleChangeInput} value={props.state.form.address} />
                        </Form.Group>

                        <Form.Group controlId="formPhone">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type="text" pattern="(?:(?:00|\+)?[0-9]{4})?(?:[ .-][0-9]{3}){1,5}" name="phone" placeholder="Numero de teléfono" onChange={props.handleChangeInput} value={props.state.form.phone} />
                        </Form.Group>

                        <Form.Group controlId="formuser_name">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="user_name" placeholder="Email" onChange={props.handleChangeInput} value={props.state.form.user_name} />
                        </Form.Group>

                        <Form.Group controlId="formuser_name">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Contraseña" onChange={props.handleChangeInput} value={props.state.form.password} />
                        </Form.Group>


                        <Form.Group controlId="selectDepartament">
                            <Form.Label>Departamento</Form.Label>
                            <Form.Control as="select" name="id_departament" custom onChange={props.handleChangeInput} value={props.state.form.id_departament}>
                                <option value="0">[Seleccionar]</option>
                                {props.state.arrayDepartament.map((depart: any) => {
                                    return <option value={depart.id_departament}>{depart.departament}</option>
                                })}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="selectMunicipality">
                            <Form.Label>Municipio</Form.Label>
                            <Form.Control as="select" name="id_municipaly" custom onChange={props.handleChangeInput} value={props.state.form.id_municipaly}>
                                <option value="0">[Seleccionar]</option>
                                {props.state.arrayMunicipality.map((mun: any) => {
                                    return <option value={mun.id_municipaly}>{mun.municipaly}</option>
                                })}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="success" type="button" onClick={props.updateClient}>
                            Guardar
                        </Button>
                        <Button className="ml-3" variant="default" type="button" onClick={props.cancelUpdate}>
                            Cancelar
                        </Button>
                    </Form>
                </div>
                <div className="col"></div>
            </div>
        </div>) : ""}
    </div>
}

export default Client;