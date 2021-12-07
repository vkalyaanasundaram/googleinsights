export default function Subscribe() {
  return (
    <>
      <div className="my-10 mx-5 text-green">
        <div className=" text-xl font-semi my-10 text-titleGreen">
          SUBSCRIBE TO OUR BLOG FOR MORE TIPS ON HOW TO GROW YOUR BUSINESS
        </div>
        <div>
          <input
            type="email"
            name="emailID"
            id="subscribe_email"
            className="border-2 border-gray-300 p-2 w-10/12"
            placeholder="Email *"
          />
        </div>
        <div>
          <button>GO</button>
        </div>
      </div>
    </>
  );
}
