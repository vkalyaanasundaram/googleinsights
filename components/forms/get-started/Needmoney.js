import React, { useState, useEffect } from "react";
import { useFormData } from "../../../context";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from 'framer-motion'
import Accordion from '../../Accordion/Accordion'

export default function Needmoney({ formStep, nextFormStep, prevFormStep, setData, data }) {
  const router = useRouter();
  const { setFormValues } = useFormData() || {};
  const [showMe, setShowMe] = useState(true);
  const [error, setError] = useState(false);
  let gffund = localStorage.getItem('gffund') || ''
  const [formData, setFormData] = useState(gffund ?  { ['fund'] : gffund } : []);
  const ease = [0.43, 0.13, 0.23, 0.96];
  console.log(data)
  const handlePrev = () => {
    setShowMe(false)
    setTimeout(() => {
      //prevFormStep()
      router.push('/get-started/1')
    }, 1000)
  }

  const handleSubmit = (e) => {
    if(gffund != '') {
      setData({ ...data, ['fund'] : gffund})
    }

    if(Object.keys(formData).length !== 0 ){
      console.log(data)
      setShowMe(!showMe)
      setTimeout(() => {
        setError('')
        router.push('/get-started/3')
      }, 1000)
      //nextFormStep()
    }
    else {
      setError('This Field is Required')
    }
  }

  const handleBlur = (e) => {
    if(e.target.value !== ''){
      setError('')
      setFormData({
        ...formData,
        ['fund'] : e.target.value
      });
      setData({ ...data, ['fund'] : e.target.value})
      localStorage.setItem('gffund', e.target.value)
      setShowMe(!showMe)
      //nextFormStep()
      router.push('/get-started/3')
    }
    else {
      setError('This Field is Required')
      setFormData([]);
    }
  }

  const transition = {
    delay: .9,
    duration: 1,
  };

  const transVariants = {
    initial: { opacity: 1, x: -400, scale: 0.6 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { transition } },
    exit: { opacity: 1, x: 700, transition: { delay: 0.5, duration: 0.9 } }
  };
  //console.log(formStep)
  console.log(showMe)
  return (
    <AnimatePresence>
      {showMe && (
      <motion.div initial="initial" animate="animate" exit="exit" variants={transVariants} style={{height: '710px'}}>
      {error && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
        <span className="text-base font-bold">
        There was a problem with your submission. Please review the fields below.</span>
      </div>)}
      <div className="grid justify-items-center">
        <h2 className="text-white center">Find the right financing product for you.</h2>
      </div>
      <form autoComplete="off">
        <div className={`flex flex-col mb-4 ${error ? `gfield-error` : ``}`}>
          <label className={`py-3 text-xl font-bold gfield_label ${error ? `text-formred` : `text-white`}`} htmlFor="address">How much financing do you need?</label>
          <input className="border-solid border-2 border-light-blue-500 h-16 bg-kapitus text-white text-2xl" type="number" name="address" onBlur={handleBlur} defaultValue={gffund} />
          {error && <span className="text-formred text-xl">{error}</span>}
        </div>
        <div className="bg-white rounded text-xl p-2 mt-4">
          <Accordion title="Why do we need this information?" content="<div>Each financing product has its own minimum and maximum requirements around the amount of money that can be acquired through that option.</div>" radius="" />
        </div>
        <div className="flex absolute bottom-10 w-full">
          <div className="w-1/2">
            <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
              onClick={e => handlePrev()}
              type="button"
            >Back</button>
          </div>
          <div className="w-1/2 flex justify-end mr-20">
          <div className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
           onClick={e => handleSubmit()}>Next</div>
          </div>
        </div>
      </form>
    </motion.div>
    )}
    </AnimatePresence>
  );
}
