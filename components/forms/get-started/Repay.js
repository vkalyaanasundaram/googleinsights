import React, { useState } from "react";
import { useFormData } from "../../../context";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from 'framer-motion'
import Accordion from '../../../components/Accordion/Accordion'

export default function Repay({ formStep, setData,  data }) {
  const router = useRouter()
  const { setFormValues } = useFormData() || {};
  const [showMe, setShowMe] = useState(true);
  const [error, setError] = useState(false);
  
  let gfpay = localStorage.getItem('gfrepayment') || ''
  const [formData, setFormData] = useState( gfpay ? { ['repayment'] : gfpay } : []);

  const repay = [{value:"Less than 12 Months", id:"12"}, {value:"12 Months - 18 Months", id:"18"}, {value:"18 Months - 24 Months", id:"24"}, {value:"Over 24 Months", id:"over24"}]

  const handleSubmit = (e) => {
    //setFormValues(values);
    console.log(data)
    if(Object.keys(formData).length !== 0 ){
      setShowMe(!showMe)
      setTimeout(() => {
        setError('')
        router.push('/get-started/7')
      }, 1000)
      //nextFormStep()
    }
    else {
      setError('This Field is Required')
    }
  }

  const handleClick = (e) => {
    setFormData({
      ...formData,
      ['repayment'] : e.target.value
    });

    setData({
      ...data,
      ['repayment'] : e.target.value
    })
    localStorage.setItem('gfrepayment', e.target.value)
    setShowMe(!showMe)
    setTimeout(() => {
      setError('')
      router.push('/get-started/7')
    }, 1000)
    //nextFormStep()
  }

  const handlePrev = () => {
    setShowMe(!showMe)
    setTimeout(() => {
      router.push('/get-started/5')
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
      <motion.div initial="initial" animate="animate" exit="exit" variants={transVariants} style={{height: '720px'}}>
      {error && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
        <span className="text-base font-bold">
        There was a problem with your submission. Please review the fields below.</span>
      </div>)}
      <h3 className="py-3 text-2xl text-white">Find Your Financing Match</h3>
      <form name="forms" className="forms">
        <div className={`grid grid-cols-1 md:grid-cols-2 ${error ? `gfield-error` : ``}`}>
          <label className={`py-6 text-xl font-bold gfield_label ${error ? `text-formred` : `text-white`}`}>I would like to pay off my financing in:</label>
          {repay.map((item, i) =>
            <span className="py-3" key={i}>
              <input name="repayment" type="radio" defaultChecked={item.value == gfpay ? `checked`: ``} id={item.id} value={item.value} onClick={handleClick} />
              <label htmlFor={item.id} className={`ml-6 ${error ? `text-formred` : `text-white`}`}>{item.value}</label>
            </span>
          )}
          {error && <span className="text-formred text-xl">{error}</span>}
        </div>
        <div className="bg-white rounded p-2 mt-4">
          <Accordion title="Why do we need this information?" content="<div>Each financing product offers different payback lengths and terms.</div>" />
        </div>
        <div className="flex absolute bottom-14 w-full">
        <div className="w-1/2">
            <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
              onClick={handlePrev}
              type="button"
            >Back</button></div>
        <div className="w-1/2 flex justify-end mr-20">
        <div className="float-right text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
        /*onClick={handleSubmit}*/
        onClick={e => handleSubmit() }
        >Next</div>
        </div>
        </div>
      </form>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
