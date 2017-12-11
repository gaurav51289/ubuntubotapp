export const API = 'https://dummybackend1.herokuapp.com';
//export const API = 'http://localhost:4000';

const headers = {
    'Accept': 'application/json'
};

export const ask = (question) => {
    return fetch(`${API}/ask/`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(question)
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            throw Error(res.status + " : " + res.statusText);
        }
    });
};
