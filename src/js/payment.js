import QrCreator from 'qr-creator';
import {payments_data} from './payment-data';
import { createElement } from './utils';
import {data_payments } from './data-payments.js';
import { data_areas, data_zop_square } from './data-areas.js';
class Payment {
    #_el_type = document.getElementById('payment_type');
    #_el_area = document.getElementById('payment_area');
    #_el_owner = document.getElementById('payment_owner');
    #_el_qrcode = document.getElementById('qrcode');
    #_el_sum = document.getElementById('payment_sum');
    #_el_gen = document.getElementById('generate');

    #total_owners = data_areas.length;
    #total_areas = data_areas.flat(1).length;
    
    #total_squares = data_areas.flat(1).reduce((a, area) => {
        return a + area.square
    }, 0) 
    constructor() {
        console.log(data_areas.flat(1));
        this.#_updateAreas();
        this.#_updateTypes();

        this.#_el_gen.onclick = () => this.generate();
        
        this.#_el_type.onchange = () => {
            this.#_updateValue();
        }
        this.#_el_area.onchange = () => {
            this.clear();
            this.#_updateValue();
            localStorage.setItem('payment_area', this.#_el_area.value);
        }
        this.#_el_owner.onkeyup = () => {
            localStorage.setItem('payment_owner', this.#_el_owner.value);
            this.clear();
        }
        this.#_el_sum.onkeyup = () => this.clear();
        this.#_el_owner.value = localStorage.getItem('payment_owner') || '';
        this.#_updateValue();
    }

    #_updateTypes() {
        data_payments.forEach((payment, i) => {
            createElement('option', {value: i, textContent: payment.title }, this.#_el_type);
        });
    }

    #_updateAreas() {
        this.#_el_area.innerHTML = '';
        data_areas.forEach((areas, i) => {
           
            const nums = areas.map(area => {
                return area.num + ' (' + area.square + ' м.кв)'
            }).join(', ');
            createElement('option', {value: i, textContent: nums }, this.#_el_area);
        })
        this.#_el_area.value = localStorage.getItem('payment_area') || this.#_el_area.value;
    }

    

    update() {
        const areas = data_areas[parseInt(this.#_el_area.value)];
        const payment = data_payments[parseInt(this.#_el_type.value)];
        const nums = areas.map(area => {
            return area.num
        }).join(', ');
        const data = {
            ST00012: null,
            Name: 'СНТ "ФРОНТОВИК"',
            PayeeINN: '5007029103',
            PersonalAcc: '40703810940260100356',
            BankName: 'ПАО СБЕРБАНК',
            BIC: '044525225',
            CorrespAcc: '30101810400000000225',
            Purpose: payment.value + ';' + nums + ';' + this.#_el_owner.value,
            sum: this.#_el_sum.value * 100
        }
        const parts = []
        for (let pair in data) {
            parts.push(data[pair] ? pair + '=' + data[pair] : pair);
        }
        const str = parts.join('|');
        console.log(str);
        this.#_el_qrcode.innerHTML = '';
        QrCreator.render({
            text: str,
            radius: 0, // 0.0 to 0.5
            ecLevel: 'L', // L, M, Q, H
            fill: '#000', // foreground color
            background: null, // color or null for transparent
            size: 256 // in pixels
          }, this.#_el_qrcode);
    }

    #_updateValue() {
        //const year = this.#_el_year.value;
        const areas = data_areas[parseInt(this.#_el_area.value)];
        const payment = data_payments[parseInt(this.#_el_type.value)];

        const owner_squares = areas.reduce((a, area) => {
                return a + area.square
        }, 0);
        

        const value = 
            payment.owners / this.#total_owners +                   // Исходя из собственников
            payment.squares / this.#total_squares * owner_squares +
            payment.counts / this.#total_areas * areas.length       // Исходя из участков


        this.#_el_sum.value = value.toFixed(2);
    }

    generate() {
        this.#_el_gen.style.display='none';
        this.#_el_qrcode.style.display = 'block';
        this.update();
    }

    clear() {
        this.#_el_gen.style.display='block';
        this.#_el_qrcode.style.display = 'none';
    }
}

export const payment = new Payment();