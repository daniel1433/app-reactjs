import { param } from "jquery";

interface paramsGet {
    key: string;
    value: string | number;
}
export default class API {

    private requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': sessionStorage.getItem("session") ? '1' : '0' },
        body: ""
    };

    private requestOptionsGET = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'authorization': sessionStorage.getItem("session") ? '1' : '0' }
    };

    async get(uri: string, params?: paramsGet[], providerOrigin?: boolean, origin?: string) {
        let allUri: string = `${process.env.REACT_APP_API_URL}/${providerOrigin && origin ? origin : 'API'}${uri}`;
        if (params) {
            if (param.length > 0) {
                allUri += `?${params.map((val: paramsGet) => val.value ? `${val.key}=${val.value}` : '')}`.replace(/\,/gi, '&')
            }
        }

        return fetch(allUri, this.requestOptionsGET).then(result => result.json());
    }

    async post(uri: string, body: any) {
        let allUri: string = `${process.env.REACT_APP_API_URL}/${uri}`;
        this.requestOptions.body = body ? JSON.stringify(body) : "";
        console.log(this.requestOptions.body);
        return fetch(allUri, this.requestOptions).then(result => result.json());
    }

    async put(uri: string, body: any) {
        let allUri: string = `${process.env.REACT_APP_API_URL}/${uri}`;
        this.requestOptions.body = body ? JSON.stringify(body) : "";
        this.requestOptions.method = "PUT";
        return fetch(allUri, this.requestOptions).then(result => result.json());
    }


}