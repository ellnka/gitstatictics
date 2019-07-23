export default class Services {
    constructor() {}

    static fetch(url) {
        let username = "ellnka";
        let password = "password123";
        //let url = `https://httpbin.org/basic-auth/${username}/${password}`
        let authString = `${username}:${password}`;
        let headers = new Headers();
        headers.set("Content-Type", "application/json");
        //headers.set("Authorization", "Basic " + btoa(authString));
        return fetch(url, { method: "GET", headers: headers }).then(response =>
            response.json()
        );
    }

    static update(url, payload) {
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    }
}
