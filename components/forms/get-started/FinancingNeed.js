import React, { useState, useEffect } from "react";
import { useFormData } from "../../../context";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from 'framer-motion'
import Accordion from '../../../components/Accordion/Accordion'

export default function FinancingNeed({ formStep, setData, data }) {
  const router = useRouter();
  const [showMe, setShowMe] = useState(true);
  const [error, setError] = useState(false);
  const ease = [0.43, 0.13, 0.23, 0.96];
  let gfproduct = localStorage.getItem('gfproduct') || ''
  const [formData, setFormData] = useState(  gfproduct ?  { ['product'] : gfproduct } : []);

  const products = [{value:"Cover Payroll", id:"payroll"}, {value:"Purchase/lease new equipment", id:"equipment"}, {value:"Renovations", id:"renov"}, {value:"Expand", id:"expand"}, {value:"Make repairs", id:"repairs"}, {value:"Manage my cashflow", id:"cashflow"}, {value:"Run a marketing campaign", id:"campaign"}, {value:"Pay taxes", id:"taxes"}, {value:"Others", id:"others"}]
  
  const handleSubmit = (e) => {

    if(gfproduct != '') {
      setData({ ...data, ['product'] : gfproduct})
    }

    if(Object.keys(formData).length !== 0 ){
      setShowMe(false);
      setTimeout(() => {
        setError('')
        router.push('/get-started/2')
      })
      //nextFormStep()
    }
    else {
      setError('This Field is Required')
    }
  }

  const handleClick = (e) => {
    setError('')
    //setFormData(e.target.value)
    setFormData({ ['product'] : e.target.value });
    setData({ ...data, ['product'] : e.target.value})
    localStorage.setItem('gfproduct', e.target.value)
    setShowMe(false);
    //nextFormStep()
    setTimeout(() => {
      setError('')
      router.push('/get-started/2')
    }, 1000)
  }

  const transition = {
    delay: 0.5,
    duration: 0.5,
    type: "spring"
  };

  const transVariants = {
    initial: { opacity: 1, x: -400, transition: { transition } },
    animate: { opacity: 1, x: 0, transition: { transition } },
    exit: { opacity: 1, x: 400, transition: { transition } }
  };
  //console.log(showMe)
  return (
    <AnimatePresence>
      {showMe && (
      <motion.div initial="initial" animate="animate" exit="exit" variants={transVariants}>
      {error && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
        <span className="text-base font-bold">
        There was a problem with your submission. Please review the fields below.</span>
      </div>)}
      <div className="grid justify-items-center"><h2 className="text-white center">Find the right financing product for you.</h2></div>
      <h3 className="py-3 text-2xl text-white ">Answer a few questions and we’ll match you with the best product based on your needs and current situations.</h3>
      <form name="forms" className="forms">
        <div className={`${error ? `gfield-error` : ``}`}>
        <label className={`py-3 text-xl font-bold gfield_label ${error ? `text-formred` : `text-white`}`}>I need financing to:</label>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {products.map((product, i) =>
              <span className="py-3" key={i}>
                <input  name="finance" type="radio" defaultChecked={product.value == gfproduct ? `checked`: ``} id={product.id} value={product.value} onClick={handleClick} />
                <label htmlFor={product.id} className={`ml-6 ${error ? `text-formred` : `text-white`}`}>{product.value}</label>
              </span>
            )}
          {error && <span className="text-formred text-xl">{error}</span>}
          </div>
        </div>
        <div className="bg-white rounded-lg p-2 mt-4">
          <Accordion title="How it Works" content="<div>1. Answer a few questions. You let us know some basic information about your financing needs, so we can find a match.</div>
          <div>2. See your financing matches. You'll get matched with up to four financing options based on your answers.</div>
          <div>3. Apply for financing. You can apply for all of your financing options by completing one simple application and providing a few documents.</div>
          <div>4. Get an Advisor: You have the option to be assigned a financing specialist to help guide you through the application process.</div>
          " />
          <Accordion title="How We Make Getting Business Financing Easier for You" content="<div>If you are looking to determine the best financing option for you, our matching tool streamlines the process and arms you with information that you can use before you apply. To match you with your best options, we ask you to answer a series of basic questions about your existing and future needs, current financial health, and your financing preferences – including amount to be financed, ideal terms and financing urgency. Our system then finds you up to four financing options to fit your needs. Once you’re matched, you can expect to be contacted by one of our financing specialists to help you navigate the application and selection processes.</div>" />
        </div>
        <div className="flex">
          <div className="w-1/2"></div>
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