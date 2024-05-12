// await schema.parseAsync(req.body) is the line where you use zod to validate
//the request body data against the defined schema

/*-- 
    given anu Zod schema, you can call its .parse method to check data is valid
    If it is, a value is returned with full type information! otherwise, an error is thrown.
--*/

const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body  = parseBody;
        next();
    } catch (err) {
        const status = 422;
       const message = "Fill the input properly";
       const extraDetails = err.errors[0].message;

        const error = { 
            status,
            message,
            extraDetails,
        };
        console.log(error);
    }
}

module.exports = validate;