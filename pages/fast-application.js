import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
//import SignatureCanvas from 'react-signature-canvas'

export default function FastApplication() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const lists = [
    { value: "payroll", text: "Payroll" },
    { value: "equipment", text: "Equipment" },
    { value: "renovations", text: "Renovations" },
    { value: "expansion", text: "Expansion" },
    { value: "repairs", text: "Repairs" },
    { value: "marketing", text: "Marketing" },
  ];

  // console.log(watch("fund")); // watch input value by passing the name of it

  return (
    <div className="bg-kapitus py-10 px-10 m-auto w-full">
      <div className="col-span-2 mb-2 text-center text-kapitusblue text-xs font-bold">
        <Image
          src="/Kapitus_Logo_white.webp"
          alt="logo"
          width={300}
          height={100}
        />
      </div>
      <div className="max-w-2xl m-auto text-center">
        <Image src="/fastapp-banner.jpeg" alt="logo" width={750} height={300} />
      </div>
      <div className="max-w-2xl m-auto bg-white p-8">
        <hr className="divide-y border-1 border-green-600" />
        <div className="text-center text-kapitus text-lg my-2 font-bold">
          BUSINESS INFORMATION
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
            <div className="col-span-2 md:col-span-1">
              <input
                type="number"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                name="fund"
                {...register("fund", { required: true, pattern: /^[0-9]+$/i })}
                placeholder="How much funding do you need?"
              />
              {errors.fund?.type === "required" && (
                <span className="text-errorred m-2">
                  First name is required
                </span>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <select
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                {...register("use_fund", { required: true })}
              >
                <option value="">Use of Funds</option>
                {lists.map((option, i) => (
                  <option value={option.value} key={`${i}fund`}>
                    {option.text}
                  </option>
                ))}
              </select>
              {errors.use_fund?.type === "required" && (
                <span className="text-errorred m-2">
                  Use of fund is required
                </span>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                {...register("business_name", { required: true })}
                placeholder="DBA (Business Name)"
              />
              {errors.business_name?.type === "required" && (
                <span className="text-errorred m-2">
                  Business Name is required
                </span>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                {...register("legal_business_name", { required: true })}
                placeholder="Legal Business Name"
              />
              {errors.legal_business_name?.type === "required" && (
                <span className="text-errorred m-2">
                  Legal Business Name is required
                </span>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                {...register("business_address", { required: true })}
                placeholder="Business Address"
              />
            </div>
            <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full md:w-34"
                {...register("business_city", { required: false })}
                placeholder="City"
              />
              <select
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full md:w-34"
                {...register("businsess_state", { required: true })}
                id="26"
              >
                <option value="">State</option>
                {lists.map((option, i) => (
                  <option value={option.value} key={`${i}`}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 md:col-span-1 space-x-3 w-full">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                {...register("business_zip", { required: true })}
                placeholder="ZIP / Postal Code"
              />
              {(errors.business_address?.type === "required" ||
                errors.business_city?.type === "required" ||
                errors.businsess_state?.type === "required" ||
                errors.business_zip?.type === "required") && (
                <span className="text-errorred m-2">
                  This field is required. Please complete the following fields:
                </span>
              )}
              {errors.business_address?.type === "required" && (
                <span className="text-errorred m-2">Street Address,</span>
              )}
              {errors.business_city?.type === "required" && (
                <span className="text-errorred m-2">City,</span>
              )}
              {errors.business_state?.type === "required" && (
                <span className="text-errorred m-2">State / Province,</span>
              )}
              {errors.business_zip?.type === "required" && (
                <span className="text-errorred m-2">ZIP / Postal Code.</span>
              )}
            </div>
            <div className="col-span-2 md:col-span-1 space-x-3 w-full"></div>
            <div className="col-span-2 md:col-span-1 space-x-3 w-full">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                {...register("business_phone", { required: true })}
                placeholder="Business Phone"
              />
              {errors.business_phone?.type === "required" && (
                <span className="text-errorred m-2">
                  Business Phone is Required.
                </span>
              )}
            </div>
            <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
              <label className="text-xs md:text-sm w-22 md:w-24">
                Business Start Date
                <br />
                {(errors.business_month?.type === "required" ||
                  errors.business_day?.type === "required" ||
                  errors.business_year?.type === "required") && (
                  <span className="text-errorred">
                    Business Date is Required.
                  </span>
                )}
              </label>
              <select
                className="border-solid border-gray-300 border-1 h-10 pr-2 text-sm w-1/4 md:w-30"
                {...register("business_month", { required: true })}
              >
                <option value="">Month</option>
                {lists.map((option, i) => (
                  <option value={option.value} key={`${i}fund`}>
                    {option.text}
                  </option>
                ))}
              </select>
              <select
                className="border-solid border-gray-300 border-1 h-10 pr-2 text-sm w-1/4 md:w-30"
                {...register("business_day", { required: true })}
              >
                <option value="">Day</option>
                {lists.map((option, i) => (
                  <option value={option.value} key={`${i}fund`}>
                    {option.text}
                  </option>
                ))}
              </select>
              <select
                className="border-solid border-gray-300 border-1 h-10 pr-2 text-sm w-1/4 md:w-30"
                {...register("business_year", { required: true })}
              >
                <option value="">Year</option>
                {lists.map((option, i) => (
                  <option value={option.value} key={`${i}fund`}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                {...register("tax_id", { required: true })}
                placeholder="Tax Id"
              />
              {errors.tax_id?.type === "required" && (
                <span className="text-errorred">Tax Id is Required.</span>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                {...register("annual_revenue", { required: true })}
                placeholder="Annual Revenue"
              />
              {errors.annual_revenue?.type === "required" && (
                <span className="text-errorred">
                  Annual Renvenue is Required.
                </span>
              )}
            </div>
            <div className="col-span-2 space-y-3 md:space-y-0 md:col-span-2 md:flex md:space-x-3 md:w-full">
              <div className="w-full md:w-34">
                <input
                  type="text"
                  className="border-solid border-gray-300 border-1 h-10 text-sm w-full md:w-34"
                  {...register("entity", { required: true })}
                />
                {errors.entity?.type === "required" && (
                  <span className="text-errorred">Entity is Required.</span>
                )}
              </div>
              <div className="w-full md:w-34">
                <input
                  type="text"
                  className="border-solid border-gray-300 border-1 h-10 text-sm w-full md:w-34"
                  {...register("industry_type", { required: true })}
                />
                {errors.industry_type?.type === "required" && (
                  <span className="text-errorred">
                    Industry Type is Required.
                  </span>
                )}
              </div>
              <div className="w-full md:w-34">
                <input
                  type="text"
                  className="border-solid border-gray-300 border-1 h-10 text-sm w-full md:w-34"
                  {...register("website_url", { required: false })}
                  placeholder="Website URL : example.com"
                />
              </div>
            </div>
            <hr className="col-span-2 mt-10 divide-y border-1 border-green-600" />
            <div className="col-span-2 mb-6 text-center text-kapitus text-lg my-6 font-bold">
              PERSONAL INFORMATION
            </div>
            <div className="col-span-2 md:col-span-1">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                {...register("first_name", { required: false })}
                placeholder="First Name"
              />
              {errors.first_name?.type === "required" && (
                <span className="text-errorred">First Name is Required.</span>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                {...register("last_name", { required: false })}
                placeholder="Last Name"
              />
              {errors.last_name?.type === "required" && (
                <span className="text-errorred">Last Name is Required.</span>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                {...register("email_address", { required: false })}
                placeholder="Email Address"
              />
              {errors.email_address?.type === "required" && (
                <span className="text-errorred">Email is Required.</span>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                {...register("personal_phone_number", { required: false })}
                placeholder="Phone Number"
              />
              {errors.personal_phone_number?.type === "required" && (
                <span className="text-errorred">Phone Number is Required.</span>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                {...register("home_address", { required: false })}
                placeholder="Home Address"
              />
            </div>
            <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full md:w-34"
                {...register("personal_city", { required: false })}
                placeholder="City"
              />
              <select
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full md:w-34"
                {...register("personal_state", { required: false })}
              >
                <option value="">State</option>
                {lists.map((option, i) => (
                  <option value={option.value} key={`${i}`}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 md:col-span-2 space-x-3 w-full md:w-72">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                {...register("personal_zip", { required: false })}
                placeholder="ZIP / Postal Code"
              />
              {(errors.personal_address?.type === "required" ||
                errors.personal_city?.type === "required" ||
                errors.businsess_state?.type === "required" ||
                errors.personal_zip?.type === "required") && (
                <span className="text-errorred m-2">
                  This field is required. Please complete the following fields:
                </span>
              )}
              {errors.personal_address?.type === "required" && (
                <span className="text-errorred m-2">Street Address,</span>
              )}
              {errors.personal_city?.type === "required" && (
                <span className="text-errorred m-2">City,</span>
              )}
              {errors.personal_state?.type === "required" && (
                <span className="text-errorred m-2">State / Province,</span>
              )}
              {errors.personal_zip?.type === "required" && (
                <span className="text-errorred m-2">ZIP / Postal Code.</span>
              )}
            </div>
            <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
              <div className="w-full md:w-34">
                <input
                  type="text"
                  className="border-solid border-gray-300 border-1 h-10 text-sm w-full md:w-34"
                  {...register("credit_score", { required: false })}
                  placeholder="Credit Score"
                />
                {errors.credit_score?.type === "required" && (
                  <span className="text-errorred m-2">
                    Credit Score is Required.
                  </span>
                )}
              </div>
              <div className="w-full md:w-34">
                <input
                  type="text"
                  className="border-solid border-gray-300 border-1 h-10 text-sm w-full md:w-34"
                  {...register("ssn", { required: false })}
                  placeholder="SSN"
                />
                {errors.ssn?.type === "required" && (
                  <span className="text-errorred m-2">SSN is Required.</span>
                )}
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
              <label className="text-xs md:text-sm w-22 md:w-24">
                Business Start Date
                <br />
                {(errors.personal_month?.type === "required" ||
                  errors.personal_day?.type === "required" ||
                  errors.personal_year?.type === "required") && (
                  <span className="text-errorred">
                    Personal Date is Required.
                  </span>
                )}
              </label>
              <select
                className="border-solid border-gray-300 border-1 h-10 pr-2 text-sm w-1/4 md:w-30"
                {...register("personal_month", { required: false })}
              >
                <option value="">Month</option>
                {lists.map((option, i) => (
                  <option value={option.value} key={`${i}fund`}>
                    {option.text}
                  </option>
                ))}
              </select>
              <select
                className="border-solid border-gray-300 border-1 h-10 pr-2 text-sm w-1/4 md:w-30"
                {...register("personal_day", { required: false })}
              >
                <option value="">Day</option>
                {lists.map((option, i) => (
                  <option value={option.value} key={`${i}pday`}>
                    {option.text}
                  </option>
                ))}
              </select>
              <select
                className="border-solid border-gray-300 border-1 h-10 pr-2 text-sm w-1/4 md:w-30"
                {...register("personal_year", { required: false })}
              >
                <option value="">Year</option>
                {lists.map((option, i) => (
                  <option value={option.value} key={`${i}`}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 md:col-span-1 w-full">
              <select
                className="border-solid border-gray-300 border-1 h-10 pr-2 text-sm w-full"
                {...register("existing_loan", { required: false })}
              >
                <option value="">Existing loan</option>
                {lists.map((option, i) => (
                  <option value={option.value} key={`${i}`}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 md:col-span-1 hidden">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                placeholder="Lender Name"
                {...register("lender_name", { required: false })}
              />
              {errors.lender_name?.type === "required" && (
                <span className="text-errorred m-2">
                  Use of fund is required
                </span>
              )}
            </div>
            <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
              <label className="text-xs md:text-sm w-1/4 md:w-24 items-center">
                Ownership %
              </label>
              <select
                className="border-solid border-gray-300 border-1 h-10 pr-2 text-sm w-3/4"
                {...register("owner_percent", { required: false })}
              >
                <option value="">Ownership Percentage %</option>
                {lists.map((option, i) => (
                  <option value={option.value} key={`${i}`}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 md:col-span-1 space-x-3 w-full md:w-72">
              <input
                type="text"
                className="border-solid border-gray-300 border-1 h-10 text-sm w-full"
                {...register("about_us", { required: false })}
              />
            </div>
            <hr className="col-span-2 mt-10 divide-y border-1 border-kapitusLiteGreen" />
            <div className="col-span-2 mb-4 text-center text-kapitus text-lg my-6 font-bold">
              UPLOAD DOCUMENTS
            </div>
            <div className="col-span-2 mb-2 text-center text-errorred text-lg my-2 font-bold">
              For Faster Approval Upload 6 Months Bank Statements
            </div>
            <div className="col-span-2 mb-2 text-center text-kapitusblue text-xs font-bold">
              Estimated Approval 3-4 Hours
            </div>
            <div
              className="col-span-2 text-center bg-white h-28 border-1 border-dotted border-gray-300 py-6 w-full"
              style={{ border: "1px dashed #ccc" }}
            >
              <div className="text-center mb-4">Drop files here or</div>
              <label className="col-span-2 w-32 text-center px-4 py-2 bg-kapitus rounded-md shadow-md tracking-wide cursor-pointer text-white ease-linear transition-all duration-150">
                <i className="fas fa-cloud-upload-alt fa-3x"></i>
                <span className="text-center text-base leading-normal">
                  Select a file
                </span>
                <input
                  type="file"
                  className="hidden text-center"
                  {...register("file", { required: false })}
                />
              </label>
            </div>
            <div className="col-span-2 mb-2 text-center text-kapitusblue text-sm my-3">
              Accepted file types: jpg, png, pdf, Max. file size: 128 MB.
            </div>
            <div className="col-span-2 p-2 mb-2 h-24 bg-white border-1 border-dotted border-gray-600 overflow-auto text-kapitusblue my-2 w-full">
              <p className="text-xs">
                Fees may apply. The Merchant and Owner(s) identified above
                (collectively, the “Applicant”) each represent, acknowledge and
                agree to the requirements for processing this application.
                Furthermore, Applicant acknowledges, agrees and consents to the
                promotions and servicing notice included herein. Please note
                that you are not required to consent to be contacted for
                marketing or promotional purposes in order to qualify for
                financing or obtain products or services from Kapitus.
              </p>
              <p className="text-xs">
                Requirements for Processing:
                <br />
                1. All information provided in connection with this application
                is true, accurate and complete,
                <br />
                2. Applicant will immediately notify Kapitus and/or its
                subsidiaries, affiliates or agents (“Kapitus”) of any change in
                such information or in the Applicant’s financial condition;
                <br />
                3. Applicant agrees that Kapitus may disclose all information
                and documents obtained, including credit reports (the
                “Application”), to financial institutions, lenders, loan
                servicers, purchasers of accounts receivable, factoring
                companies, equipment finance or leasing companies, or other
                similar sources of commercial financing for the purpose of
                considering the Applicant’s request for financing;
                <br />
                4. Kapitus and other parties to whom the Application is provided
                are authorized to request and receive consumer or personal, and
                business or entity, credit reports from one or more credit
                bureaus, such as TransUnion, Experian or Equifax, investigative
                reports about the Applicant from third party data aggregators,
                and other financial information about Applicant, including
                credit card processor statements and bank statements, directly
                from credit bureaus, banks, creditors or other third parties;
                <br />
                5. Applicant waives and releases any claims against Kapitus or
                other parties to whom the Application is provided or who provide
                information arising from any act or omission relating to the
                requesting, receiving or release of information; and
                <br />
                6. each Owner represents that they are authorized to execute any
                documents on behalf of the Merchant and to bind the Merchant.
              </p>
              <p className="text-xs">
                Promotions and Servicing Notice:
                <br />
                Kapitus may, from time to time, notify Applicant of various
                promotional offers and other marketing information, or contact
                Applicant in connection with the servicing of any financing, or
                in connection with any default under any financing. Applicant
                expressly consents and authorizes Kapitus to call, e-mail, send
                text messages, and/or send other electronic messages (including
                prerecorded or artificial voice messages) using an automatic
                telephone dialing system to any telephone number provided by
                Applicant, and any telephone number included in any and all
                documents or forms submitted, including cellular phone numbers
                and landlines, regardless of their inclusion on any do not call
                list, for purposes of servicing, collections, marketing or
                promoting any product offered by Kapitus. If you do not agree to
                be called for marketing or promotional purposes please call
                (844) 547-9396 or email DNC@kapitus.com
              </p>{" "}
              <br />
              <p className="text-xs">
                Copyright 2020 • Kapitus • All Rights Reserved. Loans made in
                California are issued by Strategic Funding Source, Inc. dba
                Kapitus, pursuant to California Finance Lenders License No.
                603-G807.
              </p>
            </div>
            <div className="col-span-2 mb-2 text-kapitusblue text-lg">
              <input
                className="mr-6 mb-1"
                type="checkbox"
                value="I agree to the Terms of Service"
                {...register("terms_condition", { required: false })}
              />
              <span>I agree to the Terms of Service</span>
            </div>
            <div className="mb-5">
              <div>
                <label>Signature</label>
                {/*<SignatureCanvas penColor='green' clearButton="true" canvasProps={{width: 300, height: 180, className: 'signature_draw'}} />*/}
                <button className="">Clear</button>
              </div>
            </div>
            <div className="col-span-2 text-right">
              {/*<button className="py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32">
              Submit
            </button>*/}
              <input
                className="py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
