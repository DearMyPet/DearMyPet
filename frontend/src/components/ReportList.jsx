import Circle from '../img/circle.svg'

const ReportList = ({ list }) => {
    return (
        <div>  
            {list.map((item, i) => {
                return (
                    <div className="report-list" key={i}>
                      <img className="report-img" src={Circle} />
                      <span className="report-date">{item.date}</span>
                      <span className="report-state">{item.state}</span>
                      <div className="line" />
                    </div>
                  );
            })}
        </div>
    )
}

export default ReportList;