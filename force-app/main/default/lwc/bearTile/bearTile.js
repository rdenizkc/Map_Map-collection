import { LightningElement, api } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
export default class BearTile extends LightningElement {
	@api bear;
	appResources = {
		bearSilhouette: `${ursusResources}/standing-bear-silhouette.png`,
	};

	handleOpenRecordClick() {
		/* The handleOpenRecordClick function is called when a user clicks on the open record button of a bear tile.
The function creates and fires a custom bearview event that holds the bear record id.*/ 
		const selectEvent = new CustomEvent('bearview', {
			detail: this.bear.Id
		});
		this.dispatchEvent(selectEvent);
	}
}