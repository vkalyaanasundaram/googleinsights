import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
//import SignatureCanvas from 'react-signature-canvas'

export default function App() {
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

  console.log(watch("fund")); // watch input value by passing the name of it

  return (
    <div className="max-w-2xl m-auto bg-transparent p-2">
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
              <span className="text-errorred m-2">First name is required</span>
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
              <span className="text-errorred m-2">Use of fund is required</span>
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
        </div>
        <div className="xs: w-full align-center text-center formBtn">
          <button>SUBMIT</button>
        </div>
      </form>
    </div>
  );
}
