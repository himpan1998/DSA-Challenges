function validateDto(ajvValidate: { (arg0: any): any; (arg0: any): any; errors: any; }) {
    return (req: { body: any; }, res: { setHeader: (arg0: string, arg1: string) => void; send: (arg0: { status: number; message: any; }) => void; end: () => void; }, next: () => void) => {
      const valid = ajvValidate(req.body);
      if (!valid) {
        // res.setHeader('Content-Type', 'text/json');
        const errors = ajvValidate.errors;
        res.send({
          status:400,
          message:errors
        })
        // res.status(400).json(errors);
        // res.end();
      }
      next();
    };
  }
  
  export default validateDto
  // module.exports = validateDto;