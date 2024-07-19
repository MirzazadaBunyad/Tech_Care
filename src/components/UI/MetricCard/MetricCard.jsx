const MetricCard = ({ className, icon, title, value, levels }) => (
    <div className={`w-1/3 flex flex-col p-[20px] gap-[16px] rounded-[12px] ${className}`}>
        <div className="w-[96px] h-[96px]">
            <img className="w-full h-full" src={icon} alt={title} />
        </div>
        <div className="flex flex-col gap-[16px] cursor-default">
            <div>
                <h3 className="text-left font-medium text-[16px]">{title}</h3>
                <p className="font-bold text-left text-[30px]">{value}</p>
            </div>
            <div>
                <p className="text-[14px] text-left">{levels}</p>
            </div>
        </div>
    </div>
);

export default MetricCard;
