import { Response, Request } from 'express'

export default async function gen_location(req: Request, res: Response) {
    res.status(200).json({ msg: "generated sucessfully sucessfull", sucess: true });
}
