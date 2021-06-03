public with sharing class TruckBus {
    @AuraEnabled(cacheable=true)
    public static List<Truck__c> getTruckList(String searchKey, String kay){
        String query = 'SELECT Id,Name,Image__c,Pick_Up__c,Drop_Up__c,Maximum_Load__c,Cost__c FROM Truck__c';
         system.debug('query---'+query);
       if ( searchKey != null && searchKey != '' && kay != null && Kay != '') {
           String key =  searchKey + '%';
           String keey = kay + '%';
           query += ' WHERE Pick_Up__c LIKE :key AND Drop_Up__c LIKE :keey' ;
       }
       return Database.query( query );
    }
}
