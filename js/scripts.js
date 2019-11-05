// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, personalAddress, workAddress) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emails = [],
  this.personalAddress = personalAddress,
  this.workAddress = workAddress
}

Contact.prototype.addEmail = function(email){
  this.emails.push(email)
}
function Email(personal) {
  this.personal = personal
}


Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  // console.log(contact.emails[0].personal);
  // console.log(contact.emails[1].personal);
  $(".email").text(contact.emails[0].personal);
  $(".workEmail").text(contact.emails[1].personal);
  $(".personal-address").html(contact.personalAddress);
  $(".work-address").html(contact.workAddress);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedPersonalAddress = $("input#new-personal-address").val();
    var inputtedWorkAddress = $("input#new-work-address").val();
    var inputtedEmail = $("input#new-email").val();
    var inputtedWorkEmail = $("input#new-work-email").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-personal-address").val("");
    $("input#new-work-address").val("");
    $("input#new-email").val("");
    $("input#new-work-email").val("");
    var newEmail = new Email(inputtedEmail)
    var newWorkEmail = new Email (inputtedWorkEmail)
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedPersonalAddress, inputtedWorkAddress);
    newContact.addEmail(newEmail);
    newContact.addEmail(newWorkEmail);
    // newContact.email.toString()
    console.log(newContact)
    console.log(newContact.emails[0]);
    console.log(newContact.emails[1]);

    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
