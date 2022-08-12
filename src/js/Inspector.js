import {
  elemWrapperChat, elemFormChat, elemInput, elemBoxChat, elemWrapperMessage, elemPopup, getDate, getCoorStr
} from './utils';

export default class Inspector {
  constructor() {
    this.data = undefined;
    this.latitude = undefined;
    this.longitude = undefined;
  }

  showPost() {
    const elemWrapMessScale = document.querySelector('.wrapper-message_scale');
    elemFormChat.reset();
    setTimeout(() => elemWrapMessScale.classList.remove('wrapper-message_scale'), 100);
  }

  getPost() {
    const text = elemInput.value;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.latitude = pos.coords.latitude;
        this.longitude = pos.coords.longitude;
        if (this.latitude && this.longitude) {
          elemBoxChat.insertAdjacentHTML('beforeend', elemWrapperMessage(text, `[${this.latitude}, ${this.longitude}]`, getDate()));
          this.showPost();
        } else {
          this.showModal();
        }
      }, (error) => {
        if (error.code === 1) {
          this.showModal();
        }
      });
    } else {
      alert('Геолокация не поддерживается этим браузером');
    }
  }

  showModal() {
    const text = elemInput.value;
    elemWrapperChat.insertAdjacentHTML('afterend', elemPopup);
    const elemForm = document.querySelector('.form');
    const elemFormField = document.querySelector('.form__field');
    const elemButtonCancel = document.querySelector('.button-cancel');
    
    elemButtonCancel.addEventListener('click', (e) => e.target.closest('.popup').remove());
    elemForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newCoor = getCoorStr(elemFormField.value);
      
      if (newCoor) {
        elemBoxChat.insertAdjacentHTML('beforeend', elemWrapperMessage(text, `[${newCoor}]`, getDate()));
        e.target.closest('.popup').remove();
        this.showPost();
      } else {
        alert('Введены некорректные координаты');
        elemForm.reset();
      }
    });
  }
}
