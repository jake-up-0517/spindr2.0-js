import Navbar from '@/components/Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-full h-[10%]">
        <Navbar />
      </div>
      <div className="w-full h-[90%]">{children}</div>
    </div>
  );
};

export default DashboardLayout;
