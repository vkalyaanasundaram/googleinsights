import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';
import { motion } from 'framer-motion'
import { useForm } from "react-hook-form"
import { contactstate, connect, contactusForm } from '../variables/data'
import { Base64 } from 'js-base64'

const Contactform = ( { entry_id, refill, credentials } ) => {
  const router = useRouter()
  const [entryid, setEntryId] = useState(0)
  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm({
    reValidateMode: 'onChange',
  });

  const auth = Base64.btoa(`${credentials.user}:${credentials.password}`);
  let config = { headers: { 'authorization': `${auth}` } }
  let requestForm = {}
    
  useEffect(() => {
    setEntryId(entry_id || '')
  }, [entry_id])

  const onSubmit = (data) => {

    contactusForm.map((item, i) => {
      if(data[item.name] !== '' ) {
        requestForm[item.id] = data[item.name]
      }
    })
    requestForm.form_id = 33 //form id
    requestForm.entry_id = entryid //entry id
    axios
    .post('https://stagingdev-kap.com/gravityform.php', {"form_data": requestForm}, config)
    .then(response => {
      if(response.data) {
        console.log('re -' + response.data )
        router.push('/fast-application-thank-you')
        //document.getElementById("entry_id").value = response.data
        //document.getElementById("form1").innerHTML = 'Thank you for submitting the form'
      }
    });
  }
  
  const handleBlur = (event) => {
    
    let formData = {}
    if(event.target.value) {
      contactusForm.map((item, i) => {
        if(item.name == event.target.name) {
          formData[item.id] = event.target.value
        }
      })
      formData.form_id = 33 //form id
      if(entryid)
        formData.entry_id = entryid //entry id
      axios
      .post('https://stagingdev-kap.com/gravityform.php', {"form_data": formData}, config)
      .then(response => {
        console.log(response)
        if(response.data !== '' && !isNaN(response.data)) {
          console.log('first -' + response.data)
          setEntryId(response.data)
        }
        else {
          console.log(response.data)
        }
      });
    }
    trigger(event.target.name)
  }

  return (
      <form name="gform" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <p className="mt-3 relative text-kapitus z-0 w-full">
          Whether you want to learn more about our financing options, are interested in becoming a partner or just have a general question, we’re here to help! Simply fill out the form below and we’ll get it directly into the inbox of the right person. 
        </p>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div className="grid-cols-1 relative">
          <input type="text" placeholder="First Name*" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  placeholder-kapitus" {...register("first_name", { required: true  })} onBlur={event => handleBlur(event)} />
            {errors.first_name?.type === 'required' && (<span className="text-errorred m-2">First Name is Required<span className="error" /></span>)}
            {watch("first_name") && typeof errors.first_name?.type == 'undefined' && <span className="success"></span>}
        </div>
        <div className="grid-cols-1 relative">
            <input type="text" placeholder="Last Name*" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 placeholder-kapitus" {...register("last_name", { required: true  })} onBlur={event => handleBlur(event)} />
              {errors.last_name?.type === 'required' && (<span className="text-errorred m-2">Last Name is Required<span className="error" /></span>)}
              {watch("last_name") && typeof errors.last_name?.type == 'undefined' && <span className="success"></span>}
          </div>
          <div className="grid-cols-1 relative">
            <input type="email" placeholder="Email*" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 placeholder-kapitus" {...register("email_address", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i  })} onBlur={event => handleBlur(event)} />
              {errors.email_address?.type === 'required' && (<span className="text-errorred m-2">Email is Required <span className="error" /></span>)}
              {errors.email_address?.type === 'pattern' && (<span className="text-errorred">Email is Invalid.<span className="error" /></span>)}
              {watch("email_address") && typeof errors.email_address?.type == 'undefined' && <span className="success"></span>}
        </div>
        <div className="grid-cols-1 relative">
          <select id="14" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 placeholder-kapitus" {...register("state", { required: true  })} onBlur={event => handleBlur(event)}>
            <option value="">State</option>
              {contactstate.map((option, i) =>
            <option value={option} key={i}>{option}</option>)}
          </select>
            {errors.state?.type === 'required' && (<span className="text-errorred m-2">State is Required<span className="error" /></span>)}
            {watch("state") && typeof errors.state?.type == 'undefined' && <span className="success"></span>}
        </div>
        <div className="grid-cols-1 relative">
          <input type="text" placeholder="Company (optional)" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none placeholder-kapitus" {...register("company")} onBlur={event => handleBlur(event)} />
        </div>
        <div className="grid-cols-1 relative">
          <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 placeholder-kapitus" {...register("connect", { required: true  })} onBlur={event => handleBlur(event)}>
          <option value="">I Want to connect With ... *</option>
          {connect.map((option, i) =>
          <option value={option} key={i}>{option}</option>)}
          </select>
            {errors.connect?.type === 'required' && (<span className="text-errorred m-2">This Field is Required<span className="error" /></span>)}
            {watch("connect") && typeof errors.connect?.type == 'undefined' && <span className="success"></span>}
        </div>
        <div className="grid-cols-1 relative">
          <textarea type="textarea" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 placeholder-kapitus" {...register("message", { required: true  })} onBlur={event => handleBlur(event)}></textarea>
            {errors.message?.type === 'required' && (<span className="text-errorred m-2">Message is Required<span className="error" /></span>)}
            {watch("message") && typeof errors.message?.type == 'undefined' && <span className="success"></span>}
        </div>
        <div className="grid-cols-2 sm:grid-cols-3">
          <motion.input whileTap={{ scale: 0.9 }} className="h-12 w-full text-white rounded bg-kapitus hover:bg-green-700 transition duration-900 ease-in-out" type="submit" />
        </div>
        </div>
        </form>
    )
}
export default Contactform;