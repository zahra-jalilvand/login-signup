import { Authentication } from './auth.js';
import { LocalStorageData } from './storage.js';

const signUpForm = document.querySelector('.signup');
const messagePreview = document.querySelector('.message');
const forms = document.querySelector(".forms");
const pwShowHide = document.querySelectorAll(".eye-icon");
const links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
eyeIcon.addEventListener("click", () => {
  const pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
  
  pwFields.forEach(password => {
      if(password.type === "password"){
          password.type = "text";
          eyeIcon.classList.replace("bx-hide", "bx-show");
          return;
      }
      password.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
  })
  
})
})      

links.forEach(link => {
link.addEventListener("click", e => {
 e.preventDefault(); 
 forms.classList.toggle("show-signup");
})
})

    


signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  console.log(e);

  messagePreview.textContent = '';

  const emailInput = e.target.input;
  const passwordInput = e.target.password;

  try {
    const user = new Authentication(
      emailInput.value.trim(),
      passwordInput.value.trim()
    );
    user.verifyData();
    const res = await user.signup();
    console.log(res);
    if (res.statusCode === 409) {
      messagePreview.textContent = res.message;
      messagePreview.style.color = 'crimson';
    }

    if (res.statusCode === 201) {
      console.log(res);

      LocalStorageData.setData(res.data);
      window.location.replace('./index.html');
    }
  } catch (error) {
    if (error.message === 'passwordError') {
      messagePreview.textContent =
        'Your password must be more than 5 characters';
      messagePreview.style.color = 'crimson';
    }

    if (error.message === 'emailError') {
      messagePreview.textContent =
        'Your email is not correct';
      messagePreview.style.color = 'crimson';
    }
    }
  }
);




const signInForm = document.querySelector('form');

signInForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  messagePreview.textContent = '';

  const emailInput = e.target.email;
  const passwordInput = e.target.password;

  try {
    const user = new Authentication(
      emailInput.value.trim(),
      passwordInput.value.trim()
    );

    user.verifyData();

    const res = await user.signin();
    if (res.statusCode === 404) {
      messagePreview.textContent = res.message;
      messagePreview.style.color = 'crimson';
    }

    if (res.statusCode === 200) {
      LocalStorageData.setData(res.data);
      window.location.replace('./index.html');
    }
  } catch (error) {
    if (error.message === 'passwordError') {
      messagePreview.textContent = 'email or password is incorrect';
      messagePreview.style.color = 'crimson';
    }
  }
});





   
