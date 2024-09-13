import {date, string, z}  from "zod"


export const registerSchema = z.object({
    name: string().min(5),
    phoneNo: string().length(10,{message:"Must be 10 Digits"}).regex(/^\d{10}$/),
    gender: string(),
    dateOfBirth: date(),
    address: string().min(10,{message:"Minimum 10 Characters Long"}).max(100,{message: "Max 100 Characters Long"}),
    emergencyContactName: string().min(3,{message:"Minimum 3 Characters"}),
    emergencyContactNo: string().length(10,{message: "Must be 10 Digits"}).regex(/^\d{10}$/),
})

