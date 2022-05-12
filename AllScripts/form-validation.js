$(document).ready(function() {

  localStorage.setItem('k', 'k');

  $.validator.addMethod("letters_numbers", function(value, element) {
    return this.optional(element) || /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9!@#$%&*]+$/i.test(value);
},);

$.validator.addMethod("letters_only", function(value, element) {
  return this.optional(element) || /[a-zA-Z]$/i.test(value);
},);

    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[name='registration']").validate({
      // Specify validation rules
      rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
        UserName: {
          required: true,
        },
        FullName: {
          required: true,
          letters_only: true
        },
        Email: {
          required: true,
          // Specify that Email should be validated
          // by the built-in "Email" rule
          email: true
        },
        Password: {
          required: true,
          minlength: 6,
          letters_numbers: true
        },
        BirthDate: {
          required: true,
        }
      },
      // Specify validation error messages
      messages: {
        UserName: "Please provide your User Name",
        FullName: {
          required: "Please provide your Full Name",
          letters_only: "Your name cannot include digits or special characters"
        },
        Password: {
          required: "Please provide your Password",
          minlength: "Password must include at least 6 characters",
          letters_numbers: "Password must include at least one character and one digit"
        },
        Email: {
          required: "Please provide your Email address",
          Email: "Please enter a valid Email address"
        },
        BirthDate: "Please provide your Birth Date"
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        let user_name = document.getElementById("UserName").value;
        let password = document.getElementById("Password").value;
        localStorage.setItem(user_name, password);
        changeDiv('loginDiv');        
      }
    });
  });
  