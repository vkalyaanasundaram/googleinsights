import React, { useState, useEffect } from "react";
import { useFormData } from "../../../context";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from 'framer-motion'
import Accordion from '../../../components/Accordion/Accordion'

export default function Industry({ formStep, setData,  data }) {
  const router = useRouter();
  const { setFormValues } = useFormData() || {};
  const [showMe, setShowMe] = useState(true);
  const [error, setError] = useState(false);
  const ease = [0.43, 0.13, 0.23, 0.96];
  let gfindustry = localStorage.getItem('gfindustry') || ''
  const [formData, setFormData] = useState( gfindustry ? { ['industry'] : gfindustry } : []);

  const industries = [{value:"Food & Hospitality", id:"food"}, {value:"Natural Resources/Environment", id:"nature"}, {value:"Automotive", id:"automotive"}, {value:"Business & Information Services", id:"business"}, {value:"Construction/Utilities/Contracting", id:"construct"}, {value:"Personal Services", id:"service"}, {value:"Health Care/Health Services", id:"health"}, {value:"Eduction", id:"eduction"},{value:"Real Estate & Housing", id:"house"}, {value:"Entertainment", id:"entertainment"}, {value:"Safety/Security & Legal", id:"safety"}, {value:"Technology", id:"tech"}, {value:"Transportation", id:"transport"}, {value:"Others", id:"others"}]

  const handlePrev = () => {
    console.log(data)
    setShowMe(!showMe)
    //prevFormStep()
    setTimeout(() => {
      setError('')
      router.push('/get-started/2')
    }, 1000)
  }
  
  const handleSubmit = (e) => {
    //setFormValues(values);
    if(gfindustry != '') {
      setData({ ...data, ['industry'] : gfindustry})
    }

    console.log(data)
    if(Object.keys(formData).length !== 0 ){
      setShowMe(!showMe)
      setTimeout(() => {
        setError('')
        router.push('/get-started/4')
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
      ['industry'] : e.target.value
    });
    setData({ ...data, ['industry'] : e.target.value})
    localStorage.setItem('gfindustry', e.target.value)

    setShowMe(!showMe)
    setTimeout(() => {
      setError('')
      router.push('/get-started/4')
    }, 1000)
    //nextFormStep()
  }

  const transition = {
    delay: 0.9,
    duration: .9,
    type: "spring"
  };

  const transVariants = {
    initial: { opacity: 0, transition: { transition } },
    animate: { opacity: 1, transition: { transition } },
    exit: { opacity: 0, transition: { transition } }
  };

  return (
    <AnimatePresence>
    {showMe && (
    <motion.div initial="initial" animate="animate" exit="exit" variants={transVariants}>
      {error && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
        <span className="text-base font-bold">
        There was a problem with your submission. Please review the fields below.</span>
      </div>)}
      <div className="grid justify-items-center"><h2 className="text-white center">Find the right financing product for you.</h2></div>
      <h3 className="py-3 text-2xl text-white">Find Your Financing Match</h3>
      <form name="forms" className="forms">
        <div className={`grid grid-cols-1 md:grid-cols-3 ${error ? `gfield-error` : ``}`}>
          <label className={`py-6 text-xl font-bold gfield_label ${error ? `text-formred` : `text-white`}`}>My Industry is:</label>
          {industries.map((industry, i) =>
            <span className="py-3" key={i}>
              <input name="industry" type="radio" defaultChecked={industry.value == gfindustry ? `checked`: ``} id={industry.id} value={industry.value} onClick={handleClick} />
              <label htmlFor={industry.id} className={`ml-6 ${error ? `text-formred` : `text-white`}`}>{industry.value}</label>
            </span>
          )}
          {error && <span className="text-formred text-xl">{error}</span>}
        </div>
        <div className="bg-white rounded p-2 mt-4">
          <Accordion title="Why do we need this information?" content="<div>There are financing options created to meet the specific needs of particular industries.</div>" />
        </div>
        <div className="flex">
        <div className="w-1/2">
            <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
              onClick={e => handlePrev()}
              type="button"
            >Back</button></div>
        <div className="w-1/2 flex justify-end">
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
