
import StatsCard from '../components/Dashboard/StatsCard';
import DailyInteractions from '../components/Dashboard/DailyInteractions';
import ProjectTable from '../components/Dashboard/ProjectTable';

const Dashboard = () => {
  

  return (
    <div className="flex h-screen font-sans ">
        <main className="p-5 w-full space-y-8">
          {/* Hero Section */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <img src="/star.svg" className="w-15" alt="" />
              <h2 className="text-5xl font-semibold text-white">Plan. Track.</h2>
              <h2 className="text-5xl font-semibold text-white">Achieve.</h2>

              <hr
                className="w-[90%] text-[#1C1C1C] mt-7"
                style={{
                  height: '2px',
                  backgroundColor: '#1C1C1C',
                  border: 'none',
                }}
              />

              <div className="flex items-center pt-4">
                <span className="text-9xl font-extrabold text-white mr-4">27</span>
                <span className="px-3 py-1 bg-transparent text-[#DE8B2D] border border-[#DE8B2D] font-bold rounded-full text-sm">
                  Total Employees
                </span>
              </div>
            </div>

            <StatsCard />
          </div>

          {/* ✅ Daily Interactions + Project Table in one line */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4">
              <DailyInteractions />
            </div>
            <div className="col-span-8">
              <ProjectTable />
            </div>
          </div>
        </main>
      </div>

  );
};

export default Dashboard;
