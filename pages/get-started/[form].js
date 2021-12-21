import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import FormCard from "../../components/forms/get-started/FormCard";
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
} from "../../components/forms/get-started";
import FormCompleted from "../../components/forms/get-started/FormCompleted";

let localdata = ['gfproduct', 'gffund', 'gfindustry', 'gfmonth', 'gfyear', 'gfcheckbox', 'gfrevenue', 'gfrepayment', 'gfbusiness', 'gfloan', 'gflender', 'gfcreditscore']

const Getstarted = () => {
  const router = useRouter();
  //const [formStep, setFormStep] = useState(0);
  const formStep = router.query.form
  const [data, setData] = useState({});

  useEffect(() => {
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
    setData(data1);
    //router.push('/')
  }, []);



  /*const nextFormStep = () => setFormStep((currentStep) => {
    localStorage.setItem('formstep', (currentStep + 1))
    return currentStep + 1
  });

  const prevFormStep = () => setFormStep((currentStep) => {
    localStorage.setItem('formstep', (currentStep - 1))
    return currentStep - 1
  });*/

  //setStep(formStep)
  return (
    <div className="p-4 px-8 pb-8 bg-kapitus relative min-h-full overflow-auto" style={{height: '814px'}}>
      <Head>
        <title>Get Started Form</title>
      </Head>
      <FormCard currentStep={formStep}>
        {formStep == '1' && (
          <FinancingNeed formStep={formStep} setData={setData} data={data} />
        )}
        {formStep == '2' && (
          <Needmoney formStep={formStep} setData={setData} data={data} />
        )}
        {formStep == '3' && (
          <Industry formStep={formStep} setData={setData} data={data} />
        )}
        {formStep == '4' && (
          <Startbusiness formStep={formStep} setData={setData} data={data} />
        )}
        {formStep == 5 && (
          <Annualrevenue formStep={formStep} setData={setData} data={data} />
        )}
        {formStep == 6 && (
          <Repay formStep={formStep} setData={setData} data={data} />
        )}
        {formStep == 7 && (
          <Mybusiness formStep={formStep} setData={setData} data={data} />
        )}
        {formStep == 8 && (
          <Loan formStep={formStep} setData={setData} data={data} />
        )}
        {formStep == 9 && (
          <Creditscore formStep={formStep} setData={setData} data={data} />
        )}
        {formStep == 10 && (
          <ConfirmPurchase formStep={formStep} setData={setData} data={data} />
        )}
        {formStep > 10 && <FormCompleted />}

      </FormCard>
	</div>
  );
};

export default Getstarted;