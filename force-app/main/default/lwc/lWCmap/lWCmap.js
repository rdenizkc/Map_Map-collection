import { LightningElement, track, wire,api } from 'lwc';
import getMapOfData from '@salesforce/apex/LWCController.putMethod';
import putMethod from '@salesforce/apex/LWCController.putMethod';
import getMethod from '@salesforce/apex/LWCController.getMethod';
import EmailPreferencesStayInTouchReminder from '@salesforce/schema/User.EmailPreferencesStayInTouchReminder';


export default class LWCmap extends LightningElement {

    @track mapOfValues = [];
    @api SelectedMethodValues;
    value ;
    @api popUp = false;
    @api inpKey;
    @api inpVal;
    @api mapOfValues1=[];
    @api mapOfValue=false;
    @api count=0;
    @api notValue=false;
    @api putButton=false;
    @api getButton=false;
    @api getValue;
    @api getData=false;
    @wire(getMapOfData)
    mapOfData({data, error}) {
        if(data) {
            for(let key in data) {
                // Preventing unexcepted data
                if (data.hasOwnProperty(key)) { // Filtering the data in the loop
                    this.mapOfValues.push({value:data[key], key:key});
                }
            }
        }
        else if(error) {
            window.console.log(error);
        }
    }

    updateMap(){
        this.popUp=true;
        this.notValue=true;
        this.putButton=true;
        this.getButton=false;
    }
    
    inputKey(event){
        this.inpKey = event.detail.value;
        console.log('inpKey ===',this.inpKey);
    }

    inputValue(event){
        this.inpVal = event.detail.value;
        console.log('inpVal ===',this.inpVal);
    }
    
    async putClick(){
        this.count++;
        if(this.count>1){
            this.mapOfValues1=[];
        }
        let resultPut= await putMethod( {'key':this.inpKey,'value':this.inpVal });
       this.mapOfValues=false;
       this.popUp=false;
       this.mapOfValue=true;
       this.getData=false;
       for(let key in resultPut) {
        console.log('here loop start  ===');
        // Preventing unexcepted data
        if (resultPut.hasOwnProperty(key)) { // Filtering the data in the loop
            this.mapOfValues1.push({value:resultPut[key], key:key});

        }
    }
        
        console.log('putClick ===',resultPut);
    }

     getMap(){
        this.notValue=false;
        this.getButton=true;
        this.putButton=false;
        //this.mapOfValues=false;
       this.popUp=true;
        console.log('get method call  ===');
    }
    async getClick()
    {
        let result= await getMethod( {'key':this.inpKey});
        console.log('>>',result);
        this.getValue=result;
        //this.mapOfValues=false;
        this.getValue=result;
        this.mapOfValues=false;
        this.mapOfValue=false;
        this.getData=true;
        this.popUp=false; 

    }
}