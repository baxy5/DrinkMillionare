import Image from "next/image";

const Helpers = ({
  halving,
  audience,
  tele,
  isAudience,
  isTele,
  setHalving,
  setHalvingBackg,
  isHalvingBackg,
  setIsPhoneStart,
  elapsedTimePhone,
  setTeleDesign,
  teleDesign
}) => {
  return (
    <div className="pt-14 pr-10">
      <div className="grid gap-3">
        <div
          onClick={() => {
            tele(true)
            setTeleDesign(true)
          }}
          className={`border-2 border-white p-2 text-white rounded-full w-64 flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#133525]
          ${teleDesign ? "bg-red-500 line-through" : ""}`}
        >
          <p className="text-3xl flex items-center gap-2">
            <span>
              <Image src="/telephone.png" width={24} height={24} alt="" />
            </span>
            Telefon
          </p>
        </div>

        {isTele && (
          <div
            onClick={() => setIsPhoneStart(true)}
            className="border-2 border-white p-2 text-white rounded-full w-64 flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#133525]"
          >
            <span className="text-3xl flex items-center gap-2">{30 - elapsedTimePhone}</span>
          </div>
        )}

        <div
          onClick={() => audience(true)}
          className={`border-2 border-white p-2 text-white rounded-full w-64 flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#133525]
          ${isAudience ? "bg-red-500 line-through" : ""}`}
        >
          <p className="text-3xl flex items-center gap-2">
            <span>
              <Image src="/audience.png" width={24} height={24} alt="" />
            </span>
            Közönség
          </p>
        </div>
        <div
          onClick={() => {
            setHalving(true);
            setHalvingBackg(true);
            halving;
          }}
          className={`border-2 border-white p-2 text-white rounded-full w-64 flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#133525]
          ${isHalvingBackg ? "bg-red-500 line-through" : ""}`}
        >
          <p className="text-3xl flex items-center gap-2 ">
            <span>
              <Image src="/half.png" width={24} height={24} alt="" />
            </span>
            Felezés
          </p>
        </div>
      </div>
    </div>
  );
};

export default Helpers;
