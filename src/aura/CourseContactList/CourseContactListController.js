({
    fetchCourses : function(cmp,event,helper) {
        var action = cmp.get("c.getCoursesOfContact");
        
        //Column data for the table
        var courseColumns = [
            {
                'label':'Course Name',
                'name':'Name',
                'type':'reference',
                'value':'Id'
            },
            {
                'label':'Course Fees',
                'name':'Course_fees__c',
                'type':'currency'
            },
             {
                'label':'Course id',
                'name':'Courseid__c',
                'type':'String'
            },
        ];
        
        //Configuration data for the table to enable actions in the table
        var courseTableConfig = {
            "massSelect":true,
            "searchBox":true,
            "searchByColumn":true,
            "globalAction":[
                {
                    "label":"Add Course",
                    "type":"button",
                    "id":"addCourse",
                    "class":"slds-button slds-button--neutral"
                },
               
            ],
            "rowAction":[
                {
                    "label":"Edit",
                    "type":"url",
                    "id":"editCourse"
                },
                {
                    "label":"Del",
                    "type":"url",
                    "id":"delCourse"
                },
              
              
                
            ]
            
        };  
        
        if(cmp.get("v.contactId")){
            
            action.setParams({
                "contactId":cmp.get("v.contactId")
            });
            
            action.setCallback(this,function(resp){
                var state = resp.getState();
                if(cmp.isValid() && state === 'SUCCESS'){
                    //pass the records to be displayed
                    cmp.set("v.contactCourses",resp.getReturnValue());
                    
                    //pass the column information
                    cmp.set("v.courseColumns",courseColumns);
                    
                    //pass the configuration of task table
                    cmp.set("v.courseTableConfig",courseTableConfig);
                    
                    //Workaround to solve the timing issue when rendering
                    window.setTimeout($A.getCallback(function(){
                        //initialize the datatable
                        cmp.find("courseTable").initialize();
                    }),500);
                    
                }
                else{
                    console.log(resp.getError());
                }
            });
            
            $A.enqueueAction(action);
        }
    },
    //method is invoked when click happens in edit,delete link is clicked on a row;
    //Add task and Complete task button.
    tabActionClicked : function(cmp,event,helper){
        
        //get the id of the action being fired
        var actionId = event.getParam('actionId');
        
        if(actionId == 'editCourse'){
            //get the row where click happened and its position 
            var rowIdx = event.getParam("index");
            var clickedRow = event.getParam('row');
            
            //store the row and its position will for editing
            cmp.set("v.rowIndex",rowIdx);
            cmp.set("v.selectedCourse",clickedRow);
            
            //set the type of task operation being done
            cmp.set("v.courseOpType",'Edit');  
            
            //Now,lets open the task modal
            cmp.find("courseEditModal").open();
        }
        else if(actionId == 'addCourse'){
            //set the type of task operation being done
            cmp.set("v.courseOpType",'Add'); 
            
            //Now,lets open the task modal
            cmp.find("courseEditModal").open();
        }
        else if(actionId == 'delCourse'){
            //get the row where click happened and its position 
            var rowIdx = event.getParam("index");
            var clickedRow = event.getParam('row');
            
            //Call the deletTask method in the helper
            helper.deleteCourse(cmp,clickedRow.Id,rowIdx);
        }    
    },
      saveCourse:function(cmp,event,helper){
        var action = cmp.get("c.upsertCourse");
        var course=cmp.get("v.selectedCourse");
        var selectedConId = cmp.get("v.contactId");
        
        if(selectedConId){
            
            //set the Project lookup field of the task 
            course.Contact__c = selectedConId;
            
            action.setParams({
                "cor":course
            });
            
            action.setCallback(this,function(resp){
                var state = resp.getState();
                if(cmp.isValid() && state === 'SUCCESS'){
                    
                    //if operation is add, then add the task row to the table
                    if(cmp.get("v.courseOpType") == 'Add'){
                        cmp.find("courseTable").addRow(resp.getReturnValue());
                    }
                    else{
                        var rowIdx = cmp.get("v.rowIndex");
                        // if operation is edit, then update the row in the table
                        cmp.find("courseTable").updateRow(rowIdx,course); 
                    }
                    
                    helper.closeCourseModal(cmp);
                }
                else{
                    console.log(resp.getError());
                }
            });
            
            $A.enqueueAction(action);
        }
        
    },
    closeCourseModal : function(cmp,event,helper){
        helper.closeCourseModal(cmp);
    }
   
})