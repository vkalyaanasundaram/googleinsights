import { useEffect, useState } from "react";
import axios from 'axios';
import { formVariants } from "../components/card/variants";
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion';
//import validate from "../components/validation/contact-validation"
import { useRouter } from "next/router";
import InvoiceFactoringApp from "../components/forms/InvoiceFactoringApp"

const InvoiceFactoring = (props) =>  {

  const router = useRouter();

  return (
    <div className="bg-kapitus py-10 px-10 m-auto w-full">
      <div className="col-span-2 mb-2 text-center text-kapitusblue text-xs font-bold">
      <Image src="/images/kapitus_logo_white.jpg" alt="logo" width={300} height={100} />
      </div>
      <div className="max-w-4xl m-auto text-center">
        <div style={{marginTop:'40px', marginBottom:0, background:"url(https://kapitus.com/wp-content/uploads/inventory-1030x361.jpg) top center no-repeat  #02395e", padding:'30px 0 80px 30px', backgroundColor:"#02395e", borderRadius:'0px'}}>
        <section>
        <div style={{color:'#ffffff'}}>
        <div style={{padding: '0 10px'}}>
        <h1 style={{textAlign: 'left', fontSize:'35px', fontWeight:'bold'}}><span>INVOICE FACTORING</span></h1>
        <h2 style={{textAlign: 'left', marginBottom:'15px', fontSize: '28px', fontWeight: 'bold'}}><span>TURN ACCOUNT RECEIVABLES INTO CASH</span></h2>
        </div>
        </div></section>
        <section>
        <div style={{fontSize:'16px', color:"#ffffff"}}><div style={{padding:'0 20px'}}>
        <div style={{textAlign: 'left'}}><span>• Factoring Lines From $200K – $7 Million</span></div>
        </div>
        </div>
        </section>
        </div>
      </div>
      <InvoiceFactoringApp credentials={props.credentials} fieldData={router.query} />
    </div>
  )
}

export default InvoiceFactoring;

export async function getServerSideProps(context) {

  const entryId = context.query.gf_token || ''
  let gfdata = []
  if(entryId !== '') {
    //const res  = await axios.post(`https://stagingdev-kap.com/gravityform_fetch.php?entry_id=${entryId}`)
    //gfdata = await res.data;
  }
  return {
    props:{
      gfentrydata : gfdata, entry_id: entryId, credentials: {user: process.env.PRIVATE_USER, password: process.env.PASSWORD }
    }
  }
}