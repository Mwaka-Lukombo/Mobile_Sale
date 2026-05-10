import { sender,mailtrapClient } from "./configMailtrap.js"
import { REQUEST_FORGET_EMAIL, SUCCESSFUL_RESET_PASSWORD } from "./templatesMails.js";




export const sendForgetEmail = async (email,link) => {

     try {

        const recepient = [
            {email}
        ];
        
        const response = await mailtrapClient.send({
            from:sender,
            to:recepient,
            subject:"Forget Password",
            html:REQUEST_FORGET_EMAIL.replace('{url}',link),
            category:"Forget Request Email"
        });

        console.log(`sendRequest: ${response.message_ids}`);
     } catch (error) {
        console.log(`Error in sendForgetEmail`);
     }
    
}

export const sendSuccessEmail = async (email)=>{
    const recepient = [{email}]
    
    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recepient,
            subject:"Password Changed Successful",
            html:SUCCESSFUL_RESET_PASSWORD,
            category:"SuccessFully password reset"
        })
    } catch (error) {
        console.log("Error in to congrates change password",error.message);
    }
}




