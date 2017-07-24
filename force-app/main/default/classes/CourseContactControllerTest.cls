@isTest
public class CourseContactControllerTest {
@isTest
    public static void ContactCourseFactory(){
        list<contact> contactToBeInserted=new list<contact>();     
        for(integer i=0;i<100;i++){
            contact c=new contact();
            c.LastName='test'+i;
			contactToBeInserted.add(c);            
        }
        insert contactToBeInserted;
        list<course__c> coursesToBeInserted=new list<course__c>();
        for(integer i=0;i<100;i++){
       	 	course__c cou=new course__c();
        	cou.contact__c=contactToBeInserted[0].id;
            cou.Course_fees__c=100;
            cou.Courseid__c='124'+i;
            cou.Name='test'+i;
        coursesToBeInserted.add(cou);
            }
        insert coursesToBeInserted;
    
     CourseContactController.getContacts();
        list<Course__c> corList= CourseContactController.getCoursesOfContact(contactToBeInserted[0].id);
        System.assertEquals(corList.size(), 100);
        
        course__c course=coursesToBeInserted[0];
        course.Course_fees__c=200;
        CourseContactController.upsertCourse(course);
        CourseContactController.deleteCourse(course.id);
        
        
       
    }    
    

}