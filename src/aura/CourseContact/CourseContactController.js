({
	doInit : function(cmp, event, helper) {
    	var action = cmp.get("c.getContacts");
        
        action.setCallback(this,function(resp){
            var state = resp.getState();
            if(cmp.isValid() && state === 'SUCCESS'){
                cmp.set("v.contacts",resp.getReturnValue());
            }
            else{
                console.log(resp.getError());
            }
        });
        
        $A.enqueueAction(action);
    }
})