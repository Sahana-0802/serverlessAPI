// events - holds request details/incoming data to the lambda/body in postman

const { postHandler } = require("./handler/postHandler");

// context - aws config/api gateway and lambda specific details/region of lambda(us-east etc)
module.exports.handler = async(events, context) => {
    
    const endpoint = events.pathParameters?.proxy;
    try{
    switch (endpoint){
        case 'posts':{
            return await postHandler()
        }
        default:{
            return{
                statusCode:404,
                body:JSON.stringify("Not found"),
                // headers:
            };
        }
    }
} catch(error){
    return{
        statusCode: 500,
        body: JSON.stringify('Error - In Catch block')
    }
}
};
