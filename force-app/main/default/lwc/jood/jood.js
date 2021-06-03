import { LightningElement ,api, wire, track} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getTruckList from '@salesforce/apex/TruckBus.getTruckList';
export default class Jood extends LightningElement {
   @track columns = [ 
        
        {
            label: 'Truck_name',
            fieldName: 'Name',
            type: 'text',
            sortable: true
        },
        {
            label: 'Pick_Up',
            fieldName: 'Pick_Up__c',
            type: 'text',
            actions: [
                { label: 'All', checked: true, name:'all' },
                { label: 'Published', checked: false, name:'show_published' },
                { label: 'Unpublished', checked: false, name:'show_unpublished' }
            ]
            
        },
        {
            label: 'Images',
            fieldName: 'Images__c',
            type: 'formula',
        },
        {
            label: 'Drop_Up',
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
    @api searchKey = '';
    @api kay='';
    
    @wire(getTruckList, {searchKey: '$searchKey', kay: '$kay'}) 
    
    wiredTrucks({error,data}) {
        if (data) {
        
            console.log(data);
            this.data = data;
        } else if (error) {
            this.error = error;
            console.log(error);
        } else {
            console.log('hello')
        }
    }
    getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++){
            alert("You selected: " + selectedRows[i].Name);
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
    // handleHeaderAction(event) {
    //     // Retrieves the name of the selected filter
    //     const actionName = event.detail.action.name;
    //     // Retrieves the current column definition
    //     // based on the selected filter
    //     const colDef = event.detail.columnDefinition;
    //     const columns = this.columns;
    //     const activeFilter = this.activeFilter;
    
    //     if (actionName !== activeFilter) {
    //         var idx = columns.indexOf(colDef);
    //         // Update the column definition with the updated actions data
    //         var actions = columns[idx].actions;
    //         actions.forEach((action) => {
    //             action.checked = action.name === actionName;
    //         });
    //         this.activeFilter = actionName;
    //         this.updateBooks();
    //         this.columns = columns;
    //     }
    // }
    // updateBooks(cmp) {
    //     const rows = this.rawData;
    //     const activeFilter = this.activeFilter;
    //     const filteredRows = rows;
    //     if (activeFilter !== 'all') {
    //         filteredRows = rows.filter(function (row) {
    //             return (activeFilter === 'P' || (activeFilter === 'show_unpublished'));
    //         });
    //     }
    //     this.data = filteredRows;
    // }

   
    


    // callRowaction(event){
    //     var count=0;
    //     const row = event.detail.row;
    //     this.record = row;
    //     this.bShowModal = true;
    //    }

       handleSelect(){
        this.show = true;
    }

    // navigatePrevious(event){
    //     this.show = false;
    //     this.bShowModal = false;
    // }
}