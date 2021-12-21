import React, { useState } from "react";
import { useFormData } from "../../../context";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from 'framer-motion'
import Accordion from '../../../components/Accordion/Accordion'

export default function StartBusiness({ formStep, setData, data }) {
  const router = useRouter()
  const { setFormValues } = useFormData() || {};
  const [showMe, setShowMe] = useState(true);
  const [emonth, setEmonth] = useState(null);
  const [eyear, setEyear] = useState(null);

  let gfcheckbox = localStorage.getItem('gfcheckbox') || ''
  const [checkbox, setCheckbox] = useState(gfcheckbox=='Yes' ? true: null);

  let gfmonth = localStorage.getItem('gfmonth') || ''
  let gfyear = localStorage.getItem('gfyear') || ''
  const [formData, setFormData] = useState(
    gfmonth || gfyear ? { ['month'] : gfmonth, ['year'] : gfyear } : []
  );

  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 12]
  const year = [2022, 2021, 2020, 2019]

  const handleSubmit = (e) => {
    if(Object.keys(formData).length == 2 ){
      console.log(data)
        //nextFormStep()
      setShowMe(!showMe)
      setTimeout(() => {
        setEmonth(null)
        setEyear(null)
        router.push('/get-started/5')
      }, 1000)
    }
    else {
        let mon = document.querySelector("#month");
        let yar = document.querySelector("#year");
        if(mon.value == ''){
            setEmonth('Month is Required')
        }
        if(yar.value == ''){
            setEyear('Year is Required')
        }
    }
  }

  const handleChange = (e) => {
    if(e.target.value !== '' && e.target.name !== ''){
        setFormData({
          ...formData,
          [e.target.id] : e.target.value
        });
        setData({ ...data, [e.target.id] : e.target.value });
        localStorage.setItem('gf'+e.target.id, e.target.value)
    }
    else {
      if(e.target.checked){
        setCheckbox(true)
        localStorage.setItem('gfcheckbox', e.target.value)
        console.log('se')
        setData({ ...data, ['checkbox'] : e.target.value });
      }
      else {
        setCheckbox(false)
        localStorage.removeItem('gfcheckbox')
        delete data['checkbox']
      }
    }
  }

  const handleBlur = (e) => {
    console.log(formData)
    if(e.target.value == ''){
      delete formData[e.target.id]
      delete setData[e.target.id]
    }
    if(Object.keys(formData).length == 2){
      //nextFormStep()
      setShowMe(!showMe)
      setTimeout(() => {
        setEmonth(null)
        setEyear(null)
        router.push('/get-started/5')
      }, 1000)
    }
  }
  const handlePrev = () => {
    setShowMe(!showMe)
    setTimeout(() => {
      router.push('/get-started/3')
    }, 1000)
  }

  const transition = {
    delay: .9,
    duration: 0.7,
    type: "spring"
  };

  const transVariants = {
    initial: { opacity: 0, top: "100vh", scale: 0.4, transition: { transition } },
    animate: { opacity: 1, top: "0vh", scale: 1, transition: { transition } },
    exit: { opacity: 0, top: "100vh", scale: 0.4, transition: { transition } }
  };

  return (
    <AnimatePresence>
    {showMe && (
    <motion.div initial="initial" animate="animate" exit="exit" variants={transVariants} style={{height: '768px'}}>
      {emonth && eyear && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
        <span className="text-base font-bold">
        There was a problem with your submission. Please review the fields below.</span>
      </div>)}
      <div className="grid justify-items-center">
        <h2 className="text-white center">Find your financing match</h2>
      </div>
      <form>
        <div className={`flex flex-col mb-4 ${emonth !== null && eyear !== null ? `gfield-error` : ``}`}>
          <label className="py-6 text-white text-xl font-bold gfield_label" htmlFor="address">I started my business on:</label>
          <div className="flex w-full">
            <div>
            <select className="w-32 px-4 py-2 mt-2 mr-4 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 placeholder-kapitus" name="month" id="month" onChange={event => handleChange(event)} onBlur={event => handleBlur(event)} value={gfmonth}>
                <option value="">Month</option>
                {month.map((option, i) =>
                <option value={option} key={i}>{option}</option>)}
            </select>
            {emonth && <span className="text-formred text-xl">{emonth}</span>}
            </div>
            <div>
            <select className="w-32 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 placeholder-kapitus" name="year" id="year" onChange={event => handleChange(event)} onBlur={event => handleBlur(event)} value={gfyear}>
                <option value="">Year</option>
                {year.map((option, i) =>
                <option value={option}  key={i}>{option}</option>)}
            </select>
            {eyear && <span className="text-formred text-xl">{eyear}</span>}
            </div>
          </div>
          <div className="flex mt-4">
            <input className="gfield-choice-input mt-1" id="yes" type="checkbox" value="I do not have a business" onChange={(e) => handleChange(e)}  />
            <label htmlFor="yes" className="ml-4 text-white">I do not have a business</label>
          </div>
          <div className={`mt-4 text-white ${checkbox ? `block`: `hidden`}`}>
            Thank you for reaching out to Kapitus. Unfortunately, our financing products are only available for existing businesses and we will not be able to help you at this time.
          </div>
        </div>
        <div className="bg-white rounded p-2 mt-4">
          <Accordion title="Why do we need this information?" content="<div>Each financing product has its own minimum and maximum requirements around the amount of money that can be acquired through that option.</div>" />
        </div>
        <div className="flex absolute bottom-12 w-full">
          <div className="w-1/2">
            <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
              onClick={handlePrev}
              type="button"
            >Back</button>
          </div>
          <div className="w-1/2 flex justify-end">
          <div className="float-right text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
           onClick={e => handleSubmit() }>Next</div>
          </div>
        </div>
      </form>
      </motion.div>
    )}
    </AnimatePresence>
  );
}
