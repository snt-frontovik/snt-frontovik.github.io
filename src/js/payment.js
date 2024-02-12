import QrCreator from 'qr-creator';
import {payments_data} from './payment-data';
import { createElement } from './utils';

class Payment {
    #_el_type = document.getElementById('payment_type');
    #_el_year = document.getElementById('payment_year');
    #_el_area = document.getElementById('payment_area');
    #_el_owner = document.getElementById('payment_owner');
    #_el_qrcode = document.getElementById('qrcode');
    #_el_sum = document.getElementById('payment_sum');
    #_el_gen = document.getElementById('generate');

    constructor() {
        this.#_updateAreas();
        this.#_updateYears();

        this.#_el_gen.onclick = () => this.generate();
        this.#_el_year.onchange = () => {
            this.clear();
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
        this.#_el_owner.value = localStorage.getItem('payment_owner');
        this.#_updateValue();
    }

    #_updateAreas() {
        this.#_el_area.innerHTML = '';
        payments_data.areas.forEach(areas => {
           
            const nums = areas.map(area => {
                return area.num + ' (' + area.square + ' м.кв)'
            }).join(', ');
            createElement('option', {value: areas[0].num, textContent: nums }, this.#_el_area);
        })
        this.#_el_area.value = localStorage.getItem('payment_area') || this.#_el_area.value;
    }

    #_updateYears() {
        payments_data.regular.forEach(period => {
            createElement('option', {value: period.year, textContent: period.year }, this.#_el_year);
        });
    }

    update() {
        const areas = payments_data.areas.find(areas => areas[0].num === this.#_el_area.value);
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
            Purpose: this.#_el_type.value + ';' + this.#_el_year.value + ';' + nums + ';' + this.#_el_owner.value,
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
        const year = this.#_el_year.value;
        const area = this.#_el_area.value;
        const period = payments_data.regular.find(p => p.year === year);
        const payment = period.payments.find(p => p.area === area);
        this.#_el_sum.value = payment.sum.toFixed(2);
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