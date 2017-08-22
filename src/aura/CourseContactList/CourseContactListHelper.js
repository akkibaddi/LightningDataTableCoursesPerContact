({
	deleteCourse : function(cmp,corId,rowIdx) {
		var action = cmp.get("c.deleteCourse");
        
        action.setParams({
            "corId":corId
        });
        
        action.setCallback(this,function(resp){
            var state = resp.getState();
            
            //if SUCCESS, delete the task row from the table
            if(cmp.isValid() && state === 'SUCCESS'){
                cmp.find("courseTable").deleteRow(rowIdx);
            }
            else{
                console.log(resp.getError());
            }
        });
        
        $A.enqueueAction(action);
	},
	closeCourseModal : function(cmp){
        //Hide the task modal once editing is done
        cmp.find("courseEditModal").close();
        
        //Reset the temporary variables
        cmp.set("v.rowIndex",-1);
        
        //Reset the selectedTask
        cmp.set("v.selectedCourse",{'sobjectType':'Course__c','Course_fees__c':'','Name':'', 'Courseid__c':'','Contact__c':''});
    }
})