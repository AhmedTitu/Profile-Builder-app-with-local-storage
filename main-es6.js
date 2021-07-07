class Profile {
  constructor(id, name, email, profession) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.profession = profession;
  }
}

//Store class is for handling localStorage
class Store {
  //adding item to Storage
  static addToStorage(profile) {
    let profiles;
    if (localStorage.getItem('profiles') === null) {
      profiles = [];
    } else {
      profiles = JSON.parse(localStorage.getItem('profiles'));
    }
    profiles.push(profile);
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }
  //Getting from localStorage
  static getProfiles() {
    let profiles;
    if (localStorage.getItem('profiles') === null) {
      profiles = [];
    } else {
      profiles = JSON.parse(localStorage.getItem('profiles'));
    }
    return profiles;
  }
  //display profiles from localStorage
  static displayProfiles() {
    const profiles = Store.getProfiles();
    profiles.forEach(profile => {
      const ui = new UI();
      ui.addProfileToLIst(profile);
    });
  }
  //delete profile item from localStorage
  static deleteProfileFromStore(id) {
    const profiles = Store.getProfiles();
    profiles.forEach((profile, index) => {
      //checking whether current id and profile id is same
      if (profile.id === id) {
        profiles.splice(index, 1);
      }
    });
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }
}
//Trigger After DOMLoaded
//calling displayProfile after DOM is ready
window.addEventListener('DOMContentLoaded', Store.displayProfiles);
class UI {
  //adding profile to UI(user interface)
  addProfileToLIst({ id, name, email, profession }) {
    //creating tr
    const tr = document.createElement('tr');
    //creating hidden element to track id(special identification)
    tr.innerHTML = `
      <th scope="row">${name}</th>
              <td>${email}</td>
              <td>${profession}</td>
              <input type="hidden" data-id="${id}" />
              <td><i class="fa fa-trash" id="delete"><i></td>
  
  `;
    //append to table body
    document.querySelector('#profile-list').appendChild(tr);
  }
  clearField() {
    //clearing field
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#profession').value = '';
  }
  deleteProfile(target) {
    if (target.id === 'delete') {
      //id is string -convert into number for future comparing
      //Getting id  from target hidden input
      const id = Number(target.parentElement.previousElementSibling.dataset.id);
      //remove from local Storage
      Store.deleteProfileFromStore(id);
      //removing tr
      target.parentElement.parentElement.remove();
    }
  }

  //showing alert
  showAlert(message, className) {
    const form = document.querySelector('form');
    const container = document.querySelector('.container');
    //creating div
    const div = document.createElement('div');
    //assigning class to div
    div.className = `alert alert-${className}`;

    div.textContent = message;
    container.insertBefore(div, form);
    //Remove alert component from dom after 2000ms = 2sec
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 2000);
  }

  getId() {
    //Give all existed dynamically generated tr length
    return document.querySelectorAll('tr').length;
  }
}

document.querySelector('form').addEventListener('submit', e => {
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const profession = document.querySelector('#profession').value;
  //Instantiate UI
  const ui = new UI();
  //Getting id
  const id = ui.getId();

  //Instantiate Profile
  const profile = new Profile(id, name, email, profession);
  //checking  from field validation
  if (name === '' || email === '' || profession === '') {
    ui.showAlert('please provide necessary information', 'danger');
  } else {
    ui.showAlert('Profile is added', 'success');
    //Adding to List
    ui.addProfileToLIst(profile);
    //Adding to LocalStorage
    Store.addToStorage(profile);
    //clearing filed
    ui.clearField();
  }
  //prevent default action of from submission
  e.preventDefault();
});

//Event delegation-practical use

document.querySelector('#profile-list').addEventListener('click', e => {
  //Instantiate UI
  const ui = new UI();
  //delete from list
  ui.deleteProfile(e.target);
  ui.showAlert('Profile is removed', 'success');
});
