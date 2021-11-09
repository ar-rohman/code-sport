import {getClubById} from './club.js';
import {getSavedClubById, deleteSavedClubById} from './saved.js';
import {saveForLater} from './db.js';

document.addEventListener("DOMContentLoaded", () => {
    let urlParams = new URLSearchParams(window.location.search);
    let isSaved = urlParams.get('saved');
    let btnSave = document.getElementById('save');
    let btnDelete = document.getElementById('delete');
    let item;

    if(isSaved) {
        // Hide fab jika dimuat dari indexed db
        btnSave.style.display = 'none';

        // ambil artikel lalu tampilkan
        getSavedClubById();
    }
    else {
        btnDelete.style.display = 'none';
        item = getClubById();
    }

    btnSave.onclick = () => {
        item.then(data => {
            saveForLater(data, 'clubs');
        })
        .then(() => {
             // call toast
             M.toast({html: 'Club Saved'}) 
        })
    }

    btnDelete.onclick = () => {
        deleteSavedClubById()
        .then(() => {
            // call toast
            M.toast({html: 'Club Deleted'});
            window.location.replace('/#saved');
        })
    }
});