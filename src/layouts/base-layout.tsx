import Sidebar from '@/components/sidebar';
import { Outlet } from 'react-router-dom';

export default function BaseLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 border-l-[1px]">
        <Outlet />
      </div>
    </div>
  );
}
