public class CourseContactController {
    
    @AuraEnabled
    public static List<Contact> getContacts(){
        list<Contact> conList=[SELECT Id,Name FROM Contact];
        
        System.debug(conList);
        return conList;
    }
    
    @AuraEnabled
    public static List<Course__c> getCoursesOfContact(String contactId){
        return [select Contact__c,Course_fees__c,Course__c,Name from Course__c where Contact__c=:contactId];
    }  
    
    @AuraEnabled
    public static Course__c upsertCourse(Course__c cor){
        upsert cor;
        return cor;
    }
    /*
    @AuraEnabled
    public static void markTasksAsCompleted(List<Contact> cons){
        update cons;
    }
    */
    @AuraEnabled
    public static void deleteCourse(String corId){
        delete new Course__c(id=corId);
    }
    
}