import {FaceTecSDK} from '../core-sdk/FaceTecSDK.js/FaceTecSDK';
import type { FaceTecSessionResult,FaceTecFaceScanResultCallback,FaceTecFaceScanProcessor} from '../core-sdk/FaceTecSDK.js/FaceTecPublicApi';
import { Config } from '../Config';
import { LivenessCheckProcessor } from '../processors/LivenessCheckProcessor';

export class MyApp {
    
    //init
    public init = ():void => {
        FaceTecSDK.setResourceDirectory("../core-sdk/FaceTecSDK.js/resources");
        FaceTecSDK.setImagesDirectory("../core-sdk/FaceTec_images");

        //initialize FaceTecSDK
        FaceTecSDK.initializeInDevelopmentMode(Config.DeviceKeyIdentifier, Config.PublicFaceScanEncryptionKey, 
            function(inicializationSuccessfull:boolean){
                console.log("Iniciation Successfull: " + inicializationSuccessfull);

            }
        );
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