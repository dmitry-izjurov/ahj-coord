export const body = document.querySelector('body');
export const elemWrapperChat = document.querySelector('.wrapper-chat');
export const elemFormChat = document.querySelector('.form_chat');
export const elemInput = document.querySelector('.field_chat');
export const elemBoxChat = document.querySelector('.box-chat');
export const elemPopup = `
  <div class="popup">
    <div class="popup__box">
      <p class="popup__text">Что-то пошло не так</p>
      <p class="popup__text">К сожалению нам не удалось определить Ваше местоположение. Пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную</p>
      <p class="popup__text">Широта и долгота через запятую. Например, 51.50851, -0.12572</p>
    </div>
    <form class="form">
      <input type="text" class="form__field" required>
      <div class="box-buttons">
        <button class="button-cancel" type="button">Отмена</button>
        <button class="button">ОК</button>
      </div>
    </form>
  </div>
`;

export const elemWrapperMessage = function(text, coor, time) {
  return `
  <div class="wrapper-message wrapper-message_scale">
    <div class="box-message">
      <p class="message__text">${text}</p>
      <span class="coor">${coor}</span>
    </div>
    <span class="nick-time">${time}</span>
  </div>
  `;
}


export function getDate() {
  let dateTransaction = new Date();
  return `${dateTransaction.toLocaleString()}`;
}

export function getCoorStr(str) {
  const newCoor = str;
  
  const newCoorArr = [];
  newCoor.split(',').forEach(a => {
    let num = Number(a);
    if (isNaN(num)) return undefined;
    newCoorArr.push(a.trim());
  });
  
  if (newCoorArr.length === 2) return newCoorArr.join(',');
  else return undefined;
}
