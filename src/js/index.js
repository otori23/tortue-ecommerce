import '../css/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

(() => {
  window.addEventListener('DOMContentLoaded', e => {
    /* Handle Slider */
    let showcase = document.getElementById('showcase');
    let topLayer = showcase.querySelector('.top');
    let handle = showcase.querySelector('.handle');
    let skew = 0;
    let delta = 0;

    if (showcase.className.indexOf('skewed') != -1) {
      skew = 1000;
    }

    showcase.addEventListener('mousemove', e => {
      delta = (e.clientX - window.innerWidth / 2) * 0.5;

      handle.style.left = e.clientX + delta + 'px';

      topLayer.style.width = e.clientX + skew + delta + 'px';
    });

    /* Handle Form */
    const form = document.getElementById('form');
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');

    form.addEventListener('submit', e => {
      e.preventDefault();

      if (checkInputs()) {
        const formData = new FormData(form);
        const postBody = {
          'form-name': form.name,
          fullname: formData.get('fullname'),
          email: formData.get('email'),
          message: formData.get('message')
        };

        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode(postBody)
        })
          .then(() => {
            form.reset();
            setResetFor(fullname);
            setResetFor(email);
            alert('Success!');
          })
          .catch(error => {
            alert(error);
          });
      }
    });

    function checkInputs() {
      let res = true;
      // trim to remove the whitespaces
      const fullnameValue = fullname.value.trim();
      const emailValue = email.value.trim();

      if (fullnameValue === '') {
        setErrorFor(fullname, 'Full name cannot be blank');
        res = false;
      } else {
        setSuccessFor(fullname);
      }

      if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        res = false;
      } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
        res = false;
      } else {
        setSuccessFor(email);
      }

      return res;
    }

    function setErrorFor(input, message) {
      const formControl = input.parentElement;
      const small = formControl.querySelector('small');
      formControl.className = 'form-control error';
      small.innerText = message;
    }

    function setSuccessFor(input) {
      const formControl = input.parentElement;
      formControl.className = 'form-control success';
    }

    function setResetFor(input) {
      const formControl = input.parentElement;
      formControl.className = 'form-control';
    }

    function isEmail(email) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );
    }

    function encode(data) {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&');
    }
  });
})();
