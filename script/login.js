import { strToDom } from "./util.js";
import { signin } from "./compenent.js";
export class login extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(strToDom(signin));

        // Créer un nouvel élément de style
        let style = document.createElement('style');
        style.textContent = `
      #form{
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 15px;
      }
          .title {
              display: flex;
              justify-content: center;
              align-items: center;
          }
          .signIn{
              text-align: center;
              border-radius: 10px 0 0 10px;
              background-color: aliceblue;
              width: 400px;
            //   height: 100%;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              color: blue;
          }
          .input{
              background-color: rgba(142, 156, 172,0.5);
              width: 250px;
              height: 30px;
              border-radius: 10px;
              color: blue;
              padding: 0 5px 0 5px;
          }
          .textForRemember{
              font-size: 10px;
              margin-right: 50px;
          }
          .forgetPassword{
              font-size: 13px;
              font-weight: 600;
          }
          .signIn #Login{
              background-color: blue;
              color: white;
              margin-top: 25px;
              cursor: pointer;
              font-size: 15px;
              font-weight: 600;  
          }
          `;
        // Ajouter l'élément de style à this.shadowRoot
        this.shadowRoot.appendChild(style);
    }
    // pour soumettre la formulaire login une fois que le shadowDom est attaché
    connectedCallback() {
        
    }
}