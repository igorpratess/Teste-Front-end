const apiNewsletter = axios.create({
    baseURL: 'https://corebiz-test.herokuapp.com/api/v1/'
});

class Newsletter {

    constructor() {

        this.formSubmit();

    }

    sendUser(valEmail, valNome) {

        apiNewsletter.post("newsletter", {
            email: valEmail,
            name: valNome
        })
            .then((res) => {
                this.showNewEmail();
            })
            .catch((err) => {
                console.log(err)
            });

    }

    showNewEmail() {

        const divNewEmail = document.querySelector('.newEmail');
        const divNews = document.querySelector('.news');
        divNewEmail.classList.remove('d-none');
        divNews.classList.add('d-none');
        const button = divNewEmail.querySelector('button');
        button.onclick = () => this.showNews(divNewEmail, divNews)

    }

    showNews(divNewEmail, divNews) {

        const inputNome = document.querySelector('#inputNome');
        const inputEmail = document.querySelector('#inputEmail');
        inputEmail.value = '';
        inputNome.value = '';
        divNewEmail.classList.add('d-none');
        divNews.classList.remove('d-none');

    }

    formSubmit() {

        const form = document.getElementById('form');
        const button = form.querySelector('button');
        const inputNome = form.querySelector('#inputNome');
        const inputEmail = form.querySelector('#inputEmail');
        let validEmail = false;
        let validNome = false;

        form.onsubmit = (e) => {

            e.preventDefault();

            if (!inputEmail.value || inputEmail.value.indexOf('@') === -1) {

                inputEmail.classList.add('invalid');
                button.classList.add('disabled');
                this.createMessage('um e-mail válido', inputEmail);
                validEmail = false;

            } else {

                validEmail = true;

            }

            if (!inputNome.value) {

                inputNome.classList.add('invalid');
                button.classList.add('disabled');
                this.createMessage('seu nome completo', inputNome);
                validNome = false;

            } else {

                validNome = true;

            }

            if (validEmail && validNome) {

                button.classList.remove('disabled');
                this.sendUser(inputEmail.value, inputNome.value);

            } else {

                button.classList.add('disabled');
                let message;
                if (!validNome && !validEmail) {

                    inputEmail.onchange = () => {

                        button.classList.remove('disabled');
                        inputEmail.classList.remove('invalid');
                        inputNome.classList.remove('invalid');
                        message = document.querySelectorAll('.message');
                        message[0].style.display = 'none';
                        message[1].style.display = 'none';

                    }

                } else if (!validEmail) {

                    inputEmail.onchange = () => {

                        button.classList.remove('disabled');
                        inputEmail.classList.remove('invalid');
                        message = document.querySelector('.message');
                        if (message) message.style.display = 'none';

                    }

                } else {

                    inputNome.onchange = () => {

                        button.classList.remove('disabled');
                        inputNome.classList.remove('invalid');
                        message = document.querySelector('.message');
                        if (message) message.style.display = 'none';

                    }

                }


            }

        }

    }

    createMessage(message, input) {

        const span = document.createElement('span');
        span.innerText = 'Preencha com ' + message;
        span.className = 'message';
        input.parentNode.insertBefore(span, input.nextSibling);

    }

}


const _newsletter = new Newsletter();