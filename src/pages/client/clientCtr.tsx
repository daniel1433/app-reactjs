import React from 'react';
import Client from './client';
import API from '../../services/api_servise';
import * as crypto from 'crypto-js';

interface ClientProps {

}

export default class ClientCtr extends React.Component<ClientProps>{

    api: API = new API();
    countSelected = 0;
    state = {
        arrayClients: []
        , idClientEdit: null
        , newClient: false
        , deleteAll: false
        , arrayDocumentType: []
        , arrayDepartament: []
        , arrayMunicipality: []
        , form: {
            full_name: ""
            , id_document_type: ""
            , document_number: ""
            , address: ""
            , phone: ""
            , user_name: ""
            , id_municipaly: ""
            , id_departament: ""
            , password: ""
        }
        , message: null
    }

    componentDidMount = async () => {
        let clients: any = await this.api.get('/clients', [], true, 'api');
        let departaments: any = await this.api.get('/departaments', [], true, 'api');
        let document_types: any = await this.api.get('/document_types', [], true, 'api');

        this.setState({
            arrayClients: clients
            , arrayDepartament: departaments
            , arrayDocumentType: document_types
            // , arrayMunicipality: municipality
        })

        // console.log("Result==> ", clients,departaments, municipality,document_types);


    }

    getClients = async () => {
        let clients: any = await this.api.get('/clients', [], true, 'api');
        this.setState({
            arrayClients: clients
            , idClientEdit: null, form: {
                full_name: ""
                , id_document_type: ""
                , address: ""
                , phone: ""
                , user_name: ""
                , id_municipaly: ""
                , id_departament: ""
                , password: ""
            }
            , message: null
            , newClient: false
        })
    }

    handleCreateClient = () => {
        this.setState({ newClient: true });
    }

    handleDelete = async (idClient: number) => {
        let client: any = this.state.arrayClients.find((val: any) => val.id_client == idClient);
        // let newArray = this.state.arrayClients;
        // newArray.splice(position, 1);
        // this.setState({ arrayClients: newArray });

        let params: any = {
            deleteClient: [{
                id_client: client.id_client
            }]
        };

        let result: any = await this.api.post("api/deleteClients", params);

        console.log("Resultado delete=>", result);
        console.log({ deleteClient: [client] });


        if (result.status) this.getClients();
        else {
            this.setState({ message: "Error al eliminar el cliente." });
        }
    }

    handleEdit = (idClient: number) => {
        let currentClient = this.state.arrayClients.find((val: any) => val.id_client == idClient);
        // console.log("intenta editar? ", currentClient, idClient);

        if (currentClient) {
            this.setState({
                form: currentClient
                , idClientEdit: idClient
            });
        } else {
            this.setState({ message: "Error al consultar el usuario a editar" });
        }


    }

    handleSelected = (idClient: number) => {
        // console.log("Se ejecuta?", this.countSelected);
        let array = this.state.arrayClients;
        let findElement: any = array.find((val: any) => val.id_client == idClient);
        findElement.selected = findElement.selected ? false : true;
        this.countSelected = findElement.selected ? this.countSelected + 1 : this.countSelected - 1;
        this.setState({ arrayClients: array });
    }

    handleDeleteAll = async () => {
        this.countSelected = 0;
        let arrayElementForDelete = this.state.arrayClients.filter((val: any) => val.selected);
        let params: any = {
            deleteClient: arrayElementForDelete.map((val: any) => { return { id_client: val.id_client } })
        };
        let result: any = await this.api.post("api/deleteClients", params);
        this.setState({
            arrayClients : []
        })
        if (result.status) {
            await this.getClients();
            // this.setState({
            //     arrayClients: this.state.arrayClients.filter((val: any) => !val.selected)
            // })
        }
        else {
            this.setState({ message: "Error al eliminar el cliente." });
        }
    }

    handleChangeInput = async (e: any) => {

        switch (e.target.name) {
            case "id_document_type":
                let document: any = this.state.arrayDocumentType.find((val: any) => val.id_document_type == e.target.value && e.target.value != 0)
                this.setState({
                    form: { ...this.state.form, [e.target.name]: e.target.value, document_type: document.document_type },
                });
                break;

            case "id_municipaly":
                let municipaly: any = this.state.arrayMunicipality.find((val: any) => val.id_municipaly == e.target.value && e.target.value != 0)
                this.setState({
                    form: { ...this.state.form, [e.target.name]: e.target.value, municipaly: municipaly.municipaly },
                });
                break;

            case "id_departament":
                let idDep: any = e.target.value;
                let departament: any = this.state.arrayDepartament.find((val: any) => val.id_departament == idDep && e.target.value != 0)
                this.setState({
                    form: { ...this.state.form, [e.target.name]: e.target.value, departament: departament.departament }
                }, () => console.log(this.state.form, idDep));

                let municipality: any = await this.api.get(`/municipalities?id_departament=${idDep}`, [], true, 'api');
                this.setState({
                    arrayMunicipality: municipality
                }, () => console.log(this.state.form, idDep));
                break;

            default:
                this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } });
                break;
        }
    }

    updateClient = async () => {
        console.log(this.state.form);

        let arrayClient: any = this.state.arrayClients;
        let position = arrayClient.findIndex((val: any) => val.id_client == this.state.idClientEdit);
        let currentClient = { ...arrayClient[position], ...this.state.form };
        if (currentClient.password && currentClient.password != "") currentClient.password = crypto.MD5(currentClient.password).toString()

        console.log(currentClient);

        let result: any;
        if (this.state.newClient) {
            result = await this.api.post('api/clients', currentClient);
        } else {
            result = await this.api.put('api/clients', currentClient);
        }

        if (result.status) {
            await this.getClients();
        } else {
            this.setState({ message: "Error al intentar actualizar o crear un nuevo cliente." })
        }
    }

    cancelUpdate = () => {
        this.setState({
            form: {
                full_name: ""
                , id_document_type: ""
                , address: ""
                , phone: ""
                , user_name: ""
                , id_municipaly: ""
                , id_departament: ""
                , password: ""
            },
            idClientEdit: null
            , message: null
            , newClient: false
        })
    }

    render = () => {
        return <Client {...this} />;
    }
}