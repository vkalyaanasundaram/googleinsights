import React, { useContext, useState, useEffect, useRef } from 'react'
import { aboutUs, industries, invoices, contact, invoiceForm } from '../../components/variables/data'
import Phoneformat from '../formatter/phonenumber'
import Image from 'next/image'
import Currencyformat from "../formatter/currencyformat"
import { useRouter } from "next/router";
import axios from 'axios'
import { useForm } from "react-hook-form"
import { Base64 } from 'js-base64'

const InvoiceFactor = ( { refill, credentials } ) => {

  const [entryid, setEntryId] = useState(0)
  const [phone, setPhone] = useState("")
  const [invoiceworth, setInvoiceWorth] = useState("")
  const router = useRouter();
  const [sales, setSales] = useState('complete the full application')
  let preloadedValues = { business_name: refill?.business_name, first_name: refill?.first_name, last_name: refill?.last_name, email_address: refill?.email_address, industry: refill?.industry, invoice: refill?.invoice, invoice_worth: refill?.invoice_worth, sales: refill?.sales}

  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm({
    defaultValues: preloadedValues
  });
  const auth = Base64.btoa(`${credentials.user}:${credentials.password}`);
  let config = { headers: { 'authorization': `${auth}` } }
  let requestForm = {}

  useEffect(() => {
    setEntryId(router.query?.gf_token || '')
    setPhone(refill?.phone_number || '')
  }, [router.query?.gf_token, refill?.phone_number])

  const onSubmit = (data) => {

    data.phone_number = phone
    data.invoice_worth = invoiceworth
    invoiceForm.map((item, i) => {
      if(data[item.name] !== '' ) {
        requestForm[item.id] = data[item.name]
      }
    })
    requestForm.form_id = 60 //form id
    requestForm.entry_id = entryid //entry id
    //requestForm[85] = window.location.href //full path embed url
    axios
      .post('https://stagingdev-kap.com/gravityform.php', {"form_data": requestForm}, config)
      .then(response => {
        if(response.data) {
          console.log('first -' + response.data)
          if(data.sales == 'complete the full application'){
            let res = ''
            invoiceForm.map((item) => {
              res += item.name + '=' + data[item.name] + '&'
            })
            router.push(`http://localhost:3000/invoice-factoring-application?${res}`)
          }
          else {
            const message = document.querySelector('.react-modal-sheet-container');
            //You can do many this with is
            message.textContent = 'Thanks for contacting us! We will get in touch with you shortly'
          }
        }
        else {
          console.log(response.data)
        }
      });
  }

  const handleChange = (event) => {
    if(event.target.name == 'sales'){
      setSales(event.target.value)
    }
    else if(event.target.name == 'phone_number'){

      // this is where we'll call the Phoneformat function
      const formattedPhoneNumber = Phoneformat(event.target.value);
      // we'll set the input value using our setPhone
      setPhone(formattedPhoneNumber)
    }
    else if(event.target.name == 'invoice_worth'){
      // this is where we'll call the Currencyformat function
      const formattedCurrency = Currencyformat(event.target.value);
      // we'll set the input value using our setPhone
      setInvoiceWorth(formattedCurrency)
    }
  }

  const handleBlur = (event) => {

    let formData = {}
    if(event.target.value) {
      invoiceForm.map((item, i) => {
        if(item.name == event.target.name) {
          formData[item.id] = event.target.value
        }
      })
      formData.form_id = 60 //form id
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
    trigger()
  }

  return (
      <section className="w-full max-w-4xl mt-2 px-10 m-auto">
      <div className="w-full h-30">
        <div className="w-full py-2 bottom-0 inset-x-0 text-2xl font-lg text-center text-kapitusLiteGreen">Turn Your Account Receivables into Cash</div>
        <div className="w-full py-4 text-lg font-lg text-pink text-center leading-4">Factoring Lines From $200K – $7 Million</div>
      </div>
      <form name="invoiceform" onSubmit={handleSubmit(onSubmit)} autoComplete="off" >
      <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 relative">
              <input type="text" placeholder="DBA (Business Name)" className="w-full p-2 mt-2 text-lg font-semibold font-semiboldbg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" autoComplete="off" {...register("business_name", { required: true })} onBlur={event => handleBlur(event)} />
              {errors.business_name?.type === 'required' && (<span className="text-errorred m-2">Business Name is Required<span className="error" /></span>)}
              {watch("business_name") && typeof errors.business_name?.type == 'undefined' && <span className="success"></span>}
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
              <input type="text" placeholder="First Name" className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("first_name", { required: true })} onBlur={event => handleBlur(event)} />
              {errors.first_name?.type === 'required' && (<span className="text-errorred m-2">First Name is Required<span className="error" /></span>)}
              {watch("first_name") && typeof errors.first_name?.type == 'undefined' && <span className="success"></span>}
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
              <input type="text" placeholder="Last Name" className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("last_name", { required: true })} onBlur={event => handleBlur(event)} />
              {errors.last_name?.type === 'required' && (<span className="text-errorred m-2">Last Name is Required<span className="error" /></span>)}
              {watch("last_name") && typeof errors.last_name?.type == 'undefined' && <span className="success"></span>}
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
              <input type="email" placeholder="Business Email Address" className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("email_address", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} onBlur={event => handleBlur(event)} />
              {errors.email_address?.type === 'required' && (<span className="text-errorred m-2">Email is Required <span className="error" /></span>)}
              {errors.email_address?.type === 'pattern' && (<span className="text-errorred">Email is Invalid.<span className="error" /></span>)}
              {watch("email_address") && typeof errors.email_address?.type == 'undefined' && <span className="success"></span>}
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
              <input type="text" placeholder="Business Phone Number" className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("phone_number", { required: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone) ? false : true })} onBlur={event => handleBlur(event)} maxLength="14" onChange={event => handleChange(event)} value={phone} />
              {errors.phone_number?.type === 'required' && (<span className="text-errorred m-2">{phone == `` ? `Phone Number is Required`: `Phone format: (###) ###-####`}<span className="error" /></span>)}
              {/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone) && <span className="success" />}
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
              <select className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue" {...register("industry", { required: true })} onBlur={event => handleBlur(event)}>
              <option value="">Industry</option>
              {industries.map((industry, i) =>
              <option value={industry} key={i}>{industry}</option>)}
              </select>
              {errors.industry?.type === 'required' && (<span className="text-errorred m-2">Industry is Required<span className="error" /></span>)}
              {watch("industry") && typeof errors.industry?.type == 'undefined' && <span className="success"></span>}
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
              <select className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue" {...register("about_us", { required: true })} onBlur={event => handleBlur(event)}>
              <option value="">How did you hear about us?</option>
              {aboutUs.map((item, i) =>
              <option value={item} key={i}>{item}</option>)}
              </select>
              {errors.about_us?.type === 'required' && (<span className="text-errorred m-2">About us is Required<span className="error" /></span>)}
              {watch("about_us") && typeof errors.about_us?.type == 'undefined' && <span className="success"></span>}
          </div>
          <div className="col-span-2 relative">
              <input type="text" placeholder="How much are Outstanding Invoices Worth?" className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("invoice_worth", { required: invoiceworth ? false:true })} value={invoiceworth} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} />
              {errors.invoice_worth?.type === 'required' && (<span className="text-errorred m-2">Invoice Worth is Required <span className="error" /></span>)}
              {invoiceworth && <span className="success" />}
          </div>
          <div className="col-span-2 relative">
              <select className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue" {...register("invoice", { required: true })} onBlur={event => handleBlur(event)}>
              <option value="">How many invoice are Outstanding?</option>
              {invoices.map((invoice, i) =>
              <option value={invoice} key={i}>{invoice}</option>)}
              </select>
              {errors.invoice?.type === 'required' && (<span className="text-errorred m-2">Invoice is Required<span className="error" /></span>)}
              {watch("invoice") && typeof errors.invoice?.type == 'undefined' && <span className="success"></span>}
          </div>
          <div className="col-span-2 relative">
          <span><Image alt="arrow" width={30} height={20} src="/images/right-arrow-green.svg" className="bg-center bg-contain inline-block mr-6 h-10 w-10 bg-no-repeat" /></span><label className=" ml-5 font-bold text-kapitus text-lg">I would link to</label>
            <select className="w-full p-2 mt-2 text-lg font-semibold bg-white border-2 border-gray-300 text-liteblue" onChange={event => handleChange(event)} {...register("sales", { required: true })}>
              {contact.map((item, i) =>
              <option value={item} key={i}>{item}</option>)}
            </select>
            {errors.sales?.type === 'required' && (<span className="text-errorred m-2">This Field is Required</span>)}
            {watch("sales") && typeof errors.sales?.type == 'undefined' && <span className="success"></span>}
        </div>
        <div className="col-span-2 text-liteblue text-lg">
          Fees may apply. Kapitus needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at any time. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our 
        </div>
        <div className="col-span-2 text-left mb-4">
          <input className="py-3 px-6 bg-kapitusLiteGreen text-white font-bold w-full sm:w-36" type="submit" />
        </div>
        </div>
      </form>
      </section>
    )
}
export default InvoiceFactor;