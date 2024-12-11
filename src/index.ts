import {FaceTecSDK} from '../core-sdk/FaceTecSDK.js/FaceTecSDK';
import type { FaceTecSessionResult,FaceTecFaceScanResultCallback,FaceTecFaceScanProcessor} from '../core-sdk/FaceTecSDK.js/FaceTecPublicApi';
import { Config } from '../Config';
import { LivenessCheckProcessor } from '../processors/LivenessCheckProcessor';
import axios from '../node_modules/axios/index';
//require('dotenv').config();




export class MyApp {
    public tenantId = '4736a7fd-563e-41ca-89e0-3741563f325f'; // Reemplaza con tu tenant ID
    public openIdConfigUrl = `https://login.microsoftonline.com/${this.tenantId}/v2.0/.well-known/openid-configuration`;

    //init
    public init = ():void => {
        FaceTecSDK.setResourceDirectory("../core-sdk/FaceTecSDK.js/resources");
        FaceTecSDK.setImagesDirectory("../core-sdk/FaceTec_images");

        //initialize FaceTecSDK
        FaceTecSDK.initializeInDevelopmentMode(Config.DeviceKeyIdentifier, Config.PublicFaceScanEncryptionKey, 
            function(inicializationSuccessfull:boolean){
                console.log("Iniciation Successfull: " + inicializationSuccessfull);
                if (!inicializationSuccessfull) {
                    console.error(Config.DeviceKeyIdentifier);
                    console.error(Config.PublicFaceScanEncryptionKey);
                    console.error("FaceTec SDK initialization failed. Please check your Device Key Identifier and Public Face Scan Encryption Key.");
                }
            }
        );

        
        axios.get(this.openIdConfigUrl)
        .then(response => {
            console.log(response.data);
            alert('OpenID metadata fetched successfully');
        })
        .catch(error => {
            console.error('Error fetching OpenID metadata:', error);
        });
    }


    public onLivenessCheckPressed = ():void => {
        this.getsessionToken((sessionToken?:string):void => {
            const livenessCheckProcessor = new LivenessCheckProcessor(sessionToken as string);
        });    
    }

    
    getsessionToken = (sessionTokenCallback: (sessionToken: string) => void): void => {
        const XHR = new XMLHttpRequest();
        XHR.open("GET", Config.BaseURL + "/session-token", true);
        XHR.setRequestHeader("X-User-Agent", FaceTecSDK.createFaceTecAPIUserAgentString(""));
        XHR.setRequestHeader("X-Device-Key", Config.DeviceKeyIdentifier);
    
        XHR.onreadystatechange = function () {
            if (XHR.readyState === 4 && XHR.status === 200) {
                const sessionToken = JSON.parse(XHR.responseText).sessionToken;
                sessionTokenCallback(sessionToken);
            }
        }
        XHR.send();
    }
    
}



window.onload = ():void => {
    const myFaceTecApp = new MyApp();
    myFaceTecApp.init();
    (window as any).MyFaceTecApp = myFaceTecApp;
}