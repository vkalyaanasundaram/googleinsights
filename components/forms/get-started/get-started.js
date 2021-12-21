import { useState } from "react";
import Head from "next/head";
import FormCard from "./FormCard";
import {
  Needmoney,
  ConfirmPurchase,
  FinancingNeed,
  Industry,
  Startbusiness,
  Annualrevenue,
  Repay,
  Mybusiness,
  Loan,
  Creditscore,
} from ".";

import FormCompleted from "./FormCompleted";

let localdata = ['gfproduct', 'gffund', 'gfindustry', 'gfmonth', 'gfyear', 'gfcheckbox', 'gfrevenue', 'gfrepayment', 'gfbusiness', 'gfloan', 'gflender', 'gfcreditscore']

const Getstarted = () => {
  
  const [formStep, setFormStep] = useState(parseInt(localStorage.getItem('formstep')) || 0);
  let data1 = {}
  //get items from local storage and store to variable data
  localdata.map((item, i) => {
    if(localStorage.getItem(item)){
      let item1 = item.replace('gf','')
      data1[item1] = localStorage.getItem(item)
    }
  })
  let personalinfo = JSON.parse(localStorage.getItem('gfpersonalinfo'))
  if(personalinfo){
    for(var k in personalinfo) {
      data1[k] = personalinfo[k]
    }
  }
  const [data, setData] = useState(data1);

  const nextFormStep = () => setFormStep((currentStep) => {
    localStorage.setItem('formstep', (currentStep + 1))
    return currentStep + 1
  });

  const prevFormStep = () => setFormStep((currentStep) => {
    localStorage.setItem('formstep', (currentStep - 1))
    return currentStep - 1
  });

  //setStep(formStep)
  return (
    <div className="p-4 px-8 pb-8 bg-kapitus relative min-h-full">
      <Head>
        <title>Next.js Multi Step Form</title>
      </Head>
      <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
        {formStep >= 0 && (
          <FinancingNeed formStep={formStep} nextFormStep={nextFormStep} setData={setData} data={data} />
        )}
        {formStep >= 1 && (
          <Needmoney formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
        )}
        {formStep >= 2 && (
          <Industry formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
        )}
        {formStep >= 3 && (
          <Startbusiness formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
        )}
        {formStep >= 4 && (
          <Annualrevenue formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
        )}
        {formStep >= 5 && (
          <Repay formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
        )}
        {formStep >= 6 && (
          <Mybusiness formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
        )}
        {formStep >= 7 && (
          <Loan formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
        )}
        {formStep >= 8 && (
          <Creditscore formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
        )}
        {formStep >= 9 && (
          <ConfirmPurchase formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
        )}
        {formStep > 9 && <FormCompleted />}
      </FormCard>
    </div>
  );
};

export default Getstarted;