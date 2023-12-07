import Navbar from '@/components/Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
