import axios from 'axios';

export async function authorizedAxios(method, url, data="") {
    const api_url = "https://elearning-shota1.herokuapp.com/" + url
    switch(method) {
        case "get":
            return await getAxios(api_url);
            break;
        case "post":
            return await postAxios(api_url, data);
            break;
        case "patch":
            return await patchAxios(api_url, data);
        case "delete":
            return await deleteAxios(api_url);
            break;
        default:
            console.log('error')
            console.log('undifined method');
    }
}

async function getAxios(url) {
        return await axios.get(url, {
            headers: {
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error => {
            console.log(error);
            return error;
        })
}
async function postAxios(url, data) {
    return await axios.post(url, data, {
        headers: {
            'Accept' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        }
    })
    .then(response => {
        console.log(response);
        return response;
    })
    .catch(error => {
        console.log(error);
        return error;
    })
}

async function patchAxios(url, data) {
    return await axios.patch(url, data, {
        headers: {
            'Accept' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        }
    })
    .then(response => {
        console.log(response);
        return response;
    })
    .catch(error => {
        console.log(error);
        return error;
    })
}

async function deleteAxios(url) {
    return await axios.delete(url, {
        headers: {
            'Accept' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        }
    })
    .then(response => {
        console.log(response);
        return response;
    })
    .catch(error => {
        console.log(error);
        return error;
    })
}