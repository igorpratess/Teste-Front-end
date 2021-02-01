class Index {

    constructor() {

        this.init();
        this.setEvents();

    }

    init() {

        const span = document.querySelector('.circle span');
        const value = localStorage.getItem('CartValue');
        span.innerText = value ? value : '0';

    } 

    setEvents() {

        const buttons = document.querySelectorAll('.carousel__navigation-button');
        buttons[0].classList.add('active');

        buttons.forEach((btn) => {

            btn.onclick = () => {

                const active = document.querySelector('.active');
                active.classList.remove('active');
                btn.classList.add('active');
                
            };

        });
      
    }

}


const _index = new Index();