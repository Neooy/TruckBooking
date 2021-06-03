import { LightningElement, wire, api, track} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getTruckList from '@salesforce/apex/TruckBus.getTruckList';

const columns = [{
        label: 'Truck Name',
        fieldName: 'Name',
        type: 'text',
        sortable: true
    },
    {
        label: 'Pick Up',
        fieldName: 'Pick_Up__c',
        type: 'text',
    
    },
    {
        label: 'Image',
        fieldName: 'Image__c',
        type: 'image',
    
    },
    {
        label: 'Drop Up',
        fieldName: 'Drop_Up__c',
        type: 'text',
    
    },
    {
        label: 'Maximum Load',
        fieldName: 'Maximum_Load__c',
        type: 'number',
        
    },
    {
        label: 'Cost',
        fieldName: 'Cost__c',
        type: 'currency',
        
    }
    
];

export default class Sear extends LightningElement {
    @track value;
    @track error;
    @track data;
    @api searchKey = '';
    @api kay='';
    result;
    
    @track data = []; 
    @track columns
  
    @wire(getTruckList, {searchKey: '$searchKey' , kay: '$kay'})
    wiredAccounts({ error, data }) {
        if (data) {
        
            this.data = data; 
            this.columns = columns;
            console.log(data);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    //clicking on previous button this method will be called
    previousHandler() {
        if (this.page > 1) {
            this.page = this.page - 1; //decrease page by 1
            this.displayRecordPerPage(this.page);
        }
    }

    //clicking on next button this method will be called
    nextHandler() {
        if((this.page<this.totalPage) && this.page !== this.totalPage){
            this.page = this.page + 1; //increase page by 1
            this.displayRecordPerPage(this.page);            
        }             
    }

    
    handleKeyChanges( event ) {
        this.kay = event.target.value;
        return refreshApex(this.result);
    }
    
   
  
    handleKeyChange( event ) {
        this.searchKey = event.target.value;
        return refreshApex(this.result);
    }

}