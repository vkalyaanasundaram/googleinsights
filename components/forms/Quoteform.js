import React, { useContext, useRef } from 'react'
import {FormContext} from '../FormContext'
import { motion } from 'framer-motion'

const Quoteform = ( { refill, error2, success, represent1 } ) => {

    const { handleChange, handleBlur } = useContext(FormContext);
    const lists = [{value:"payroll", text:"Payroll"}, {value:"equipment", text:"Equipment"}, {value:"renovations", text:"Renovations"}, {value:"expansion", text:"Expansion"}, {value:"repairs", text:"Repairs"}, {value:"marketing", text:"Marketing"}]

    const credit_score = [{value:"poor", text:"Poor (300 - 579)"}, {value:"fair", text:"Fair (580 - 649)"}, {value:"good", text:"Good (650 - 739)"}, {value:"very_good", text:"Very Good (740 - 799)"}, {value:"exceptional", text:"Exceptional (800 - 850)"}]

    const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 12]
    const day = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    const year = [2022, 2021, 2020, 2019]
    const represent = ["speak with a sales representative", "complete the full application"]

    const sales = typeof refill?.sales !== 'undefined' ? refill?.sales : represent1

    let gfshortform = localStorage.getItem('gfshortform') || ''
    let fielddata = []
    if(gfshortform) {
      const obj = JSON.parse(gfshortform)
      for(var k in obj) {
        fielddata[k] = obj[k]
      }
    }

    return (
        <>
        <motion.div className="mt-3 relative z-0 w-full mb-5">
        <motion.input type="text" name="needfund" placeholder="How Much Funding Do You Need?" id="28" autoComplete="off" className="h-12 px-2 pt-3 pb-2 block w-full px-0 mt-0 border-2 border-b-2 bg-white appearance-none focus:border-green-600 border-gray-200 rounded" defaultValue={fielddata?.needfund?fielddata?.needfund : refill?.fund} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} />
        {success?.fund && <span className="success"></span>}
        {success?.fund == false && <span className="error"></span>}
        {error2?.fund && <span className="text-errorred">{error2?.fund}</span>}
    </motion.div>
    <motion.div className="mt-3 relative z-0 w-full mb-5">
        <select className="form-select border border-gray-200 p-2 rounded w-full" name="usefund" id="26" value={fielddata?.usefund ? fielddata?.usefund : refill?.use} onChange={event => handleChange(event)} onBlur={event => handleBlur(event)}>
            <option value="">Use of Funds</option>
            {lists.map((option, i) =>
            <option value={option.value} key={`${i}fund`}>{option.text}</option>
        )}
        </select>
        {success?.use && <span className="success"></span>}
        {success?.use == false && <span className="error"></span>}
        <span className="text-errorred">{error2?.use}</span>
    </motion.div>
    <motion.div className="mt-3 relative z-0 w-full mb-5">
        <motion.input type="text" name="firstname" placeholder="First Name" id="2.3" autoComplete="nope" className="h-12 px-2 pt-3 pb-2 block w-full px-0 mt-0 bg-white border-2 border-b-2 appearance-none focus:outline-none focus:border-kapitus border-gray-200 rounded" defaultValue={fielddata?.firstname ? fielddata?.firstname : refill?.first} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} />
        {success?.first && <span className="success"></span>}
        {success?.first == false && <span className="error"></span>}
        <span className="text-errorred">{error2?.first}</span>
    </motion.div>
    <motion.div className="mt-3 relative z-0 w-full mb-5">
        <motion.input type="text" name="lastname" placeholder="Last Name" id="2.6" autoComplete="nope" className="h-12 px-2 pt-3 pb-2 block w-full px-0 mt-0 bg-white border-2 border-b-2 appearance-none focus:outline-none focus:border-kapitus border-gray-200 rounded" defaultValue={fielddata?.lastname ? fielddata?.lastname : refill?.last} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} />
        {success?.last && <span className="success"></span>}
        {success?.last == false && <span className="error"></span>}
        <span className="text-errorred">{error2?.last}</span>
    </motion.div>    
    <motion.div className="mt-3 relative z-0 w-full mb-5">
        <motion.input type="text" name="email" placeholder="Email Address" id="3" autoComplete="nope" className="h-12 px-2 pt-3 pb-2 block w-full px-0 mt-0 bg-white border-2 border-b-2 appearance-none focus:outline-none focus:border-kapitus border-gray-200 rounded" defaultValue={fielddata?.email ? fielddata?.email : refill?.email} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} />
        {success?.email && <span className="success"></span>}
        {success?.email == false && <span className="error"></span>}
        <span className="text-errorred">{error2?.email}</span>
    </motion.div>
    <motion.div className="mt-3 relative z-0 w-full mb-5">
        <motion.input type="number" name="phone" placeholder="Phone Number" id="4" autoComplete="nope" className="h-12 px-2 pt-3 pb-2 block w-full px-0 mt-0 bg-white border-2 border-b-2 appearance-none focus:outline-none focus:border-kapitus border-gray-200 rounded" defaultValue={fielddata?.phone ? fielddata?.phone : refill?.phone} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} />
        {success?.phone && <span className="success"></span>}
        {success?.phone == false && <span className="error"></span>}
        <span className="text-errorred">{error2?.phone}</span>
    </motion.div>
    <motion.div className="mt-3 relative z-0 w-full mb-5">
        <motion.input type="text" name="businessname" placeholder="DBA (Business Name)" id="5" autoComplete="nope" className="h-12 px-2 pt-3 pb-2 block w-full px-0 mt-0 bg-white border-2 border-b-2 appearance-none focus:outline-none focus:border-kapitus border-gray-200 rounded" defaultValue={fielddata?.businessname ? fielddata?.businessname : refill?.dba} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} />
        {success?.dba && <span className="success"></span>}
        {success?.dba == false && <span className="error"></span>}
        <span className="text-errorred">{error2?.dba}</span>
    </motion.div>
    <motion.div className="mt-3 relative z-0 w-full mb-5">
        <motion.input type="number" name="revenue" placeholder="Annual Revenue (Estimate) $" id="7" autoComplete="nope" className="h-12 px-2 pt-3 pb-2 block w-full px-0 mt-0 bg-white border-2 border-b-2 appearance-none focus:outline-none focus:border-kapitus border-gray-200 rounded" defaultValue={fielddata?.number ? fielddata?.number : refill?.revenue} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} />
        {success?.revenue && <span className="success"></span>}
        {success?.revenue == false && <span className="error"></span>}
        <span className="text-errorred">{error2?.revenue}</span>
    </motion.div>
    <motion.div className="mt-3 relative z-0 w-full mb-5">
    <select className="form-select border border-gray-200 p-2 rounded w-full" name="creditscore" id="27" onChange={event => handleChange(event)} onBlur={event => handleBlur(event)} value={fielddata?.creditscore ? fielddata?.creditscore : refill?.credit_score}>
        <option value="">Credit Score</option>
        {credit_score.map((option, i) =>
        <option value={option.value} key={`${i}credit`}>{option.text}</option>
    )}
    </select>
    {success?.credit_score && <span className="success"></span>}
    {success?.credit_score == false && <span className="error"></span>}
    <span className="text-errorred">{error2?.credit_score}</span>
    </motion.div>
    <div className="mt-3 relative z-0 w-full mb-5 grid grid-cols-3 gap-4">
    <div>                    
        <select className="form-select border border-gray-200 p-2 rounded w-full" name="month" id="6.1" onChange={event => handleChange(event)} onBlur={event => handleBlur(event)} value={fielddata?.month ? fielddata?.month : refill?.month}>
        <option value="">Month</option>
        {month.map((option, i) =>
        <option value={option} key={`${i}month`}>{option}</option>
        )}</select>
        {success?.month && success?.day && success?.year && <span className="success"></span>}
        {(success?.month == false || success?.day == false || success?.year == false) && <span className="error"></span>}
        <span className="text-errorred">{error2?.month}</span>
    </div>
    <div>                    
        <select className="form-select border border-gray-200 p-2 rounded w-full" name="day" id="6.2" onChange={event => handleChange(event)} onBlur={event => handleBlur(event)} value={fielddata?.day ? fielddata?.day : refill?.day}>
        <option value="">Day</option>
        {day.map((option, i) =>
        <option value={option} key={`${i}day`}>{option}</option>
        )}</select>
        {success?.day && success?.month && success?.year && <span className="success"></span>}
        {(success?.day == false || success?.month == false || success?.year == false) && <span className="error"></span>}
        <span className="text-errorred">{error2?.day}</span>
    </div>
    <div>                    
        <select className="form-select border border-gray-200 p-2 rounded w-full" name="year" id="6.3" onChange={event => handleChange(event)} onBlur={event => handleBlur(event)} value={fielddata?.year ? fielddata?.year : refill?.year}>
            <option value="">Year</option>
            {year.map((option, i) =>
            <option value={option} key={`${i}year`}>{option}</option>
        )}</select>
        {success?.year && success?.month && success?.day && <span className="success"></span>}
        {(success?.year == false || success?.month == false || success?.day == false) && <span className="error"></span>}
        <span className="text-errorred">{error2?.year}</span>
    </div>
    </div>
    <div className="mt-3 relative text-kapitus z-0 w-full mb-5">
        When Did You Start Your Business?
    </div>
    <div className="mt-3 relative text-kapitus z-0 w-full mb-5">
        I would like to:*
    </div>
    <motion.div className="mt-3 relative z-0 w-full mb-5">
    <select className="form-select border border-gray-200 p-2 rounded w-full" name="sales" value={fielddata?.sales ? fielddata?.sales : sales} id="24" onChange={event => handleChange(event)} onBlur={event => handleBlur(event)} >
        <option>Select</option>
        {represent.map((option, i) =>
        <option value={option} key={`${i}sales`}>{option}</option>
    )}</select>
    {success?.sales && <span className="success"></span>}
    {success?.sales == false && <span className="error"></span>}
    <span className="text-errorred">{error2?.sales}</span>
    </motion.div>
    </>
    )
}
export default Quoteform;