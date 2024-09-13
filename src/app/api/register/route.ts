import { getServerAuthSession } from "~/server/auth"
import { db } from "~/server/db"



export async function POST(request: Request){

  const session= await getServerAuthSession()

  try {
    const {name, phoneNo,gender,dateOfBirth,address,emergencyContactName,emergencyContactNo}=await request.json()
    if(!session?.user.id){
      return Response.json(
        {
          success: false,
          message:"Not SignedIn"
        },{
          status:401
        }
      )
    }

    const response=await db.user.update({
      where:{
        email:session.user.email!
      },
      data:{
        name,
        phoneNumber:phoneNo,
        gender,
        dateOfBirth,
        address,
        emergencyContactName,
        emergencyContactPhone:emergencyContactNo
      }
    })

    if(response){
      return Response.json(
        {
          success: true,
          message: "Data Updated Succesfully"
        },{
          status:201
        }
      )
    }else {
      return Response.json(
        {
          success: false,
          message: "Error in updating your profile"
        },
        {
          status:401
        }
      )
    }
  } catch (error) {
    console.error("Error Updating User Profile",error);

    return Response.json(
      {
        success: false,
        message: "Server Error"
      },
    {
      status:500
    })
  }


}