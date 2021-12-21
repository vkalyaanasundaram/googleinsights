import React, { useContext, useState, useEffect, useRef } from 'react'
import { aboutUs, equipIndustries, states, days, months, years, entities, creditScores, equipFastApp } from '../variables/data'
import { useRouter } from "next/router";
import axios from 'axios'
import Image from 'next/image'
import Currencyformat from "../formatter/currencyformat"
import Taxformat from '../formatter/taxid'
import Phoneformat from '../formatter/phonenumber'
import SSNformat from '../formatter/ssnformat'
import { useForm } from "react-hook-form"
import { Base64 } from 'js-base64'
import Termscondition from "./termscondition";
import useForceUpdate from 'use-force-update';
import SignatureCanvas from 'react-signature-canvas'

const EquipmentFastApp = ({ credentials, fieldData }) => {
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [signature, setSignature] = useState(Object.freeze({}));
  const [fund, setFund] = useState("")
  const [phone, setPhone] = useState("")
  const [taxid, setTaxid] = useState("");
  const [revenue, setRevenue] = useState("")
  const [ssn, setSSN] = useState("");
  const router = useRouter();
  let padRef = useRef({})
  const forceUpdate = useForceUpdate();
  const [fileerror, setFileError] = useState("");
  const [signerror, setSignError] = useState("");

  let preloadedValues = { business_name: fieldData?.business_name, first_name: fieldData?.first_name, last_name: fieldData?.last_name, email_address: fieldData?.email_address, industry: fieldData?.industry, business_month: fieldData?.month, business_day: fieldData?.day, business_year: fieldData?.year}
  
  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm({
    defaultValues: preloadedValues
  });
  let requestForm = {}

  useEffect(() => {
    setFund(fieldData?.fund || '')
    setPhone(fieldData?.phone_number || '')
    setRevenue(fieldData?.annual_revenue || '')
  }, [fieldData?.fund, fieldData?.phone_number, fieldData?.annual_revenue])

  const customvalidation = () => {
    let isValid = true
    if(multipleFiles.length == 0){
      setFileError('Please upload the file')
      isValid = false
    }
    else {
      setFileError('')
    }
    if(Object.keys(signature).length == 0){
      setSignError('Please enter your Signature')
      isValid = false
    }
    else {
      console.log(signature)
      setSignError('')
    }
    return isValid
  }

  const onSubmit = data => {
    console.log(data)
    const isValid = customvalidation()
    if(!isValid)
    return false

    data.fund = fund.replace('$','')
    data.annual_revenue = revenue.replace('$','')
    data.personal_phone_number = phone
    data.tax_id = taxid
    data.ssn = ssn
    equipFastApp.map((item, i) => {
      //console.log(item.name)
      if(typeof item.name == 'object'){
        let date = ''
        item.name.map((item1, i) => {
          if(data[item1] !== ''){
            date += data[item1]+'/'
          }
        })
        if(date !== ''){
          requestForm[item.id] = date.slice(0, -1); 
        }
      }
      else if(data[item.name] !== '' ) {
        requestForm[item.id] = data[item.name]
      }
    })

    requestForm.form_id = 27 //form id
    //requestForm[85] = window.location.href //full path embed url
    const auth = Base64.btoa(`${credentials.user}:${credentials.password}`);
    let config = { headers: { 'authorization': `${auth}` } }
    console.log(requestForm)
    console.log(signature)
    axios
      //.post('https://stagingdev-kap.com/gravityform.php', {"formData": requestForm},'fileData': multipleFiles, 'signature': signature}, config)
      .post('https://stagingdev-kap.com/nextjs/applynow.php', {"formData": requestForm, 'fileData': multipleFiles, 'signature': signature}, config)
      .then(response => {
        console.log(response)
        if(!isNaN(response.data) && response.data !== '') {
          console.log('first -' + response.data)
          router.push('/fast-application-thank-you')
        }
        else {
          console.log(response.data)
        }
      });
  }

  const handleClear = (event, padRef) => {
    
    if(signature[event.target.name])
      delete signature[event.target.name]
    padRef.current.clear();
  }

  const handleClick = (e) => {
    multipleFiles.splice(e.target.id, 1);
    forceUpdate();
  }

  const handleChange = (event, signPad=null) => {

    if(signPad !== null) { // To Upload the signature image
      console.log(event.target.id)
      setSignature({
        ...signature,
        [event.target.id] : {"id": event.target.id, "sign": signPad.current.toDataURL()}
      })
    }
    if(event.target.type == 'file') { // the condition is used for upload the files
      let files = event.target.files[0]
      let reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = (e)=> {
        setMultipleFiles([
          ...multipleFiles,
          {"id": 41, "name": files.name, "type": files.type, "size": files.size, "files": e.target.result},
        ]);
      }
    }
    else if(event.target.name == 'fund') {
      // this is where we'll call the Currencyformat function
      const formattedFund = Currencyformat(event.target.value);
      // we'll set the input value using our setFund
      setFund(formattedFund)
    }    
    else if(event.target.name == 'personal_phone_number'){
      // this is where we'll call the Phoneformat function
      const formattedPhoneNumber = Phoneformat(event.target.value);
      // we'll set the input value using our setPhone
      setPhone(formattedPhoneNumber)
    }
    else if(event.target.name == 'annual_revenue') {
      // this is where we'll call the Currencyformat function
      const formattedFund = Currencyformat(event.target.value);
      // we'll set the input value using our setFund
      setRevenue(formattedFund)
    }
    else if(event.target.name == 'tax_id'){
      // this is where we'll call the Taxformat function
      const formattedTaxid = Taxformat(event.target.value )
      // we'll set the input value using our setTaxid
      setTaxid(formattedTaxid)
    }
    else if(event.target.name == 'ssn'){
      // this is where we'll call the SSNformat function
      const formattedSSN = SSNformat(event.target.value);
      // we'll set the input value using our setSSN
      setSSN(formattedSSN)
    }
  }

  const handleBlur = (event) => {

    trigger()
  }

  return (
    <div className="max-w-4xl m-auto bg-white p-8">
    <hr className="divide-y border-1 border-lightgreen" />
    <div className="mb-6 text-center text-kapitus text-lg my-6 font-bold">BUSINESS INFORMATION</div>
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" autoComplete="off">
    <div className="grid grid-cols-2 gap-4 max-w-4xl m-auto">
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 p-2 h-12 font-semibold text-liteblue placeholder-liteblue text-liteblue text-lg w-full" {...register("fund", { required: fund ? false:true })} placeholder="How much funding do you need?" value={fund} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} />
        {errors.fund?.type === 'required' && (<span className="text-errorred m-2">Fund Needed is Required</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <select className="border-solid border-gray-300 border-2 p-2 h-12 font-semibold text-liteblue placeholder-liteblue text-liteblue text-base w-full" {...register("industry", { required: true })}>
        <option value="">Industry</option>
        {equipIndustries.map((item, i) =>
        <option value={item} className="capitalize" key={`${i}industry`}>{item}</option>
        )}
        </select>
        {errors.industry?.type === 'required' && (<span className="text-errorred m-2">Use of fund is required</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 p-2 h-12 font-semibold text-liteblue placeholder-liteblue text-lg w-full" {...register("business_name", { required: true })} placeholder="DBA (Business Name)" />
        {errors.business_name?.type === 'required' && (<span className="text-errorred m-2">Business Name is required</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 p-2 h-12 font-semibold text-liteblue placeholder-liteblue text-lg w-full" {...register("annual_revenue", { required: revenue ? false : true })} placeholder="Annaual Revenue" value={revenue} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} />
        {errors.annual_revenue?.type == 'required' && (<span className="text-errorred m-2">Annual Revenue is Required</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 p-2 h-12 font-semibold text-liteblue placeholder-liteblue text-lg w-full" {...register("business_address", { required: true })} placeholder="Business Address" />
      </div>
      <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
        <input type="text" className="border-solid border-gray-300 border-2 p-2 h-12 font-semibold text-liteblue placeholder-liteblue text-lg w-full md:w-34" {...register("business_city", { required: true })} placeholder="City" />
        <select className="border-solid border-gray-300 border-2 h-12 text-base w-full md:w-34" {...register("business_state", { required: true })}>
        <option value="">State</option>
        {states.map((state, i) =>
          <option value={state} key={`bstate${i}`}>{state}</option>
        )}
        </select>
      </div>
      <div className="col-span-2 md:col-span-1 space-x-3 w-full">
        <input type="text" className="border-solid border-gray-300 border-2 p-2 h-12 font-semibold text-liteblue placeholder-liteblue text-lg w-full" {...register("business_zip", { required: true, pattern: /(^\w{5}$)|(^\w{5}-\w{4}$)/ })} placeholder="ZIP / Postal Code" maxLength="5" />
        {(errors.business_address?.type === 'required' || errors.business_city?.type === 'required' || errors.business_state?.type === 'required' || errors.business_zip?.type === 'required' || errors.business_zip?.type === 'pattern') && (<span className="text-errorred m-2">This field is required. Please complete the following fields:</span>)}
        {errors.business_address?.type === 'required' && (<span className="text-errorred m-2">Street Address,</span>)}
        {errors.business_city?.type === 'required' && (<span className="text-errorred m-2">City,</span>)}
        {errors.business_state?.type === 'required' && (<span className="text-errorred m-2">State / Province,</span>)}
        {(errors.business_zip?.type === 'required' || errors.business_zip?.type === 'pattern' ) && (<span className="text-errorred m-2">ZIP / Postal Code.</span>)}
      </div>
      <div className="col-span-2 md:col-span-1 space-x-3 w-full">
      </div>
      <div className="col-span-2 md:col-span-1">
        <select className="border-solid border-gray-300 border-2 p-2 h-12 font-semibold text-liteblue placeholder-liteblue text-liteblue text-base w-full" {...register("rent", { required: true })}>
        <option value="">Own / Rent</option>
          <option value="Own" className="capitalize" key="own">Own</option>
          <option value="Rent" className="capitalize" key="rent">Rent</option>
        </select>
        {errors.rent?.type === 'required' && (<span className="text-errorred">Own/ Rent is Required.</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <input type="tel" className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue text-lg w-full" {...register("tax_id", { required: /(^\d{2}-\d{7}$)/.test(taxid) ? false : true })} placeholder="Tax Id" maxLength="10" onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} value={taxid} />
        {errors.tax_id?.type == 'required' && (<span className="text-errorred m-2">{taxid == `` ? `Tax Id is Required`: `Tax Id format: ##-#######`}</span>)}
      </div>
      <div className="col-span-2 md:col-span-1 space-x-3 w-full">
          <select className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue text-base pr-2 w-full md:w-34" {...register("entity", { required: true })}>
          <option value="">Entity Type</option>
          {entities.map((entity, i) =>
            <option value={entity} key={`entity${i}`}>{entity}</option>
          )}
          </select>
          {errors.entity?.type === 'required' && (<span className="text-errorred">Entity is Required.</span>)}
      </div>
      <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
        <label className="text-xs md:text-sm w-22 md:w-24">Business Start Date
        <br />
        {(errors.business_month?.type === 'required' || errors.business_day?.type === 'required' || errors.business_year?.type === 'required') && (<span className="text-errorred">Business Date is Required.</span>)}
        </label>
        <select className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue pr-2 text-base w-1/4 md:w-30" {...register("business_month", { required: true })}>
          <option value="">Month</option>
          {months.map((month, i) =>
            <option value={month} key={`mbusiness${i}`}>{month}</option>
          )}
          </select>
          <select className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue pr-2 text-base w-1/4 md:w-30" {...register("business_day", { required: true })}>
          <option value="">Day</option>
          {days.map((day, i) =>
            <option value={day} key={`dbusiness${i}`}>{day}</option>
          )}
          </select>
          <select className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue pr-2 text-base w-1/4 md:w-30" {...register("business_year", { required: true })}>
          <option value="">Year</option>
          {years.map((year, i) =>
            <option value={year} key={`ybusiness${i}`}>{year}</option>
          )}
          </select>
      </div>
      <hr className="col-span-2 mt-10 border-1 divide-y border-lightgreen" />
      <div className="col-span-2 mb-6 text-center text-kapitus text-lg my-6 font-bold">PERSONAL INFORMATION</div>
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue text-lg w-full" {...register("first_name", { required: true })} placeholder="First Name" />
        {errors.first_name?.type === 'required' && (<span className="text-errorred">First Name is Required.</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue text-lg w-full" {...register("last_name", { required: false })} placeholder="Last Name" />
        {errors.last_name?.type === 'required' && (<span className="text-errorred">Last Name is Required.</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue text-lg w-full" {...register("email_address", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} placeholder="Email Address" />
        {errors.email_address?.type === 'required' && (<span className="text-errorred">Email is Required.</span>)}
        {errors.email_address?.type === 'pattern' && (<span className="text-errorred">Email is Invalid.</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue text-lg w-full" {...register("personal_phone_number", { required: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone) ? false : true })} placeholder="Phone Number" maxLength="14" onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} value={phone} />
        {errors.personal_phone_number?.type === 'required' && (<span className="text-errorred m-2">{phone == `` ? `Phone Number is Required`: `Phone format: (###) ###-####`}</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue text-lg w-full" {...register("personal_address", { required: true })} placeholder="Address" />
      </div>
      <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
        <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue text-lg w-full md:w-34" {...register("personal_city", { required: true })} placeholder="City" />
        <select className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue text-base w-full md:w-34" {...register("personal_state", { required: true })}>
        <option value="">State</option>
        {states.map((state, i) =>
          <option value={state} key={`${i}`}>{state}</option>
        )}
        </select>
      </div>
      <div className="col-span-2 md:col-span-2 space-x-3 w-full md:w-72">
        <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue text-lg w-full" {...register("personal_zip", { required: true, pattern: /(^\w{5}$)|(^\w{5}-\w{4}$)/ })} placeholder="ZIP / Postal Code" maxLength="5" />
        {(errors.personal_address?.type === 'required' || errors.personal_city?.type === 'required' || errors.personal_state?.type === 'required' || errors.personal_zip?.type === 'required' || errors.personal_zip?.type === 'pattern') && (<span className="text-errorred m-2">This field is required. Please complete the following fields:</span>)}
        {errors.personal_address?.type === 'required' && (<span className="text-errorred m-2">Street Address,</span>)}
        {errors.personal_city?.type === 'required' && (<span className="text-errorred m-2">City,</span>)}
        {errors.personal_state?.type === 'required' && (<span className="text-errorred m-2">State / Province,</span>)}
        {(errors.personal_zip?.type === 'required' || errors.personal_zip?.type === 'pattern' ) && (<span className="text-errorred m-2">ZIP / Postal Code.</span>)}
      </div>
      <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
        <div className="w-full md:w-34">
          <select className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue pr-2 text-base w-full md:w-34" {...register("credit_score", { required: true })}>
          <option value="">Credit Score</option>
          {creditScores.map((credit, i) =>
            <option value={credit.value} key={`creditscore${i}`}>{credit.text}</option>
          )}
          </select>
          {errors.credit_score?.type === 'required' && (<span className="text-errorred m-2">Credit Score is Required.</span>)}
        </div>
        <div className="w-full md:w-34">
          <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue text-lg w-full md:w-34" maxLength="11" {...register("ssn", { required: /(^\d{3}-\d{2}-\d{4}$)/.test(ssn) ? false : true })} placeholder="SSN" value={ssn} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} />
          {errors.ssn?.type === 'required' && (<span className="text-errorred m-2">{phone == `` ? `SSN is Required`: `SSN format: (###) ###-####`}</span>)}
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
        <label className="text-xs md:text-sm w-22 md:w-24">Date of Birth
        <br />
        {(errors.personal_month?.type === 'required' || errors.personal_day?.type === 'required' || errors.personal_year?.type === 'required') && (<span className="text-errorred">DOB is Required.</span>)}
        </label>
        <select className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue pr-2 text-base w-1/4 md:w-30" {...register("personal_month", { required: true })} >
          <option value="">Month</option>
          {months.map((month, i) =>
            <option value={month} key={`mpersonal${i}`}>{month}</option>
          )}
          </select>
          <select className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue pr-2 text-base w-1/4 md:w-30" {...register("personal_day", { required: true })}>
          <option value="">Day</option>
          {days.map((day, i) =>
            <option value={day} key={`dpersonal${i}`}>{day}</option>
          )}
          </select>
          <select className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue pr-2 text-base w-1/4 md:w-30" {...register("personal_year", { required: true })}>
          <option value="">Year</option>
          {years.map((year, i) =>
            <option value={year} key={`ypersonal${i}`}>{year}</option>
          )}
          </select>
      </div>
      <div className="col-span-2 md:col-span-1 space-x-3 w-full md:w-72">
        <select className="border-solid border-gray-300 border-2 h-12 p-2 font-semibold text-liteblue placeholder-liteblue pr-2 text-base w-full" {...register("about_us", { required: true })}>
          <option value="">How did you hear about us?</option>
          {aboutUs.map((item, i) =>
            <option value={item} key={`aboutus${item}`}>{item}</option>
          )}
        </select>
        {errors.about_us?.type === 'required' && (<span className="text-errorred">About us is Required.</span>)}
      </div>
      <hr className="col-span-2 mt-10 divide-y border-1 border-kapitusLiteGreen" />
      <div className="col-span-2 mb-4 text-center text-kapitus text-lg my-6 font-bold">UPLOAD DOCUMENTS</div>
      <div className="col-span-2 mb-2 text-center text-errorred text-lg my-2 font-bold">For Faster Approval Upload 6 Months Bank Statements</div>
      <div className="col-span-2 mb-2 text-center text-kapitusblue text-xs font-bold">Estimated Approval 3-4 Hours</div>
      <div className="col-span-2 text-center bg-white h-28 border-1 border-dotted border-gray-300 py-6 w-full" style={{border: '1px dashed #ccc'}}>
        <div className="text-center mb-4">Drop files here or</div>
        <label className="col-span-2 w-32 text-center px-4 py-2 bg-kapitus rounded-md shadow-md tracking-wide cursor-pointer text-white ease-linear transition-all duration-150">
          <i className="fas fa-cloud-upload-alt fa-3x"></i>
          <span className="text-center text-base leading-normal">Select a file</span>
          <input type='file' className="hidden text-center" name="files" multiple onChange={handleChange} />
        </label>
      </div>
      {fileerror && (<span className="text-errorred m-2">{fileerror}</span>)}
      <div className="col-span-2 mb-2 text-center text-kapitusblue text-sm my-3">Accepted file types: jpg, png, pdf, Max. file size: 128 MB.</div>

      {multipleFiles.map((item, index)=>
        <div className="col-span-2 flex h-5" key={index} onClick={event => handleClick(event)}>
          <Image alt="delete" width="20" height="5" className="mr-3" id={index} src="/images/delete.png" /><label className="ml-3 -mt-1 text-lg text-kapitus font-bold" htmlFor={index}>{item.name}</label>
        </div>
      )}
      <div className="col-span-2 p-2 mb-2 h-24 bg-white border-1 border-dotted border-gray-600 overflow-auto text-kapitusblue my-2 w-full">
        <Termscondition />
      </div>
      <div className="col-span-2 mb-2 text-kapitusblue text-lg">
        <input className="mr-6 mb-1" type="checkbox" value="I agree" {...register("terms_condition", { required: true })} />
        <span>I agree to the Terms of Service</span>
        <br />
        {errors.terms_condition?.type === 'required' && (<span className="text-errorred">Please tick terms & condition</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <span className="flex"><Image alt="right-arrow" width="35" height="30" src="/images/right-arrow-green.svg" className="bg-center bg-contain inline-block mr-6 h-10 w-10 bg-no-repeat" /><label className="font-bold text-kapitus text-lg ml-5">Signature *</label></span>
        <SignatureCanvas penColor='green' clearButton="true" ref={padRef} canvasProps={{ className: 'col-span-2 h-44 w-72 sm:w-full signature border-2 border-gray-500 border-dashed bg-white mt-5', id: 49}} onEnd={event => handleChange(event, padRef)} />
        <button type="button" className="col-span-2 w-72 sm:w-full bg-white p-0 mt-0 relative refresh" onClick={event => handleClear(event, padRef)}><Image alt="refresh" width="30" height="30" src="/images/refresh.png" name="49" className="float-right bg-contain inline-block h-8 w-8 bg-no-repeat" /></button>
        {signerror && (<div className="text-errorred">{signerror}</div>)}
      </div>
      <div className="col-span-2 md:col-span-1">
      </div>
      <div className={`col-span-2 md:col-span-1`}>
      </div>
      <div className="col-span-2 md:col-span-1 space-x-3 w-full">
          {/*<HCaptcha
          sitekey="ee256740-df52-40ab-b1fd-4af985949e42"
          //sitekey="10000000-aaaa-bbbb-cccc-000000000001"
          onVerify={setToken}
          onError={onError}
          onExpire={onExpire}
          ref={captchaRef}
        />*/}
      </div>
      <div className="col-span-2 text-right">
        {/*<button className="py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32">
          Submit
        </button>*/}
        <input className="py-3 px-6 bg-kapitus text-white font-bold w-full sm:w-32" type="submit" />
      </div>
    </div>
    </form>
  </div>
    )
}
export default EquipmentFastApp;