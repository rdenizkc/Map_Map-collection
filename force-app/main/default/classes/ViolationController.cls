public with sharing class ViolationController {
    @AuraEnabled(cacheable=true)
    public static List<Violation__c> getMap(string vType, String country) {
        vType = (vType != null ? vType.trim() + '%' : null);
        country = (country != null ? country.trim() + '%' : null);

        String query = 'SELECT Country_Info__c, Violation_Type__c, Name__c, Victim__c, Description__c, Country__c, Date__c, Id, Name FROM Violation__c';
        String whereClause = '';

        if (vType != null && country == null) {
            // Sadece vType filtresi uygulanır
            whereClause = ' WHERE Violation_Type__c LIKE :vType';
        } else if (vType == null && country != null) {
            // Sadece country filtresi uygulanır
            whereClause = ' WHERE Country__c LIKE :country';
        } else if (vType != null && country != null) {
            // Hem vType hem de country filtreleri uygulanır
            whereClause = ' WHERE Violation_Type__c LIKE :vType AND Country__c LIKE :country';
        }

        query += whereClause + ' WITH SECURITY_ENFORCED ORDER BY Name__c';

        List<Violation__c> vioList = Database.query(query);
        
        return vioList;
    }

    @AuraEnabled(cacheable=true)
    public static Integer population() {
        List<Violation__c> vioList = [SELECT Id FROM Violation__c WITH SECURITY_ENFORCED];
        return vioList.size();
    }

    @AuraEnabled(cacheable=true)
    public static Integer personCountViaCountry(String country, String valType) {
        
        if (String.isNotBlank(country)) {

            if (String.isNotBlank(valType)) {
                List<Violation__c> vioList = [SELECT Id FROM Violation__c WHERE Country__c = :country AND Violation_Type__c = :valType WITH SECURITY_ENFORCED];
                return vioList.size();
            } else {
                List<Violation__c> vioList = [SELECT Id FROM Violation__c WHERE Country__c = :country WITH SECURITY_ENFORCED];
                return vioList.size();
            }
        } else if (String.isNotBlank(valType)) {
            List<Violation__c> vioList = [SELECT Id FROM Violation__c WHERE Violation_Type__c = :valType WITH SECURITY_ENFORCED];
            return vioList.size();
        } else {
           
            return 0; 
        }
    }
}
