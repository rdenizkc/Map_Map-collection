import { LightningElement, track, wire } from 'lwc';
import getMap from '@salesforce/apex/ViolationController.getMap';
import VIOLATION_OBJ from '@salesforce/schema/Violation__c';
import COUNTRY_FIELD from '@salesforce/schema/Violation__c.Country__c';
import VIOLATION_TYPE_FIELD from '@salesforce/schema/Violation__c.Violation_Type__c';
import population from '@salesforce/apex/ViolationController.population';
import personCountViaCountry from '@salesforce/apex/ViolationController.personCountViaCountry';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';

export default class ViolationMap extends LightningElement {
    @track typeVal='';
    @track countryVal;
    @track mapMarkers = [];
    @track markersTitle;
    @track center = { latitude: 50.8503, longitude: 4.3517 };
    @track population;
    @track person;
    @track recordTypeId;
    @track countryOptions = [];
    @track Valoptions=[];

listView = 'visible';
    
    
    @wire(getObjectInfo, { objectApiName: VIOLATION_OBJ })
    wiredData({ error, data }) {
        if (data) {
            this.recordTypeId = data.defaultRecordTypeId;
        } else if (error) {
            console.error('Error fetching object info:', error);
        }
    }

    @wire(getPicklistValues, { fieldApiName: VIOLATION_TYPE_FIELD, recordTypeId: '$recordTypeId' })
    wiredViolationTypeValues({ error, data }) {
        if (data) {
            this.Valoptions = data.values.map(value => {
                return { label: value.label, value: value.value };
            });
        } else if (error) {
            console.error('Error fetching violation type picklist values:', error);
        }
    }
    
    @wire(getPicklistValues, { fieldApiName: COUNTRY_FIELD, recordTypeId: '$recordTypeId' })
    wiredPicklistValues({ error, data }) {
        if (data) {
            this.countryOptions = data.values.map(value => {
                return { label: value.label, value: value.value };
            });
        } else if (error) {
            console.error('Error fetching country picklist values:', error);
        }
    }

   
    handleTypeChange(event) {
        this.typeVal = event.target.value;
        this.updateMarkers();
    }

    handleCountryChange(event) {
        this.countryVal = event.target.value;
        this.updateMarkers();
    }

   
    clearInputs() {
        this.typeVal = '';
        this.countryVal = '';
        this.updateMarkers();
    }

    // Wire population data
    @wire(population)
    wiredPopulation({ error, data }) {
        if (data) {
            this.population = data;
        } else if (error) {
            console.error('Error fetching population:', error);
        }
    }

    // Wire person count data based on country and violation type
    @wire(personCountViaCountry, { country: '$countryVal', valType: '$typeVal' })
    wiredPersonCountViaCountry({ error, data }) {
        if (data) {
            this.person = data;
        } else if (error) {
            console.error('Error fetching person count:', error);
        }
    }

    // Update map markers
    updateMarkers() {
        getMap({ vType: this.typeVal, country: this.countryVal })
            .then(result => {
                this.mapMarkers = result.map(violation => {
                    return {
                        location: {
                            Country: violation.Country__c
                        },
                        title: violation.Country__c,
                       
                        description: `
                            <strong>Type: </strong> ${violation.Violation_Type__c} <br/>
                            <strong>Population: </strong> ${this.population}<br/>
                            <strong>Success Rate: </strong> ${violation.Successful__c}<br/>
                            Total Person: ${this.person}<br/>
                            Success Person: ${violation.Successful__c}

                        `
                    };
                });
            })
            .catch(error => {
                console.error('Error fetching violation map:', error);
            });
    }

    connectedCallback() {  
        this.updateMarkers();
    }
}

