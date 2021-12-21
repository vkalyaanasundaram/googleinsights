import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cross  from "../../Accordion/Timesolid";
import { motion, AnimatePresence } from 'framer-motion'

export default function FormCard({ children, currentStep }) {
  const [showMe, setShowMe] = useState(true);
  const router = useRouter();
  let step = ['TELL US ABOUT YOUR PRIMARY FINANCING NEED', 'TELL US HOW MUCH MONEY YOU NEED FOR YOUR BUSINESS.', 'LET US KNOW INTO WHICH INDUSTRY YOUR BUSINESS FALLS.', 'TELL US HOW LONG YOU HAVE BEEN IN BUSINESS.', 'GIVE US THE APPROXIMATE AMOUNT OF REVENUE YOU ARE BRINGING IN EACH YEAR.', 'TELL US HOW LONG YOU WOULD LIKE TO HAVE TO PAY BACK THE MONEY YOU RECEIVE.', 'TELL US HOW QUICKLY YOU NEED TO OBTAIN FINANCING FOR YOUR BUSINESS.', 'TELL US HOW OFTEN YOU WILL NEED ACCESS TO ADDITIONAL MONEY FOR YOUR BUSINESS.', ' LET US KNOW THE CURRENT STATE OF YOUR CREDIT.']
  
  const handleClick = () => {
    localStorage.setItem('reload', true)
    setShowMe(!showMe)
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  useEffect(() => {
    localStorage.setItem('formstep', currentStep)
  }, [currentStep])


  const transition = {
    delay: .9,
    duration: .7
  };
  const transVariants = {
    initial: { opacity: 0, y: '-100%', transition: { transition } },
    animate: { opacity: 1, y: 0, transition: { transition } },
    exit: { opacity: 0, y: "100%", transition: { transition } }
  };

  return (
    <AnimatePresence>
    {showMe && (
      <motion.div initial="initial" animate="animate" exit="exit" variants={transVariants}>
    {currentStep <= 10 && (
      <div className="flex items-center">
        <div className=" text-sm md:text-2xl text-gray-500">Step {currentStep} of 10 - {step[parseInt(currentStep) -1 ]}</div>
        <div className="ml-auto" onClick={handleClick}><Cross className="cross" width={20} fill={"#fff"} /></div>
      </div>
    )}
    {children}
    </motion.div>
      )}
    </AnimatePresence>
  );
}
