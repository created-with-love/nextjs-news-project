import s from '../styles/EOM.module.css';
import { Toolbar } from '../components/toolbar';

const EOM = ({ employee }) => {
  return (
    <div className="page-container">
      <Toolbar />
      <div className={s.main}>
        <h1>Employee Of The Month</h1>

        <div className={s.employeeOfTheMonth}>
          <h3>created-with-love</h3>
          <h6>{employee.position}</h6>
          <img src="/11111.jpg" alt="employeePhoto" width={320} height={460} />
          <p>{employee.description}</p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const apiResponse = await fetch(
    'https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth'
  );

  const employee = await apiResponse.json();
  return {
    props: {
      employee,
    },
  };
};

export default EOM;
