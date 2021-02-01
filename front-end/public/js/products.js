const apiProducts = axios.create({
    baseURL: 'https://corebiz-test.herokuapp.com/api/v1/'
});

class Products {

    constructor() {

        this.getProducts();

    }

    getProducts() {

        apiProducts.get('products')
            .then((res) => {
                this, this.mountList(res.data);
            })
            .catch((err) => {
                console.error(err);
            });

    }

    mountList(data) {

        const section = document.getElementById('s-products');
        const ul = section.querySelector('ul.list');

        for (let i = 0; i < data.length; i++) {

            const li = document.createElement('li');
            const card = document.createElement('div');
            card.className = 'card';
            li.appendChild(card);

            const triangulo = document.createElement('div');
            triangulo.className = 'triangulo';

            const off = document.createElement('span');
            off.innerText = 'OFF';
            triangulo.appendChild(off);
            card.appendChild(triangulo);

            const img = document.createElement('img');
            img.src = data[i].imageUrl;
            img.alt = data[i].productName;
            img.style.width = '100%';
            img.style.objectFit = 'contain';
            img.height = 200;

            const divHover = document.createElement('div');
            divHover.className = 'div-hover';

            const h6 = document.createElement('h6');
            h6.className = 'text-gray2 text-uppercase';
            h6.innerText = data[i].productName;

            const rating = document.createElement('div');
            rating.className = 'rating';
            this.createStars(rating, data[i].stars);

            let p = document.createElement('p');

            if (data[i].listPrice) {

                p.className = 'text-gray2 installments';
                p.innerText = 'de R$ ' + this.formatMoney(data[i].listPrice);

            } else {

                triangulo.style.opacity = '0';
                p.style.height = '18px';

            }

            const pricing = document.createElement('div');
            pricing.className = 'flex';

            const span = document.createElement('span');
            span.innerText = 'por';

            const h4 = document.createElement('h4');
            h4.className = 'ml-1';
            h4.innerText = 'R$ ' + this.formatMoney(data[i].price);

            const button = document.createElement('button');
            button.className = 'btn d-none w-50 text-uppercase';
            button.innerText = 'comprar';
            button.onclick = () => this.btnClick();

            pricing.appendChild(span);
            pricing.appendChild(h4);

            card.appendChild(img);
            card.appendChild(divHover);
            divHover.appendChild(h6);
            divHover.appendChild(rating);
            divHover.appendChild(p);
            divHover.appendChild(pricing);

            if (data[i].installments.length) {

                const span2 = document.createElement('span');
                span2.className = 'text-gray2 installments';
                span2.innerText = 'ou em ' + data[i].installments[0].quantity + 'x de R$ ' + this.formatMoney(data[i].installments[0].value);
                divHover.appendChild(span2);

            }
            divHover.appendChild(button);
            ul.appendChild(li);

        }

    }

    formatMoney(price) {

        const array = price.toString().split('');
        let value;

        if (array.length === 1) {

            value = array[0] + ',00';

        } else {

            array.splice(array.length - 2, 0, ',');
            value = array.join('');

        }

        return value;

    }

    createStars(rating, stars) {

        const div = document.createElement('div');
        div.className = 'rating-stars';

        const ul = document.createElement('ul');
        div.appendChild(ul);

        for (let i = 0; i < 5; i++) {

            ul.id = 'stars' + i.toString();
            const li = document.createElement('li');
            li.className = 'star';
            li.dataset['value'] = (i + 1).toString();

            const icon = document.createElement('i');
            icon.className = 'fa fa-star-o';
            li.appendChild(icon);

            if(i < stars) {

                li.className = 'star selected';
                icon.className = 'fa fa-star';

            }

            $('#' + ul.id + ' li').on('mouseover', function () {
                let onStar = parseInt($(this).data('value'), 10);

                $(this).parent().children('li.star').each(function (e) {
                    if (e < onStar) {
                        $(this.firstElementChild).removeClass('fa fa-star-o');
                        $(this.firstElementChild).addClass('fa fa-star');
                        $(this).addClass('hover');
                    }
                    else {
                        $(this.firstElementChild).removeClass('fa fa-star');
                        $(this.firstElementChild).addClass('fa fa-star-o');
                        $(this).removeClass('hover');
                    }
                });

            }).on('mouseout', function () {
                $(this).parent().children('li.star').each(function (e) {
                    $(this.firstElementChild).removeClass('fa fa-star');
                    $(this.firstElementChild).addClass('fa fa-star-o');
                    $(this).removeClass('hover');
                });
            });


            $('#' + ul.id + ' li').on('click', function () {
                $(this).off();
                let onStar = parseInt($(this).data('value'), 10);
                let stars = $(this).parent().children('li.star');

                for (i = 0; i < stars.length; i++) {
                    $(stars[i].firstElementChild).removeClass('fa fa-star');
                    $(stars[i].firstElementChild).addClass('fa fa-star-o');
                    $(stars[i]).removeClass('selected');
                }

                for (i = 0; i < onStar; i++) {
                    $(stars[i].firstElementChild).removeClass('fa fa-star-o');
                    $(stars[i].firstElementChild).addClass('fa fa-star');
                    $(stars[i]).addClass('selected');
                }


            });

            ul.appendChild(li);

        }

        rating.appendChild(div);
    }

    btnClick() {
        const span = document.querySelector('.circle span');
        const value = parseInt(span.innerText) + 1;
        span.innerText = value;
        localStorage.setItem('CartValue', value);
    }

}

const _products = new Products();