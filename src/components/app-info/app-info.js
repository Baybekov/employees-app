
import './app-info.scss';

const companyName = 'Adidas';

const AppInfo = ({increase, employees}) => {


    return (
        <div className="app-info">
            <h1>
                Учет сотрудников в компании {companyName};
            </h1>
            <h2>
                Общее количество сотрудников: {employees}
            </h2>
            <h2>
                Премию получат: {increase}
            </h2>
        </div>
    )
}

export default AppInfo;