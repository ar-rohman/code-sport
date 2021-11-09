import spinner from './spinner.js';
const baseURL = 'https://api.football-data.org/v2/'; 
const token = '703ac5943c1c4b35b7137a902abf54d2';
const competitionID = 2001;

//dipanggil jika fetch berhasil
const responseStatus = response => {
    if(response.status !== 200) {
        console.log(`Error message: ${response.status}`);
        // panggil blok catch
        return Promise.reject(new Error(response.statusText));
    }
    else {
        // mengubah object menjadi promise
        return Promise.resolve(response);
    }
}

// parsing json menjadi array javascript
const responseJSON = response => {
    return response.json()
}

// response text
const responseText = response => {
    return response.text()
}

// meng-handle kesalahan di blok catch
const error = error => {
    // parameter error berasal dari promise.reject()
    console.log(`Error: ${error}`);
}

/**
 * fetch data dari server
 * @param {string} endpoint 
 * @param {object} Obj 
 * @param {string} idTag
 */
const getAPIData = (endpoint, Obj, idTag) => {
    return new Promise((resolve, reject) => {
        if('caches' in window) {
            caches.match(baseURL + endpoint)
            .then(response => {
                if(response) {
                    response.json().then(data => {
                        Obj(data);
                        resolve(data);
                    });
                }
            });
        }

        spinner(idTag);
        fetch(baseURL + endpoint, {
            headers: {
                'X-Auth-Token': token
            }
        })
        .then(responseStatus)
        .then(responseJSON)
        .then(data => {
            Obj(data);
            resolve(data);
        })
        .catch(error);
    });
}

export {
    getAPIData,
    competitionID,
    responseStatus,  
    responseText, 
    error,
};
