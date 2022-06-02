import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor({selectorPopup, handleFormSubmit}){
        super(selectorPopup);
        this._handleFormSubmit = handleFormSubmit;
    }

    // _getInputValues() {
    //     this._
    // }

    setEventListeners() {
        this._selectorPopup.addEventListener('submit', () => {
        this._handleFormSubmit();
        });
    }

     close(){
        super.close();
     }
}