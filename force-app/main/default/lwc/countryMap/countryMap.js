import { LightningElement, track, wire } from 'lwc';
import getCountries from '@salesforce/apex/CountryController.getCountries';

export default class CountryMap extends LightningElement {
    @track mapMarkers = [];
    @track markersTitle = 'Countries';
    @track isModalOpen = false;
    @track reportId = '00O5w00000A3b9M'; // Set the actual Report Id here
    @track searchKey = '';

    get reportUrl() {
        return `/lightning/r/Report/${this.reportId}/view?queryScope=userFolders`;
    }

    @wire(getCountries, { searchKey: '$searchKey' })
    wiredCountries({ error, data }) {
        if (data) {
            this.mapMarkers = data.map(country => {

                let iconClass = 'custom-marker-blue';
                if (country.Successful__c <= 50) {
                    iconClass = 'custom-marker-green';
                }

                return {
                    location: {
                        Latitude: country.latitude__c,
                        Longitude: country.longitude__c
                    },

                    icon: iconClass,

                    title: country.name__c,

                    description: `
                        <strong>Type: </strong> ${country.Type__c} <br/>
                        <strong>Population: </strong> ${country.Total_Person__c}<br/>
                        <strong>Success Rate: </strong> ${country.Successful__c}<br/>
                        Total Person: ${country.Total_Person__c}
                        Success Person: ${country.Successful__c}
                    `
                };
            });
            console.log('Map Markers: ', this.mapMarkers);
        } else if (error) {
            console.error('Error fetching countries: ', error);
        }
    }

    handleChange(event) {
        this.searchKey = event.target.value;
    }

    handleShowModal() {
        this.isModalOpen = true;
    }

    handleCloseModal() {
        this.isModalOpen = false;
    }
}
