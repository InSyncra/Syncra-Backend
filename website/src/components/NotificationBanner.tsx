import Link from "next/link";

const NotificationBanner = () => {
  return (
    <div className="absolute top-0 left-0 flex gap-6 justify-center bg-slate-500 w-full text-sm py-1 shadow-sm">
      <p className="text-gray-200">
        Current backend Version: <span className="text-gray-100">v1.0.0</span>
      </p>
      <div className="flex gap-2">
        <span className="text-gray-200">Need to update?</span>
        <Link href={"/api-versions"} className="hover:text-gray-200">
          View versions
        </Link>
      </div>
    </div>
  );
};

export default NotificationBanner;
