

export default function ReportCard(props:contentReportCard){
    return(
        <div className="flex flex-col justify-center items-center rounded-md w-64 h-64 shadow-large gap-3">
            <p className="text-2xl text-center">{props.title}</p>
            <b className="text-6xl">{props.content}</b>
        </div>
    )
}