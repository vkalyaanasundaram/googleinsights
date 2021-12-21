import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion'
import { useFormData } from "../../../context";
let localObj = {}
export default function ConfirmPurchase({ formStep, setData, data }) {
  const router = useRouter()
  const { setFormValues } = useFormData() || {};
  const [showMe, setShowMe] = useState(true);
  const [error2, setError2] = useState([]);
  const [fundspecialist, setFundspecialist] = useState(true);

  let gfpersonalinfo = localStorage.getItem('gfpersonalinfo') || ''
  let fielddata = []
  if(gfpersonalinfo) {
    const obj = JSON.parse(gfpersonalinfo)
    for(var k in obj) {
      fielddata[k] = obj[k]
    }
  }
  const [formData, setFormData] = useState(fielddata);

  const aboutus = ['Google', 'Email', 'Radio', 'Mail', 'Video', 'Display Ads', 'Facebook', 'LinkedIn', 'Social media / Others', 'Referral', 'Other']

  const fields = [{name:'first_name', message: 'First Name is required'}, {name:'last_name', message: 'Last Name is required'}, {name: 'company_name', message: 'Company Name is required'}, {name:'email', message: 'Email is required'}, {name:'about_us', message: 'Please select any of the option'}, {name:'phone', message: 'Phone Numer is required'}]

  const formid = {'product': 2, 'fund': 86, 'industry': 5, 'month': 66, 'year': 67, 'checkbox': 36, 'revenue': 87, 'repayment': 11, 'business': 13, 'loan': 85, 'lender': 80, 'creditscore': 42, 'first_name': 50, 'last_name': 51, 'company_name': 53, 'email': 47, 'website_url': 84, 'specialist': 44, 'phone': 45, 'about_us': 1 }

  const Removestorevalue = (name) => {

    let personalinfo = JSON.parse(localStorage.getItem('gfpersonalinfo'))
    if(personalinfo){
      for(var k in personalinfo) {
        if(name == k){
          delete personalinfo[name]
        }
        if(name =='specialist'){
          delete personalinfo['phone']
          delete formData['phone']
          delete data['phone']
          delete localObj.phone
          delete localObj.specialist
        }
      }
    }
    console.log(personalinfo)
    localStorage.setItem('gfpersonalinfo', JSON.stringify(personalinfo))
  }

  const handleChange = (e) => {
    if(e.target.type == 'checkbox'){
      
      if(e.target.checked){
        setFundspecialist(true)
        delete localObj[e.target.name]
        localObj[e.target.name] = e.target.value
        console.log(localObj)
        localStorage.setItem('gfpersonalinfo', JSON.stringify(localObj))
      }
      else {
        setFundspecialist(false)
        delete localObj[e.target.name]
        Removestorevalue(e.target.name)
        console.log(localObj)
      }
    }
    else {
      if(e.target.value !== '') {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
      }
      else {
        delete formData[e.target.name]
        delete data[e.target.name]
        delete localObj[e.target.name]
      }
    }
  }

  const handleBlur = (e) => {

    if(e.target.value == '') {
      delete formData[e.target.name]
      delete data[e.target.name]
      Removestorevalue(e.target.name)
    }
    else {
      setData({...data, [e.target.name] : e.target.value })
      delete localObj[e.target.name]
      localObj[e.target.name] = e.target.value
      console.log(localObj)
      localStorage.setItem('gfpersonalinfo', JSON.stringify(localObj))
    }
  }

  const handleSubmit = (values) => {
    console.log(data)
    const {formIsValid, errorData } = validate(formData)
    if(Object.keys(formData).length !== 0 && formIsValid) {
      let finaldata = {}
      delete data.browsers
      delete data.prefixes

      Object.keys(data).forEach(function(item, key) {
        finaldata[formid[item]] = data[item];
      })
      finaldata['form_id'] = 31;
      console.log(finaldata)
      axios
      .post('https://stagingdev-kap.com/gravityform.php', {"form_data": finaldata})
      .then(response => {
        let result = response.data
        //nextFormStep()
        setShowMe(!showMe)
        setTimeout(() => {
          router.push('/get-started/11')
        }, 1000)
        console.log( result )
      });
    }
    else {
      setError2(errorData)
    }
  };

  const validate = (data) => {

    let formIsValid = true;
    let errorData = {};
    
    fields.map((item, i) => {
      if(!data[item.name] && !(fundspecialist == false && item.name == 'phone')){
        formIsValid = false;
        errorData[item.name] = item.message
      }
    })

    return { formIsValid, errorData }
  }
  const handlePrev = () => {
    setShowMe(!showMe)
    setTimeout(() => {
      router.push('/get-started/9')
    }, 1000)
  }

  const transition = {
    delay: .9,
    duration: .7
  };
  const transVariants = {
    initial: { opacity: 0, x: '-100%', scale: 0.7, transition: { transition } },
    animate: { opacity: 1, x: 0, scale: 1, transition: { transition } },
    exit: { opacity: 0, x: "100%", scale: 0.7, transition: { transition } }
  };

  return (
    <AnimatePresence>
    {showMe && (
      <motion.div initial="initial" animate="animate" exit="exit" variants={transVariants}>
      {Object.keys(error2).length > 0 && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
        <span className="text-base font-bold">
        There was a problem with your submission. Please review the fields below.</span>
      </div>)}
      <div className="grid justify-items-center"><h3 className="text-white text-2xl py-4">We`re finding your match</h3></div>
      <form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className={`${error2?.first_name ? `cfield-error` : ``}`}>
          <input name="first_name" placeholder="First Name" className="py-3 w-full mb-4" type="text" onChange={event => handleChange(event)} onBlur={event => handleBlur(event)} defaultValue={formData?.first_name} />
          {error2?.first_name && <span className="text-formred text-xl">{error2.first_name}</span>}
        </div>
        <div className={`${error2?.last_name ? `cfield-error` : ``}`}>
          <input name="last_name" placeholder="Last Name" className="py-3 w-full mb-4" type="text" onChange={event => handleChange(event)} onBlur={event => handleBlur(event)} defaultValue={formData?.last_name} />
          {error2?.last_name && <span className="text-formred text-xl">{error2.last_name}</span>}
        </div>
        <div className={`${error2?.company_name ? `cfield-error` : ``}`}>
          <input name="company_name" placeholder="Company Name*" className="py-3 w-full mb-4" type="text" onChange={event => handleChange(event)} onBlur={event => handleBlur(event)} defaultValue={formData?.company_name} />
          {error2?.company_name && <span className="text-formred text-xl">{error2.company_name}</span>}
        </div>
        <div className={`${error2?.email ? `cfield-error` : ``}`}>
          <input name="email" placeholder="Please provide your email address to see your results:*" className="py-3 w-full mb-4" type="text" onChange={event => handleChange(event)} onBlur={event => handleBlur(event)} defaultValue={formData?.email} />
          {error2?.email && <span className="text-formred text-xl">{error2.email}</span>}
        </div>
      </div>
      <div className="grid grid-cols-1">
        <label className="py-6 text-xl font-bold gfield_label text-white">Web Site URL</label>
        <input name="website_url" placeholder="https://example.com" className="py-3" type="text" onBlur={event => handleBlur(event)} defaultValue={formData?.website_url} />
      </div>
      <div className="flex grid-cols-1 gap-4 py-4">
        <input name="specialist" className="mt-4 md:mt-2 lg:mt-1 mb-4" type="checkbox" value="Please assign a senior funding specialist to find me the best financing options" id="specialist" checked={fundspecialist} onBlur={event => handleBlur(event)} onChange={(e) => handleChange(e)} />
        <label className="mt-2 text-sm text-white" htmlFor="specialist">
        Please assign a senior funding specialist to find me the best financing options
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className={`${fundspecialist ? `block` : `hidden` } ${error2?.phone ? ` cfield-error` : ``}`}>
          <input name="phone" placeholder="Please provide the best number to reach you:" className="py-3 w-full mb-4" type="number" onChange={event => handleChange(event)} onBlur={event => handleBlur(event)} defaultValue={formData?.phone} />
          {error2?.phone && <span className="text-formred text-xl">{error2.phone}</span>}
        </div>
        <div className={`${error2?.about_us ? `cfield-error` : ``}`}>
          <select name="about_us" className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 mb-4" onChange={event => handleChange(event)} onBlur={event => handleBlur(event)} value={formData?.about_us}>
          <option value="">How did you hear about us?</option>
          {aboutus.map((option, i) =>
          <option value={option} key={i}>{option}</option>)}
          </select>
          {error2?.about_us && <span className="text-formred text-xl pt-3">{error2.about_us}</span>}
        </div>
      </div>
        <div className="flex">
        <div className="w-1/2">
            <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
              onClick={handlePrev}
              type="button"
            >Back</button></div>
        <div className="w-1/2 flex justify-end">
        <div className="float-right text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
        /*onClick={handleSubmit}*/
        onClick={e => handleSubmit() }
        >Submit</div>
        </div>
        </div>
      </form>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
