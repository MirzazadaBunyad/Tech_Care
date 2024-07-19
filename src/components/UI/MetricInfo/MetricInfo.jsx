

const MetricInfo = ({ color, label, value, levels, arrow }) => (
    <div className="flex flex-col gap-[8px]">
        <div className="flex gap-[4px] items-center">
            <div className={`bg-[${color}] border-[1px] border-white w-[14px] h-[14px] rounded-[50%]`}></div>
            <h3 className="text-left text-[14px] font-bold cursor-default">{label}</h3>
        </div>
        <div>
            <p className="font-bold text-[22px] cursor-default">{value}</p>
            <p className="text-[14px] flex gap-[8px] cursor-default">
                <img src={arrow} alt="" />
                {levels}
            </p>
        </div>
    </div>
);

export default MetricInfo;
