public with sharing class CountryController {
    @AuraEnabled(cacheable=true)
    public static List<Country__c> getCountries() {
        return [SELECT Id, 
        name__c, 
        latitude__c,
        longitude__c 
         FROM country__c];
    }
}