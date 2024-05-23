public inherited sharing class LwcController {
    // Constructor method, you can add logic if needed
    LWCController() {
    }

    // Method to put key-value pair into a map and return the map
    @AuraEnabled(cacheable=true) 
    public static Map<Integer, String> putMethod(Integer key, String value) { 
        Map<Integer, String> mapOfValues = new Map<Integer, String>();
        mapOfValues.put(1, 'Delhi');
        mapOfValues.put(2, 'Noida');
        mapOfValues.put(3, 'Gurugram');
        mapOfValues.put(key, value);
        return mapOfValues;
    }

    // Method to get value from the map based on the key
    @AuraEnabled(cacheable=true) 
    public static String getMethod(Integer key) {
        Map<Integer, String> mapData = new Map<Integer, String>{
            1 => 'Delhi',
            2 => 'Noida',
            3 => 'Gurugram'
        };
        String City = mapData.get(key);
        return City;
    }
}
