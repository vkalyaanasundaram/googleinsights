import React, { useState } from "react";
import { useFormData } from "../../../context";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from 'framer-motion'
import Accordion from '../../../components/Accordion/Accordion'

export default function Annualrevenue({ formStep, setData, data }) {
  const router = useRouter()
  const { setFormValues } = useFormData() || {};
  const [showMe, setShowMe] = useState(true);
  const [error, setError] = useState(false);
  let gfrevenue = localStorage.getItem('gfrevenue') || ''
  const [formData, setFormData] = useState( gfrevenue ? { ['revenue'] : gfrevenue } : []);

  const handleSubmit = (e) => {
    console.log(data)
    if(Object.keys(formData).length !== 0 ){
      setShowMe(!showMe)
      setTimeout(() => {
        setError('')
        router.push('/get-started/6')
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
        ['revenue'] : e.target.value
      });
      setData({
        ...data,
        ['revenue'] : e.target.value
      })
      localStorage.setItem('gfrevenue', e.target.value)
    }
    else {
      setError('This Field is Required')
      setFormData([]);
    }
  }
  const handlePrev = () => {
    setShowMe(!showMe)
    setTimeout(() => {
      router.push('/get-started/4')
    }, 1000)
  }

  const transition = {
    delay: .9,
    duration: .7
  };
  const transVariants = {
    initial: { rotateY: 90, transition: { transition } },
    animate: { rotateY: 1, transition: { transition } },
    exit: { rotateY: 90, transition: { transition } }
  };
  return (
    <AnimatePresence>
    {showMe && (
    <motion.div initial="initial" animate="animate" exit="exit" variants={transVariants} style={{height: '726px'}}>
      {error && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
        <span className="text-base font-bold">
        There was a problem with your submission. Please review the fields below.</span>
      </div>)}
      <div className="grid justify-items-center">
        <h2 className="text-white center">Find your finance match</h2>
      </div>
      <form>
        <div className={`flex flex-col mb-4 ${error ? `gfield-error` : ``}`}>
          <label className={`py-3 text-xl font-bold gfield_label ${error ? `text-formred` : `text-white`}`} htmlFor="address">My Annual Revenue is:</label>
          <input className="border-solid border-2 border-light-blue-500 h-16 bg-kapitus text-white text-2xl" type="number" name="revenue" onBlur={handleBlur} defaultValue={gfrevenue} />
          {error && <span className="text-formred text-xl">{error}</span>}
        </div>
        <div className="bg-white rounded p-2 mt-4">
          <Accordion title="Why do we need this information?" content="<div>Each financing product has its own minimum requirement for the amount of revenue being brought into a business on either a monthly or an annual basis. In addition, your monthly and/or annual revenue can dictate the length and term on your financing option.</div>" />
        </div>

        <div className="flex absolute bottom-12 w-full flex items-center">
          <div className="w-1/2 text-sm md:text-2xl text-gray-500">
            <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
              onClick={handlePrev}
              type="button"
            >Back</button>
          </div>
          <div className="ml-auto w-1/2 flex justify-end">
          <div className="float-right text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
           onClick={e => handleSubmit() }>Next</div>
          </div>
        </div>

      </form>
    </motion.div>)}
    </AnimatePresence>
  );
}
