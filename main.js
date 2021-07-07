// //profile constructor function
// function Profile(name, email, profession) {
//   this.name = name;
//   this.email = email;
//   this.profession = profession;
// }
// //UI constructor function
// function UI() {}
// //Adding method to prototype produce a single copy
// UI.prototype.addProfileToLIst = function({
//   /* profile object destructuring*/ name,
//   email,
//   profession
// }) {
//   ///creating tr
//   const tr = document.createElement('tr');
//   tr.innerHTML = `
//       <th scope="row">${name}</th>
//               <td>${email}</td>
//               <td>${profession}</td>
//               <td><i class="fa fa-trash" id="delete"><i></td>
  
//   `;
//   //append to table body
//   document.querySelector('#profile-list').appendChild(tr);
// };
// //clearing field after submission
// UI.prototype.clearField = function() {
//   document.querySelector('#name').value = '';
//   document.querySelector('#email').value = '';
//   document.querySelector('#profession').value = '';
// };

// //Delete profile Item
// UI.prototype.deleteProfile = function(target) {
//   //Only removing element if click target id is "delete"
//   if (target.id === 'delete') {
//     //accessing and removing tr
//     target.parentElement.parentElement.remove();
//   }
// };

// //Showing alert message
// UI.prototype.showAlert = function(message, className) {
//   const form = document.querySelector('form');
//   const container = document.querySelector('.container');
//   //creating div element
//   const div = document.createElement('div');
//   //assigning class to div
//   div.className = `alert alert-${className}`;

//   div.textContent = message;
//   //inserting before form element
//   container.insertBefore(div, form);
//   //Trigger removing alert after 2000ms = 2s;
//   setTimeout(() => {
//     document.querySelector('.alert').remove();
//   }, 2000);
// };

// //Handling submit event
// document.querySelector('form').addEventListener('submit', e => {
//   const name = document.querySelector('#name').value;
//   const email = document.querySelector('#email').value;
//   const profession = document.querySelector('#profession').value;

//   //Instantiate Profile
//   const profile = new Profile(name, email, profession);
//   //Instantiate UI
//   const ui = new UI();
//   //checking validation of form field
//   if (name === '' || email === '' || profession === '') {
//     //if error showing alert
//     ui.showAlert('please provide necessary information', 'danger');
//   } else {
//     //adding profile to the UI
//     ui.addProfileToLIst(profile);
//     //Showing alert after profile item is added in the UI(user interface)
//     ui.showAlert('Profile is added', 'success');
//     //clearing field
//     ui.clearField();
//   }
//   //preventing default from submission event
//   e.preventDefault();
// });

// //Event delegation-practical use

// document.querySelector('#profile-list').addEventListener('click', e => {
//   //Instantiate UI
//   const ui = new UI();
//   //Deleting profile from UI
//   ui.deleteProfile(e.target);
//   //Showing success message after after item is removed
//   ui.showAlert('Profile is removed', 'success');
// });


