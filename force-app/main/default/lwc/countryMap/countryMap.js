import { LightningElement, track, wire } from 'lwc';
import getCountries from '@salesforce/apex/CountryController.getCountries';

export default class CountryMap extends LightningElement {
    @track mapMarkers = [];
    @track markersTitle = 'Countries';
    @track isModalOpen = false;
    @track reportId = '00O5w00000A3b9M'; // Raporun gerçek Id'sini burada ayarlayın

    get reportUrl() {
        return `/lightning/r/Report/${this.reportId}/view?queryScope=userFolders`;
    }

    @wire(getCountries)
    wiredCountries({ error, data }) {
        if (data) {
            this.mapMarkers = data.map(country => {
                return {
                    location: {
                        Latitude: country.latitude__c,
                        Longitude: country.longitude__c
                    },
                    title: country.name__c
                };
            });
            console.log('Map Markers: ', this.mapMarkers);
        } else if (error) {
            console.error('Error fetching countries: ', error);
        }
    }

    handleShowModal() {
        this.isModalOpen = true;
    }

    handleCloseModal() {
        this.isModalOpen = false;
    }
}

