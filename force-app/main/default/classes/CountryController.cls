public with sharing class CountryController {
    @AuraEnabled(cacheable=true)
    public static List<Country__c> getCountries(string searchKey) {
       
        searchKey =  searchKey + '%';
        if(searchKey.trim().length()>0){
        return [SELECT Id,
         latitude__c,
          name__c,
           longitude__c, 
           Type__c, 
           Successful__c, 
           Total_Person__c 
        FROM country__c
        WHERE  Type__c LIKE :searchKey
        WITH SECURITY_ENFORCED
        ORDER BY name__c
       
        ];
   }else{
    return [SELECT Id, latitude__c, name__c, longitude__c, Type__c, Successful__c, Total_Person__c
     FROM country__c
     WITH SECURITY_ENFORCED
     ORDER BY name__c
     ];
   } }
}