import React, { useState } from "react";
import { useFormData } from "../../../context";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from 'framer-motion'

export default function Loan({ formStep, setData,  data }) {
  const router = useRouter()
  const { setFormValues } = useFormData() || {};
  const [showMe, setShowMe] = useState(true);
  const [error, setError] = useState(false);

  let gfloan = localStorage.getItem('gfloan') || ''
  const [lender, setLender] = useState(gfloan=='Yes' ? true: null);
  let gflender = localStorage.getItem('gflender') || ''
  
  const [formData, setFormData] = useState(
    gfloan || gflender ? { ['loan'] : gfloan, ['lender'] : gflender } : []
  );
  
  const handleSubmit = (e) => {
    //setFormValues(values);
    console.log(data)
    let lender = document.querySelector("#choice_yes").checked;
    if(lender && Object.keys(formData).length == 2 ){
      setShowMe(!showMe)
      setTimeout(() => {
        setError('')
        router.push('/get-started/9')
      }, 1000)
    }
    else if(formData.loan == 'No' && document.querySelector("#choice_no").checked == true ){
      //nextFormStep()
      setShowMe(!showMe)
      setTimeout(() => {
        setError('')
        router.push('/get-started/9')
      }, 1000)
    }
    else {
      setError('This Field is Required')
    }
  }

  const handleBlur = (e) => {
    if(e.target.value !== ''){
      setFormData({
        ...formData,
        ['lender'] : e.target.value
      });
      setData({...data, ['lender'] : e.target.value})
      localStorage.setItem('gflender', e.target.value)
    }
  }

  const handleClick = (e) => {
    if(e.target.value == 'Yes'){
      setLender(true)
    }
    else {
      delete formData['lender']
      delete data['lender']
      document.querySelector("#lender").value = ''
      localStorage.removeItem('gflender')
      setLender(false)
    }

    setFormData({
        ...formData,
        ['loan'] : e.target.value
    });
    setData({...data, ['loan'] : e.target.value})
    localStorage.setItem('gfloan', e.target.value)
  }
  const handlePrev = () => {
    setShowMe(!showMe)
    setTimeout(() => {
      router.push('/get-started/7')
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
        <div className={`grid grid-cols-1 md:grid-cols-2 ${error && lender == null ? `gfield-error` : ``}`}>
          <label className={`py-6 text-xl font-bold gfield_label ${error && lender == null ? `text-formred` : `text-white`}`}>Do you have an existing loan?</label>
          <div className="py-3">
            <div className="py-2">
            <input name="loan" type="radio" id="choice_yes" value="Yes" onClick={handleClick} defaultChecked={gfloan == 'Yes' ? `checked`: ``} />
            <label htmlFor="choice_yes" className={`ml-6 ${error && lender == null ? `text-formred` : `text-white`}`}>Yes</label>
            </div>
            <div className="py-2">
            <input name="loan" type="radio" id="choice_no" value="No" onClick={handleClick} defaultChecked={gfloan == 'No' ? `checked`: ``} />
            <label htmlFor="choice_no" className={`ml-6 ${error && lender == null ? `text-formred` : `text-white`}`}>No</label>
            </div>

            <div className={`${lender ? `block`: `hidden`} flex flex-col mb-4 ${error ? `gfield-error` : ``}`}>
                <label className={`py-6 text-xl font-bold gfield_label ${error ? `text-formred` : `text-white`}`} htmlFor="address">Lender Name</label>
                <input className="border-solid border-2 border-light-blue-500 h-16 bg-kapitus text-white text-2xl" type="text" id="lender" name="lender" onBlur={handleBlur} defaultValue={gflender} />
                {error && <span className="text-formred text-xl">{error}</span>}
            </div>
          </div>
        </div>
        <div className="flex absolute bottom-16 w-full">
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
