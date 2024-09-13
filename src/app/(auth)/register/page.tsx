'use client'
import React from 'react'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from 'zod'
import { registerSchema } from '~/schemas/registerSchema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { CalendarIcon } from "lucide-react"
import { Calendar } from '~/components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '~/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

import axios from "axios"



const register = () => {

  const form= useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues:{
      name:"",
      phoneNo:"",
      gender:"",
      // dateOfBirth:"",
      address:"",
      emergencyContactName:"",
      emergencyContactNo:""
    }
  })

  const onSubmit = async (data:z.infer<typeof registerSchema>)=>{

    try {
      const response= await axios.post('/api/register', data)
      console.log("The Response from Server",response)
    } catch (error) {

      console.error("Error while taking Profile Details",error);



    }

  }


  return (
    <>


      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Complete Your Registration
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8' >
          <FormField
            name='name'
            control={form.control}
            render={({field})=>(
              <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                  <Input placeholder='Name' {...field}></Input>
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
          />

          <FormField
            name='phoneNo'
            control={form.control}
            render={({field}) =>(
              <FormItem>
                <FormLabel>Mobile No</FormLabel>
                <FormControl>
                    <Input placeholder='Mobile No' {...field}></Input>
                </FormControl>
                <FormMessage/>
              </FormItem>
              )}
          />


          <FormField
                    name="address"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Input placeholder="address" {...field}  />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
          <FormField
          name="dateOfBirth"
          control={form.control}

          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 m-10" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    captionLayout='dropdown'
                    fromYear={1960}
                    toYear={2024}


                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
 name="gender"
          control={form.control}

          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Please Select a Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
            name='emergencyContactName'
            control={form.control}
            render={({field}) =>(
              <FormItem>
                <FormLabel>Emergency Contact Person</FormLabel>
                <FormControl>
                    <Input placeholder='Name' {...field}></Input>
                </FormControl>
                <FormMessage/>
              </FormItem>
              )}
          />


          <FormField
            name='emergencyContactNo'
            control={form.control}
            render={({field}) =>(
              <FormItem>
                <FormLabel>Emergency Contact Number</FormLabel>
                <FormControl>
                    <Input placeholder='Mobile Number' {...field}></Input>
                </FormControl>
                <FormMessage/>
              </FormItem>
              )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

    </div>



    </>
  )
}


export default register