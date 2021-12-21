import React, { useState } from "react";
import { useFormData } from "../../../context";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from 'framer-motion'
import Accordion from '../../../components/Accordion/Accordion'

export default function Creditscore({ formStep, setData,  data }) {
  const router = useRouter()
  const { setFormValues } = useFormData() || {};
  const [showMe, setShowMe] = useState(true);
  const [error, setError] = useState(false);
  const ease = [0.43, 0.13, 0.23, 0.96];
  let gfcreditscore = localStorage.getItem('gfcreditscore') || ''
  const [formData, setFormData] = useState( gfcreditscore ? { ['creditscore'] : gfcreditscore } : []);

  const creditscore = [{value:"Exceptional(800-850)", id:"expectional"}, {value:"Very Good (740-799)", id:"verygood"}, {value:"Good (670-739)", id:"good"}, {value:"Fair (580-669)", id:"fair"}, {value:"Poor (300-579)", id:"poor"}]

  const handleSubmit = (e) => {
    console.log(data)
    if(Object.keys(formData).length !== 0 ){
      //nextFormStep()
      setShowMe(!showMe)
      setTimeout(() => {
        setError('')
        router.push('/get-started/10')
      }, 1000)
    }
    else {
      setError('This Field is Required')
    }
  }

  const handleClick = (e) => {

    setFormData({
      ...formData,
      ['creditscore'] : e.target.value
    });
    setData({...data, ['creditscore'] : e.target.value})
    localStorage.setItem('gfcreditscore', e.target.value)
    //nextFormStep()
    setShowMe(!showMe)
    setTimeout(() => {
      setError('')
      router.push('/get-started/10')
    }, 1000)
  }

  const handlePrev = () => {
    setShowMe(!showMe)
    setTimeout(() => {
      router.push('/get-started/8')
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
          <label className={`py-3 text-xl font-bold gfield_label ${error ? `text-formred` : `text-white`}`}>My personal credit score is:</label>
          {creditscore.map((item, i) =>
            <span className="py-3" key={i}>
              <input name="creditscore" type="radio" defaultChecked={item.value == gfcreditscore ? `checked`: ``} id={item.id} value={item.value} onClick={handleClick} />
              <label htmlFor={item.id} className={`ml-6 ${error ? `text-formred` : `text-white`}`}>{item.value}</label>
            </span>
          )}
          {error && <span className="text-formred text-xl">{error}</span>}
        </div>
        <div className="bg-white rounded p-2 mt-4">
          <Accordion title="Why do we need this information?" content="<div>There are financing options for every credit type, however your personal credit score will determine your eligibility for each financing type.</div>" />
        </div>
        <div className="flex absolute bottom-12 w-full">
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
