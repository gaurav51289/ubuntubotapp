export const API = 'http://ec2-34-227-69-84.compute-1.amazonaws.com:5000';
//export const API = 'http://localhost:5000';




export const ask = (question) => {
    return fetch(`${API}/ask/`, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(question)
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            throw Error(res.status + " : " + res.statusText);
        }
    });
};
